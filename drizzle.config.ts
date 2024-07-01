import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
	schema: "./drizzle/schema.ts",
	schemaFilter: ["public"],
	out: "../supabase/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
});
