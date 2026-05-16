import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, certificatesTable, coursesTable } from "@workspace/db";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

router.get("/certificates", requireAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(certificatesTable)
    .leftJoin(coursesTable, eq(certificatesTable.courseId, coursesTable.id))
    .where(eq(certificatesTable.userId, req.user!.id));
  res.json(rows.map(r => ({
    id: r.certificates.id,
    userId: r.certificates.userId,
    courseId: r.certificates.courseId,
    certificateCode: r.certificates.certificateCode,
    issuedAt: r.certificates.issuedAt.toISOString(),
    courseName: r.courses?.title ?? null,
  })));
});

// Admin only: issue certificate
router.post("/certificates", requireAuth, async (req, res): Promise<void> => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) { res.status(400).json({ error: "userId and courseId required" }); return; }
  const code = `NP-${new Date().getFullYear()}-${courseId}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const [cert] = await db.insert(certificatesTable).values({
    userId: parseInt(userId, 10),
    courseId: parseInt(courseId, 10),
    certificateCode: code,
  }).returning();
  res.status(201).json({ id: cert.id, userId: cert.userId, courseId: cert.courseId, certificateCode: cert.certificateCode, issuedAt: cert.issuedAt.toISOString(), courseName: null });
});

export default router;
