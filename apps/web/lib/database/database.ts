import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const db = drizzle({
	client: process.env.DATABASE_URL,
	schema,
});

export default db;
