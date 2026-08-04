import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT current_database(), current_user", (err, res) => {
  console.log("DB TEST:", err, res?.rows);
});

export const db = drizzle(pool, { schema });

export * from "./schema";