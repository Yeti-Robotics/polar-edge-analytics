import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import {
	accounts,
	authenticators,
	sessions,
	UserRole,
	users,
	verificationTokens,
} from "@repo/database/schema";
import Discord from "next-auth/providers/discord";
import { eq } from "drizzle-orm";
import { AuthErrors, getGuildNickname, getImgFromProfile } from "./utils";
import { Adapter } from "next-auth/adapters";

const scopes = ["identify", "email", "guilds.members.read"];

export const discordProvider = Discord({
	authorization: `https://discord.com/api/oauth2/authorize?scope=${scopes.join("+")}`,
	clientId: process.env.AUTH_DISCORD_ID,
	clientSecret: process.env.AUTH_DISCORD_SECRET,

	profile: async (discordProfile, token) => {
		if (!discordProfile.verified) {
			throw new AuthError(AuthErrors.DISCORD_UNVERIFIED);
		}

		let guildNickname;

		if (token.access_token) {
			guildNickname = await getGuildNickname(token.access_token);
			discordProfile.guildNickname = guildNickname;
			discordProfile.image_url = getImgFromProfile(discordProfile);
		}

		console.log(discordProfile);

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

export const providers = {
	discord: discordProvider.id,
};

const authenticationProvider = NextAuth({
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
		authenticatorsTable: authenticators,
	}) as Adapter,
	callbacks: {
		async session({ session, user }) {
			if (user.role === UserRole.BANISHED) {
				throw new Error(AuthErrors.BANISHED);
			}

			if (!user.guildNickname) {
				throw new AuthError(AuthErrors.NO_GUILD_NICKNAME);
			}

			if (session.user) {
				session.user.emailVerified = user.emailVerified;
				session.user.id = user.id;
				session.user.role = user.role;
				session.user.guildNickname = user.guildNickname;
			}

			return session;
		},
		async signIn({ user, account, profile }) {
			if (account?.provider === "discord") {
				const guildNickname = profile?.guildNickname;

				if (!account?.access_token)
					throw new AuthError(AuthErrors.LOGIN_FAILED);
				if (!user.id || user.role === UserRole.BANISHED)
					throw new AuthError(AuthErrors.BANISHED);
				if (!guildNickname)
					throw new AuthError(AuthErrors.NO_GUILD_NICKNAME);

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
					throw new AuthError(AuthErrors.LOGIN_FAILED);
				}
			}
			return true;
		},
	},
});

export const { handlers, signIn, signOut } = authenticationProvider;

export const auth = async () => {
	try {
		return await authenticationProvider.auth();
	} catch (err) {
		return await signOut({
			redirectTo: `/error?error=${err instanceof Error ? err.message : "SERVER_ERROR"}`,
			redirect: true,
		});
	}
};

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface User {
		role: UserRole;
		guildNickname: string | null;
		emailVerified: Date | null;
	}

	// eslint-disable-next-line no-unused-vars
	interface Profile {
		guildNickname: string;
		image_url: string;
	}
}
