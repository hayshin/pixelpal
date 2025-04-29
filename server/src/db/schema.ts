import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  name: text().notNull().primaryKey(),
  password: text(),
  created: integer({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
});

export const arts = sqliteTable("arts", {
  id: text().primaryKey(),
  title: text().notNull(),
  height: integer().notNull(),
  width: integer().notNull(),
  created: integer({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
  updated: integer({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
  owner: text().notNull().references(() => users.name),
  creater: text().notNull().references(() => users.name),
  board: text({mode: "json"}).$type<(string | undefined | null)[][]>().default(sql`(json_array())`).notNull(),
  // isPublic: boolean().default(true)
});

export const usersArts = sqliteTable("user_arts", {
  userName: text().notNull().references(() => users.name),
  artId: text().notNull().references(() => arts.id),
  // socketId: text(),
  // isPublic: boolean().default(true)
});

