import { createClient } from "@/lib/database/server";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

interface DiscordGuildMemberResponse {
	message?: string;
	code?: number;
	avatar: string | null;
	banner: string | null;
	communication_disabled_until: string | null;
	flags: number;
	joined_at: string;
	nick: string;
	pending: boolean;
	premium_since: string | null;
	roles: string[];
	unusual_dm_activity_until: string;
	user: {
		id: string;
		username: string;
		avatar: string;
		discriminator: string;
		public_flags: number;
		flags: number;
		banner: string | null;
		accent_color: string | null;
		global_name: string;
		avatar_decoration_data: string;
		banner_color: string;
		clan: string;
	};
	mute: boolean;
	deaf: boolean;
	bio: string;
}

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const origin = requestUrl.origin;

	if (code) {
		const supabase = createClient();
		const {
			data: { session, user },
		} = await supabase.auth.exchangeCodeForSession(code);

		if (!session) {
			return NextResponse.redirect(`${origin}/403`);
		}

		const headers = new Headers();
		headers.append("Authorization", `Bearer ${session.provider_token}`);

		const servers: DiscordGuildMemberResponse = await fetch(
			`https://discord.com/api/users/@me/guilds/408711970305474560/member`,
			{ headers }
		).then((res) => res.json());

		if (!servers || servers?.code) {
			await supabase.auth.signOut();
			return NextResponse.redirect(`${origin}/403`);
		}

		await supabase
			.from("profile")
			.update({ nick: servers.nick })
			.eq("id", user.id);

		return NextResponse.redirect(`${origin}/profile`);
	}
}
