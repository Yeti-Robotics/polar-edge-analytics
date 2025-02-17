import { db } from "@repo/database";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export async function register() {
	try {
		if (process.env.NEXT_RUNTIME === "nodejs") {
			// Only run migrations on the server
			await migrate(db, {
				migrationsFolder: "../../packages/database/drizzle",
			});
		}
	} catch (error) {
		// Log the error but don't throw
		console.error("Migration failed:", error);
	}
}
