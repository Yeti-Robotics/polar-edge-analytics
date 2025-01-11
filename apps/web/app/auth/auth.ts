import NextAuth, { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import { UserRole, users } from "@repo/database/schema";
import Discord, { DiscordProfile } from "next-auth/providers/discord";

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
			image: discordProfile.image_url,
			emailVerified: discordProfile.email_verified,
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
	adapter: DrizzleAdapter(db),
	session: { strategy: "database" },
	callbacks: {
		session({ session, user }) {
			if (user.role === UserRole.BANISHED) {
				throw new AuthError("BANISHED");
			}

			session.user.id = user.id;
			session.user.role = user.role as UserRole;
			session.user.image = user.image;

			return session;
		},
		signIn: async ({ user, profile, account }) => {
			const guildNickname = profile?.guildNickname;
			const emailVerified = profile?.emailVerified;
			const image = profile?.image;

			console.log(user, profile, account);

			if (!account?.access_token) throw new AuthError("LOGIN_FAILED");
			if (user.isBanned) throw new AuthError("BANNED");
			if (!guildNickname) throw new AuthError("GUILD_NICKNAME");

			try {
				await db
					.update(users)
					.set({
						guildNickname: guildNickname,
						emailVerified: emailVerified ? new Date() : null,
						image: image as string,
					})
					.where(eq(users.id, user.id as string));
			} catch (err) {
				console.error("Failed to update guild nickname: ");
				console.error(err);
			}

			return true;
		},
	},
});
