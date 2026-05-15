import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  topic: text("topic").notNull(),
  authorId: integer("author_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  thumbnailUrl: text("thumbnail_url"),
  readTime: integer("read_time").notNull().default(5),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({ id: true, publishedAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;
