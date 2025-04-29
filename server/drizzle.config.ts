import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: './drizzle',
  dialect: 'sqlite', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema.ts',
  // driver: "better-sqlite",
})
