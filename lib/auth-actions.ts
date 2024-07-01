"use server";

import { createClient } from "@/lib/database/server";
import { redirect } from "next/navigation";

export async function signIn() {
	const supabase = createClient();

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "discord",
		options: {
			redirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
			scopes: "guilds",
		},
	});

	if (data.url) {
		return redirect(data.url);
	}

	if (error) {
		console.error("Error logging in:", error.message);
		return;
	}

	return redirect("/analysis");
}

export async function signOut() {
	const supabase = createClient();
	await supabase.auth.signOut();
}
