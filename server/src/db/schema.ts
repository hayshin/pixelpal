import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  name: text().notNull().primaryKey(),
  password: text(),
  createdAt: integer({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
});

export const canvases = sqliteTable("users", {
  id: text().primaryKey(),
  height: integer().notNull(),
  widht: integer().notNull(),
  createdAt: integer({mode: 'timestamp'}).notNull().default(sql`(unixepoch())`),
  updatedAt: integer({mode: 'timestamp'}).default(sql`(unixepoch())`),
  ownerName: text().notNull().references(() => users.name),
  createrName: text().notNull().references(() => users.name),
  state: text(),
  // isPublic: boolean().default(true)
});

export const active_users = sqliteTable("users", {
  userName: text().notNull().references(() => users.name),
  canvasId: text().notNull().references(() => canvases.id),
  socketId: text(),
  // isPublic: boolean().default(true)
});

