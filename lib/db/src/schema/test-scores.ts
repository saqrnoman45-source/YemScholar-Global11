import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const testScoresTable = pgTable("test_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  quizTitle: text("quiz_title").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  timeTakenSeconds: integer("time_taken_seconds"),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TestScore = typeof testScoresTable.$inferSelect;
