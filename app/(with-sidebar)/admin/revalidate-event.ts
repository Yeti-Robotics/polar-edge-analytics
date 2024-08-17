"use server";
import { revalidatePath } from "next/cache";

export async function revalidateEvent() {
	revalidatePath("/api/event");
}
