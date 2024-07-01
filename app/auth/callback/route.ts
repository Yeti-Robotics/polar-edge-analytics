import { createClient } from "@/lib/database/server";
import { NextResponse } from "next/server";

interface ServerData {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: number;
	permissions_new: string;
	features: any[];
}

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const origin = requestUrl.origin;

	if (code) {
		const supabase = createClient();
		await supabase.auth.exchangeCodeForSession(code);

		const { data } = await supabase.auth.getSession();

		if (!data.session) {
			return NextResponse.redirect(origin);
		}

		const headers = new Headers();
		headers.append(
			"Authorization",
			`Bearer ${data.session?.provider_token}`
		);

		let servers: ServerData[];
		try {
			const userServers = await fetch(
				`https://discord.com/api/users/@me/guilds`,
				{ headers }
			);
			servers = await userServers.json();
		} catch (error) {
			console.error("Error fetching user servers:", error);
			return NextResponse.redirect(origin);
		}

		const serverId = "408711970305474560";
		const serverIsInList = servers.some((server) => server.id === serverId);

		if (serverIsInList) {
			// YETI is in the list of servers
			return NextResponse.redirect(`${origin}/profile`);
		} else {
			// YETI is not in the list of servers
			await supabase.auth.signOut();
			return NextResponse.redirect(origin);
		}
	}
}
