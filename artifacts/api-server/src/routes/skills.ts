import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, skillsTable, userSkillsTable } from "@workspace/db";
import {
  AddMySkillBody,
  RemoveMySkillParams,
  GetMySkillsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const DEMO_USER_ID = 1;

router.get("/skills", async (_req, res): Promise<void> => {
  const skills = await db.select().from(skillsTable);
  res.json(skills.map(s => ({
    id: s.id,
    name: s.name,
    category: s.category,
    description: s.description ?? null,
  })));
});

router.get("/users/me/skills", async (_req, res): Promise<void> => {
  const rows = await db.select().from(userSkillsTable)
    .leftJoin(skillsTable, eq(userSkillsTable.skillId, skillsTable.id))
    .where(eq(userSkillsTable.userId, DEMO_USER_ID));
  const result = rows.map(r => ({
    id: r.user_skills.id,
    userId: r.user_skills.userId,
    skillId: r.user_skills.skillId,
    level: r.user_skills.level,
    addedAt: r.user_skills.addedAt.toISOString(),
    skill: r.skills ? {
      id: r.skills.id,
      name: r.skills.name,
      category: r.skills.category,
      description: r.skills.description ?? null,
    } : null,
  }));
  res.json(GetMySkillsResponse.parse(result));
});

router.post("/users/me/skills", async (req, res): Promise<void> => {
  const parsed = AddMySkillBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [skill] = await db.select().from(skillsTable).where(eq(skillsTable.id, parsed.data.skillId));
  if (!skill) {
    res.status(404).json({ error: "Skill not found" });
    return;
  }
  const [userSkill] = await db.insert(userSkillsTable).values({
    userId: DEMO_USER_ID,
    skillId: parsed.data.skillId,
    level: parsed.data.level,
  }).returning();
  res.status(201).json({
    id: userSkill.id,
    userId: userSkill.userId,
    skillId: userSkill.skillId,
    level: userSkill.level,
    addedAt: userSkill.addedAt.toISOString(),
    skill: {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      description: skill.description ?? null,
    },
  });
});

router.delete("/users/me/skills/:skillId", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.skillId) ? req.params.skillId[0] : req.params.skillId;
  const params = RemoveMySkillParams.safeParse({ skillId: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid skill ID" });
    return;
  }
  await db.delete(userSkillsTable).where(
    and(eq(userSkillsTable.userId, DEMO_USER_ID), eq(userSkillsTable.skillId, params.data.skillId))
  );
  res.sendStatus(204);
});

export default router;
