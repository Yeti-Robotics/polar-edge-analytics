import path from "path";

import { db } from "@/lib/database";
import { migrate } from "drizzle-orm/neon-http/migrator";

const migrationsFolder = path.join(process.cwd(), "lib/database/drizzle");

await migrate(db, { migrationsFolder });
