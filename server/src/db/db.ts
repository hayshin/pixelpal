import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { sql } from "drizzle-orm";

const sqlite = new Database("sqlite.db" );
export const db = drizzle(sqlite, {casing: "snake_case"});

const query = sql`select "hello world" as text`;
const result = db.get<{text: string}>(query);
console.log(result);
