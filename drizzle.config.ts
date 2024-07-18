import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development" });

export default defineConfig({
	schema: "./lib/database/schema.ts",
	schemaFilter: ["public"],
	out: "./supabase/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
});
