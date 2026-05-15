import { pgTable, text, serial, timestamp, integer, real, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const levelEnum = pgEnum("level", ["beginner", "intermediate", "advanced"]);

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  level: levelEnum("level").notNull(),
  duration: integer("duration").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  instructorName: text("instructor_name").notNull(),
  enrollmentCount: integer("enrollment_count").notNull().default(0),
  rating: real("rating"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true, createdAt: true, enrollmentCount: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;
