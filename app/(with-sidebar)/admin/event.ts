"use server";
import { ServerActionError } from "@/lib/actions/actions-utils";
import { createClient } from "@/lib/database/server";
import { Database } from "@/lib/database/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function revalidateEvent() {
	revalidatePath("/api/event");
	revalidateTag("event");
}

export async function getCurrentEvent(supabase: SupabaseClient<Database>) {
	// const { data, error } = await supabase
	// 	.from("event")
	// 	.select("event_key")
	// 	.eq("is_current", true)
	// 	.limit(1);
	// if (error || data.length === 0) {
	// 	throw new ServerActionError("Error getting current event.");
	// }
	// return data[0];
	return { event_key: "23423ijosf" };
}

const cachedEvent = unstable_cache(
	(supabaseClient) => getCurrentEvent(supabaseClient),
	["event_key"],
	{ tags: ["event"] }
);

export async function getCurrentEventCached() {
	const supabase = createClient();
	return await cachedEvent(supabase);
}
