import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import {
	accounts,
	UserRole,
	users,
} from "@repo/database/schema";
import Discord, { DiscordProfile } from "next-auth/providers/discord";

const YETI_GUILD_ID = "408711970305474560";
const JWT_EXPIRY = 3 * 24 * 60 * 60; //3 days, in seconds

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

			try {
				await db
					.update(users)
					.set({ guildNickname: profile.guildNickname })
					.where(eq(users.id, user.id as string));
			} catch (err) {
				console.error("Failed to update guild nickname: ")
				console.error(err)
			}

			return true;
		},
		async jwt({ token, account, user, profile }) {
			if (account) {
				token.name = user.guildNickname ?? user.name;
				token.role = user.role;
				token.picture = profile?.image_url as string ?? null;
			}

			return token;
		}
	},
});