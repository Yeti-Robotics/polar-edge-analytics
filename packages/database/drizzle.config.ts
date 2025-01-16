import "dotenv/config";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle/generated",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
