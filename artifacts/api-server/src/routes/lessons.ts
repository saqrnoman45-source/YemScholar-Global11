import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, lessonsTable, lessonProgressTable } from "@workspace/db";
import { requireAuth, requireRole } from "../middleware/auth";

const router: IRouter = Router();

function serializeLesson(l: typeof lessonsTable.$inferSelect) {
  return {
    id: l.id, courseId: l.courseId, title: l.title,
    description: l.description ?? null, videoUrl: l.videoUrl ?? null,
    pdfUrl: l.pdfUrl ?? null, content: l.content ?? null,
    type: l.type, durationMinutes: l.durationMinutes, order: l.order,
    isFree: l.isFree, createdAt: l.createdAt.toISOString(),
  };
}

// Public: list lessons for a course
router.get("/courses/:id/lessons", async (req, res): Promise<void> => {
  const courseId = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const lessons = await db.select().from(lessonsTable)
    .where(eq(lessonsTable.courseId, courseId))
    .orderBy(asc(lessonsTable.order));
  res.json(lessons.map(serializeLesson));
});

// Teacher/Admin: create lesson
router.post("/courses/:id/lessons", requireAuth, requireRole("teacher", "admin"), async (req, res): Promise<void> => {
  const courseId = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const { title, description, videoUrl, pdfUrl, content, type, durationMinutes, order, isFree } = req.body;
  if (!title || !type) { res.status(400).json({ error: "title and type are required" }); return; }
  const [lesson] = await db.insert(lessonsTable).values({
    courseId, title,
    description: description ?? null,
    videoUrl: videoUrl ?? null,
    pdfUrl: pdfUrl ?? null,
    content: content ?? null,
    type: (type as "video" | "article" | "quiz" | "pdf") ?? "video",
    durationMinutes: durationMinutes ?? 0,
    order: order ?? 1,
    isFree: isFree ?? false,
  }).returning();
  res.status(201).json(serializeLesson(lesson));
});

// Teacher/Admin: update lesson
router.patch("/lessons/:id", requireAuth, requireRole("teacher", "admin"), async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const updates: Partial<typeof lessonsTable.$inferInsert> = {};
  const allowed = ["title", "description", "videoUrl", "pdfUrl", "content", "type", "durationMinutes", "order", "isFree"] as const;
  for (const key of allowed) {
    if (req.body[key] !== undefined) (updates as Record<string, unknown>)[key] = req.body[key];
  }
  const [lesson] = await db.update(lessonsTable).set(updates).where(eq(lessonsTable.id, id)).returning();
  if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }
  res.json(serializeLesson(lesson));
});

// Admin: delete lesson
router.delete("/lessons/:id", requireAuth, requireRole("admin"), async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
  res.sendStatus(204);
});

// Auth: mark lesson complete
router.post("/lessons/:id/progress", requireAuth, async (req, res): Promise<void> => {
  const lessonId = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(lessonId)) { res.status(400).json({ error: "Invalid ID" }); return; }
  const userId = req.user!.id;
  const { completed, watchedSeconds } = req.body;
  const completedAt = completed ? new Date() : null;
  const existing = await db.select().from(lessonProgressTable)
    .where(eq(lessonProgressTable.lessonId, lessonId));
  const userProgress = existing.find(p => p.userId === userId);
  let progress;
  if (userProgress) {
    [progress] = await db.update(lessonProgressTable)
      .set({ completed: completed ?? userProgress.completed, watchedSeconds: watchedSeconds ?? userProgress.watchedSeconds, completedAt, updatedAt: new Date() })
      .where(eq(lessonProgressTable.id, userProgress.id))
      .returning();
  } else {
    [progress] = await db.insert(lessonProgressTable)
      .values({ userId, lessonId, completed: completed ?? false, watchedSeconds: watchedSeconds ?? 0, completedAt })
      .returning();
  }
  res.json({ id: progress.id, userId: progress.userId, lessonId: progress.lessonId, completed: progress.completed, watchedSeconds: progress.watchedSeconds, completedAt: progress.completedAt?.toISOString() ?? null });
});

export default router;
