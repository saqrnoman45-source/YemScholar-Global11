import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, bookmarksTable } from "@workspace/db";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

router.get("/bookmarks", requireAuth, async (req, res): Promise<void> => {
  const bookmarks = await db.select().from(bookmarksTable).where(eq(bookmarksTable.userId, req.user!.id));
  res.json(bookmarks.map(b => ({
    id: b.id, userId: b.userId, type: b.type, referenceId: b.referenceId, createdAt: b.createdAt.toISOString(),
  })));
});

router.post("/bookmarks", requireAuth, async (req, res): Promise<void> => {
  const { type, referenceId } = req.body;
  if (!type || !referenceId) { res.status(400).json({ error: "type and referenceId required" }); return; }
  const [bookmark] = await db.insert(bookmarksTable).values({
    userId: req.user!.id,
    type: type as "course" | "scholarship",
    referenceId: parseInt(referenceId, 10),
  }).returning();
  res.status(201).json({ id: bookmark.id, userId: bookmark.userId, type: bookmark.type, referenceId: bookmark.referenceId, createdAt: bookmark.createdAt.toISOString() });
});

router.delete("/bookmarks/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  await db.delete(bookmarksTable).where(and(eq(bookmarksTable.id, id), eq(bookmarksTable.userId, req.user!.id)));
  res.sendStatus(204);
});

export default router;
