import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import {
	accounts,
	authenticators,
	sessions,
	users,
	verificationTokens,
} from "@repo/database/schema";
import type { UserRole } from "@/lib/types/auth";
import Discord from "next-auth/providers/discord";
import { z } from "zod";

const envValidators = z.object({
	AUTH_DISCORD_ID: z.string(),
	AUTH_DISCORD_SECRET: z.string(),
});

const env = envValidators.parse({
	AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
	AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
});

async function getGuildNickname(accessToken: string) {
	const guildId = "408711970305474560";
	const member = await fetch(
		`https://discord.com/api/users/@me/guilds/${guildId}/member`,
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

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Discord({
			clientId: env.AUTH_DISCORD_ID,
			clientSecret: env.AUTH_DISCORD_SECRET,
			profile: async (profile, token) => {
				if (token.access_token) {
					profile.guildNickname = await getGuildNickname(
						token.access_token
					);
				}
				return {
					id: profile.id,
					name: profile.username,
					role: profile.role ?? ("user" as UserRole),
					guildNickname: profile.guildNickname,
					isBanned: profile.isBanned ?? false,
				};
			},
		}),
	],
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
		authenticatorsTable: authenticators,
	}),
	session: { strategy: "database" },
	callbacks: {
		session({ session, user }) {
			if (user.isBanned) {
				throw new Error("User is banned");
			}
			session.user.id = user.id as string;
			session.user.role = user.role as UserRole;
			return session;
		},
		signIn: async ({ user, account }) => {
			if (!account?.access_token) return false;
			const guildNickname = await getGuildNickname(account.access_token);
			if (!guildNickname) return false;
			await db
				.update(users)
				.set({ guildNickname })
				.where(eq(users.id, user.id as string));
			return true;
		},
	},
});

export async function banUser(userId: string) {
	await db.update(users).set({ isBanned: true }).where(eq(users.id, userId));
	await db.delete(sessions).where(eq(sessions.userId, userId));
}
