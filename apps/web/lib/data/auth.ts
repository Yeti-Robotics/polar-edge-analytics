import "server-only";

import { auth } from "../auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import { UserRole } from "@/lib/database/schema";

export const verifySession = cache(async () => {
	const session = await auth();

	if (!session?.user) {
		redirect("/");
	}

	return session?.user;
});

export async function isAdmin() {
	const session = await verifySession();
	if (!session || session.role !== UserRole.ADMIN) {
		return false;
	}
	return true;
}
