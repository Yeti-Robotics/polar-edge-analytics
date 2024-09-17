import { getCurrentEvent } from "@/app/(with-sidebar)/admin/event";
import { createClient } from "@/lib/database/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = createClient();

	try {
		return NextResponse.json(await getCurrentEvent(supabase));
	} catch (error) {
		return NextResponse.json(
			{
				error: "something went wrong",
			},
			{ status: 500 }
		);
	}
}

export const dynamic = "force-static";
