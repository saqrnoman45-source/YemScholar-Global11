import { pgTable, serial, timestamp, integer, text, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { scholarshipsTable } from "./scholarships";

export const applicationStatusEnum = pgEnum("application_status", ["pending", "approved", "rejected"]);

export const scholarshipApplicationsTable = pgTable("scholarship_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  scholarshipId: integer("scholarship_id").notNull().references(() => scholarshipsTable.id, { onDelete: "cascade" }),
  status: applicationStatusEnum("status").notNull().default("pending"),
  statement: text("statement"),
  appliedAt: timestamp("applied_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertScholarshipApplicationSchema = createInsertSchema(scholarshipApplicationsTable).omit({ id: true, appliedAt: true });
export type InsertScholarshipApplication = z.infer<typeof insertScholarshipApplicationSchema>;
export type ScholarshipApplication = typeof scholarshipApplicationsTable.$inferSelect;
