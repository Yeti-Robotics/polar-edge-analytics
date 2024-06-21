import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING!,
});

console.log(pool);

const db = drizzle(pool);

export default db;
