import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { accounts, authenticators, sessions, UserRole, users, verificationTokens } from "@repo/database/schema";
import Discord, { DiscordProfile } from "next-auth/providers/discord";
import { eq } from "drizzle-orm";

const YETI_GUILD_ID = "408711970305474560";

const getImgFromProfile = (profile: DiscordProfile): string => {
	if (profile.avatar === null) {
		const defaultAvatarNumber =
			profile.discriminator === "0"
				? Number(BigInt(profile.id) >> BigInt(22)) % 6
				: parseInt(profile.discriminator) % 5;
		return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
	} else {
		const format = profile.avatar.startsWith("a_") ? "gif" : "png";
		return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
	}
};

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

const scopes = ["identify", "email", "guilds.members.read"];

export const discordProvider = Discord({
	authorization: `https://discord.com/api/oauth2/authorize?scope=${scopes.join("+")}`,
	clientId: process.env.AUTH_DISCORD_ID,
	clientSecret: process.env.AUTH_DISCORD_SECRET,

	profile: async (discordProfile, token) => {
		if (!discordProfile.verified) {
			throw new AuthError("DISCORD_UNVERIFIED");
		}

		let guildNickname;

		if (token.access_token) {
			guildNickname = await getGuildNickname(token.access_token);
			discordProfile.guildNickname = guildNickname;
			discordProfile.image_url = getImgFromProfile(discordProfile);
		}

		console.log("PROFILE HATH BEEN SUMMONED+++++++++")

		console.log(
			{
				id: discordProfile.id,
				name: discordProfile.username,
				role: UserRole.USER,
				guildNickname: guildNickname ?? "",
				email: discordProfile.email,
				image: discordProfile.image_url,
				emailVerified: discordProfile.verified ? new Date() : null,
			}
		)

		return {
			id: discordProfile.id,
			name: discordProfile.username,
			role: UserRole.USER,
			guildNickname: guildNickname ?? "",
			email: discordProfile.email,
			image: discordProfile.image_url,
			emailVerified: discordProfile.verified ? new Date() : null,
		};
	},
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [discordProvider],
	pages: {
		signIn: "/auth/signin",
		error: "/error", // Error code passed in query string as ?error=
		newUser: "/scout", // If set, new users will be directed here on first sign in
	},
	session: {
		strategy: "database",
		maxAge: 3 * 24 * 60 * 60, // 3 days
	},
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
		authenticatorsTable: authenticators
	}),
	callbacks: {
		async session({ session, user }) {
			console.log("Session callback")
			// Check if user is banned

			if (user.role === UserRole.BANISHED) {
				// If banned, throw error which will invalidate their session
				throw new AuthError("BANISHED");
			}

			if (session.user) {
				session.user.id = user.id;
				session.user.role = user.role;
				session.user.name = user.guildNickname ?? user.name;
			}

			console.log(session)
			console.log(user)

			return session;
		},
		async signIn({ user, account, profile }) {
			if (account?.provider === "discord") {
				const guildNickname = profile?.guildNickname;

				if (!account?.access_token) throw new AuthError("LOGIN_FAILED");
				if (!user.id || user.role === UserRole.BANISHED)
					throw new AuthError("BANISHED");
				if (!guildNickname) throw new AuthError("NO_GUILD_NICKNAME");

				try {
					await db
						.update(users)
						.set({
							guildNickname: profile?.guildNickname,
							image: profile?.image_url as string,
							emailVerified: profile?.verified
								? new Date()
								: null,
						})
						.where(eq(users.id, user.id));
				} catch (error) {
					console.error(error);
					throw new AuthError("LOGIN_FAILED");
				}
			}
			return true;
		},
	},
});

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role: UserRole;
		};
	}
}
