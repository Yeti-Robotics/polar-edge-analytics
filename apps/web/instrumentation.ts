import { db } from "@repo/database";
import { migrate } from "drizzle-orm/node-postgres/migrator";

await migrate(db, {
	migrationsFolder: "../../packages/database/drizzle",
});
