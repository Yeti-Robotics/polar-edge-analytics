import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { UserRole, users } from "@repo/database/schema";
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

export const discordProvider = Discord({
	authorization: {
		params: {
			scope: "identify email guilds.members.read",
		},
	},
	clientId: process.env.AUTH_DISCORD_ID,
	clientSecret: process.env.AUTH_DISCORD_SECRET,
	// @ts-ignore
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

		return {
			id: discordProfile.id,
			name: discordProfile.username,
			role: UserRole.USER,
			guildNickname: guildNickname ?? "",
			email: discordProfile.email,
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
	adapter: DrizzleAdapter(db),
	callbacks: {
		async session({ session, user }) {
			// Check if user is banned
			const dbUser = await db
				.select({ role: users.role })
				.from(users)
				.where(eq(users.id, user.id))
				.limit(1);

			if (dbUser[0]?.role === UserRole.BANISHED) {
				// If banned, throw error which will invalidate their session
				throw new AuthError("BANISHED");
			}

			if (session.user) {
				session.user.id = user.id;
				session.user.role = user.role ?? UserRole.USER;
				session.user.name = user.guildNickname ?? user.name;
			}
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
