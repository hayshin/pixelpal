import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database(process.env.DATABASE_URL ?? "sqlite.db");
// export const db = drizzle(sqlite, { casing: "snake_case" });
export const db = drizzle(sqlite);
migrate(db, { migrationsFolder: './server/drizzle' });
