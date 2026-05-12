import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const listing = sqliteTable("listing", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: real("price"),
  isFree: integer("is_free", { mode: "boolean" }).notNull().default(false),
  category: text("category").notNull(),
  status: text("status").notNull().default("available"),
  contact: text("contact").notNull(),
});

export type Listing = typeof listing.$inferSelect;
export type NewListing = typeof listing.$inferInsert;