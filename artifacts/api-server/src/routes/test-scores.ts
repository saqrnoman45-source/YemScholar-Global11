import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, testScoresTable } from "@workspace/db";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

router.get("/test-scores", requireAuth, async (req, res): Promise<void> => {
  const scores = await db.select().from(testScoresTable)
    .where(eq(testScoresTable.userId, req.user!.id))
    .orderBy(desc(testScoresTable.completedAt));
  res.json(scores.map(s => ({
    id: s.id, userId: s.userId, quizTitle: s.quizTitle,
    score: s.score, maxScore: s.maxScore,
    timeTakenSeconds: s.timeTakenSeconds ?? null,
    completedAt: s.completedAt.toISOString(),
  })));
});

router.post("/test-scores", requireAuth, async (req, res): Promise<void> => {
  const { quizTitle, score, maxScore, timeTakenSeconds } = req.body;
  if (!quizTitle || score === undefined || !maxScore) { res.status(400).json({ error: "quizTitle, score, maxScore required" }); return; }
  const [saved] = await db.insert(testScoresTable).values({
    userId: req.user!.id,
    quizTitle, score: parseInt(score, 10),
    maxScore: parseInt(maxScore, 10),
    timeTakenSeconds: timeTakenSeconds ? parseInt(timeTakenSeconds, 10) : null,
  }).returning();
  res.status(201).json({
    id: saved.id, userId: saved.userId, quizTitle: saved.quizTitle,
    score: saved.score, maxScore: saved.maxScore,
    timeTakenSeconds: saved.timeTakenSeconds ?? null,
    completedAt: saved.completedAt.toISOString(),
  });
});

export default router;
