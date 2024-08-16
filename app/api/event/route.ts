import { createClient } from "@/lib/database/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("event")
		.select("event_key")
		.eq("is_current", true)
		.limit(1);
	if (error || data.length === 0) {
		return NextResponse.json(
			{
				error: "something went wrong",
			},
			{ status: 500 }
		);
	}
	return NextResponse.json(data[0]);
}

export const dynamic = "force-static";
