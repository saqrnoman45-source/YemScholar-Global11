import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const skillLevelEnum = pgEnum("skill_level", ["beginner", "intermediate", "advanced", "expert"]);

export const skillsTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
  description: text("description"),
});

export const userSkillsTable = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  skillId: integer("skill_id").notNull().references(() => skillsTable.id, { onDelete: "cascade" }),
  level: skillLevelEnum("level").notNull().default("beginner"),
  addedAt: timestamp("added_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSkillSchema = createInsertSchema(skillsTable).omit({ id: true });
export const insertUserSkillSchema = createInsertSchema(userSkillsTable).omit({ id: true, addedAt: true });
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;
export type Skill = typeof skillsTable.$inferSelect;
export type UserSkill = typeof userSkillsTable.$inferSelect;
