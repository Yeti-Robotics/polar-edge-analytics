import { UserRole } from "@repo/database/schema";
import { DiscordProfile } from "next-auth/providers/discord";
import { redirect } from "next/navigation";

const YETI_GUILD_ID = "408711970305474560";

export const getImgFromProfile = (profile: DiscordProfile): string => {
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

export async function getGuildNickname(accessToken: string) {
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

export enum AuthErrors {
    DISCORD_UNVERIFIED = "DISCORD_UNVERIFIED",
    BANISHED = "BANISHED",
    LOGIN_FAILED = "LOGIN_FAILED",
    NO_GUILD_NICKNAME = "NO_GUILD_NICKNAME",
    UNAUTHORIZED = "UNAUTHORIZED"
}

export function redirectError(error: AuthErrors) {
    redirect(`/error?error=${error}`)
}

function roleIndex(userRole: UserRole) {
    return Object.values(UserRole).indexOf(userRole);
}

export function authorized({ requiredRole, currentUserRole }: { requiredRole: UserRole, currentUserRole?: UserRole }) {
    return currentUserRole && roleIndex(currentUserRole) >= roleIndex(requiredRole);
}