import { createClient } from "@/lib/database/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	console.log("THE CALLBACK HAS BEEN HIT");

	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const origin = requestUrl.origin;
	// if "next" is in param, use it as the redirect URL

	if (code) {
		const supabase = createClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(`${origin}/profile`);
}
