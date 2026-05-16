import { pgTable, serial, integer, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { coursesTable } from "./courses";

export const lessonTypeEnum = pgEnum("lesson_type", ["video", "article", "quiz", "pdf"]);

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => coursesTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url"),
  pdfUrl: text("pdf_url"),
  content: text("content"),
  type: lessonTypeEnum("type").notNull().default("video"),
  durationMinutes: integer("duration_minutes").notNull().default(0),
  order: integer("order").notNull().default(0),
  isFree: boolean("is_free").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lesson = typeof lessonsTable.$inferSelect;
export type InsertLesson = typeof lessonsTable.$inferInsert;
