import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import {
	accounts,
	refreshTokenList,
	UserRole,
	users,
} from "@repo/database/schema";
import Discord, { DiscordProfile } from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";
import { randomBytes } from "node:crypto";

const YETI_GUILD_ID = "810276987465760800";
const JWT_EXPIRY = 7 * 24 * 60 * 60; // in seconds
const ACCESS_TOKEN_EXPIRY = 5;
const REFRESH_TOKEN_EXPIRY = 3 * 24 * 60 * 60; // also in seconds

const getImgFromProfile = (profile: DiscordProfile): string => {
	if (profile.avatar === null) {
		const defaultAvatarNumber =
			profile.discriminator === "0"
				? Number(BigInt(profile.id) >> BigInt(22)) % 6
				: parseInt(profile.discriminator) % 5
		return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
	} else {
		const format = profile.avatar.startsWith("a_") ? "gif" : "png"
		return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
	}
}

async function getGuildNickname(accessToken: string) {
	const member = await fetch(
		`https://discord.com/api/users/@me/guilds/${YETI_GUILD_ID}/member`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	).then((res) => res.json());

	if (member && member.nick) {
		return member.nick;
	}

	return null;
}

function dateSecondsFromNow(seconds: number): Date {
	const date = new Date();
	date.setSeconds(date.getSeconds() + seconds);
	return date;
}

function generateRefreshToken() {
	return randomBytes(128).toString("hex")
}

async function createRefreshToken(userId: string, accessToken: JWT) {
	const expiration = dateSecondsFromNow(REFRESH_TOKEN_EXPIRY);
	const token = generateRefreshToken();

	const refreshTokenResult = await db
		.insert(refreshTokenList)
		.values({ userId, token, expiration })
		.onConflictDoUpdate({
			target: refreshTokenList.userId,
			set: { token }
		}).returning();

	console.log("Refresh result")
	console.log(refreshTokenResult)

	if (!refreshTokenResult.length) {
		throw new AuthError("REFRESH_TOKEN_ERROR");
	}

	const refreshToken = refreshTokenResult[0]!;

	accessToken.refresh_token = refreshToken.token;
	accessToken.expires_at = dateSecondsFromNow(ACCESS_TOKEN_EXPIRY).getTime();

	return accessToken;
}

async function refreshToken(accessToken: JWT) {
	const refreshToken = accessToken.refresh_token as string;

	if (!refreshToken) {
		throw new AuthError("REFRESH_TOKEN_ERROR");
	}

	const userInfo = await db
		.select({
			id: users.id,
			role: users.role,
			isBanned: users.isBanned,
			tokenExpiration: refreshTokenList.expiration
		})
		.from(refreshTokenList)
		.where(eq(refreshTokenList.token, refreshToken))
		.innerJoin(users, eq(users.id, refreshTokenList.userId))
		.limit(1);

	console.log("User info")
	console.log(userInfo)

	if (!userInfo.length) {
		throw new AuthError("INVALID_REFRESH_TOKEN");
	}

	const user = userInfo[0]!;

	if (user.tokenExpiration.getTime() < Date.now()) {
		throw new AuthError("EXPIRED");
	}

	if (user.isBanned) {
		throw new AuthError("BANNED");
	}

	const token = await createRefreshToken(user.id, accessToken);
	token.role = user.role;

	return token;
}

export const discordProvider = Discord({
	clientId: process.env.AUTH_DISCORD_ID,
	clientSecret: process.env.AUTH_DISCORD_SECRET,
	// @ts-ignore
	profile: async (discordProfile, token) => {
		if (!discordProfile.verified) {
			throw new AuthError("DISCORD_UNVERIFIED");
		}

		let guildNickname;

		if (token.access_token) {
			guildNickname = await getGuildNickname(
				token.access_token
			);

			discordProfile.guildNickname = guildNickname;
			discordProfile.image_url = getImgFromProfile(discordProfile);
		}

		return {
			id: discordProfile.id,
			name: discordProfile.username,
			role: UserRole.USER,
			isBanned: false,
			guildNickname: guildNickname ?? "",
			email: discordProfile.email,
		};
	},
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [discordProvider],
	pages: {
		signIn: '/auth/signin',
		error: '/error', // Error code passed in query string as ?error=
		newUser: '/scout' // If set, new users will be directed here on first sign in
	},
	adapter: DrizzleAdapter(db, {
		// @ts-ignore
		usersTable: users,
		accountsTable: accounts
	}),
	jwt: {
		maxAge: JWT_EXPIRY
	},
	session: { strategy: "jwt" },
	callbacks: {
		session({ session, token }) {
			session.user.id = token.sub ?? "";
			session.user.role = token.role as UserRole;
			session.user.image = token.picture;

			return session;
		},
		signIn: async ({ user, profile, account }) => {
			const guildNickname = profile?.guildNickname;

			if (!account?.access_token) throw new AuthError("LOGIN_FAILED");
			if (user.isBanned) throw new AuthError("BANNED");
			if (!guildNickname) throw new AuthError("GUILD_NICKNAME");

			await db
				.update(users)
				.set({ guildNickname: profile.guildNickname })
				.where(eq(users.id, user.id as string));

			return true;
		},
		async jwt({ token, account, user, profile }) {
			console.log(token)
			if (account) {
				token.name = user.guildNickname ?? user.name;
				token.role = user.role;
				token.picture = profile?.image_url as string ?? null;

				if (!user.id) {
					throw new Error("INVALID_TOKEN");
				}

				return await createRefreshToken(user.id, token);
			} else if (token.expires_at && token.expires_at as number < Date.now()) {
				const refreshedToken = await refreshToken(token);

				return refreshedToken;
			} else if (!token.expires_at) {
				throw new AuthError("INVALID_TOKEN");
			}

			return token;
		}
	},
});

export async function banUser(userId: string) {
	await db.update(users).set({ isBanned: true }).where(eq(users.id, userId));
}