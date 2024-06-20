import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.DB_CONNECTION_STRING);

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:example@localhost:5432/dev",
  },
});
