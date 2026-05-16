import { Router, type IRouter } from "express";
import { eq, ilike, and, SQL } from "drizzle-orm";
import { db, coursesTable, enrollmentsTable } from "@workspace/db";
import {
  ListCoursesQueryParams,
  CreateCourseBody,
  GetCourseParams,
  GetCourseResponse,
  UpdateCourseParams,
  UpdateCourseBody,
  UpdateCourseResponse,
  DeleteCourseParams,
  EnrollInCourseParams,
  ListMyEnrollmentsResponse,
  UpdateEnrollmentProgressParams,
  UpdateEnrollmentProgressBody,
  UpdateEnrollmentProgressResponse,
} from "@workspace/api-zod";
import { requireAuth, requireRole } from "../middleware/auth";

const router: IRouter = Router();

function serializeCourse(c: typeof coursesTable.$inferSelect) {
  return {
    id: c.id, title: c.title, description: c.description, category: c.category,
    level: c.level, duration: c.duration, thumbnailUrl: c.thumbnailUrl ?? null,
    instructorName: c.instructorName, enrollmentCount: c.enrollmentCount,
    rating: c.rating ?? null, createdAt: c.createdAt.toISOString(),
  };
}

// Public: browse courses
router.get("/courses", async (req, res): Promise<void> => {
  const parsed = ListCoursesQueryParams.safeParse(req.query);
  const filters: SQL[] = [];
  if (parsed.success) {
    if (parsed.data.category) filters.push(ilike(coursesTable.category, `%${parsed.data.category}%`));
    if (parsed.data.level) filters.push(eq(coursesTable.level, parsed.data.level as "beginner" | "intermediate" | "advanced"));
    if (parsed.data.search) filters.push(ilike(coursesTable.title, `%${parsed.data.search}%`));
  }
  const courses = filters.length > 0
    ? await db.select().from(coursesTable).where(and(...filters))
    : await db.select().from(coursesTable);
  res.json(courses.map(serializeCourse));
});

// Teacher/Admin: create course
router.post("/courses", requireAuth, requireRole("teacher", "admin"), async (req, res): Promise<void> => {
  const parsed = CreateCourseBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [course] = await db.insert(coursesTable).values(parsed.data).returning();
  res.status(201).json(GetCourseResponse.parse(serializeCourse(course)));
});

// Public: get single course
router.get("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetCourseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: "Invalid ID" }); return; }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!course) { res.status(404).json({ error: "Course not found" }); return; }
  res.json(GetCourseResponse.parse(serializeCourse(course)));
});

// Teacher/Admin: update course
router.patch("/courses/:id", requireAuth, requireRole("teacher", "admin"), async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateCourseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: "Invalid ID" }); return; }
  const parsed = UpdateCourseBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [course] = await db.update(coursesTable).set(parsed.data).where(eq(coursesTable.id, params.data.id)).returning();
  if (!course) { res.status(404).json({ error: "Course not found" }); return; }
  res.json(UpdateCourseResponse.parse(serializeCourse(course)));
});

// Admin only: delete course
router.delete("/courses/:id", requireAuth, requireRole("admin"), async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteCourseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: "Invalid ID" }); return; }
  await db.delete(coursesTable).where(eq(coursesTable.id, params.data.id));
  res.sendStatus(204);
});

// Auth required: enroll (any logged-in user)
router.post("/courses/:id/enroll", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = EnrollInCourseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: "Invalid ID" }); return; }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!course) { res.status(404).json({ error: "Course not found" }); return; }
  const userId = req.user!.id;
  const [enrollment] = await db.insert(enrollmentsTable).values({ userId, courseId: params.data.id, progress: 0, status: "active" }).returning();
  await db.update(coursesTable).set({ enrollmentCount: course.enrollmentCount + 1 }).where(eq(coursesTable.id, params.data.id));
  res.status(201).json({ id: enrollment.id, userId: enrollment.userId, courseId: enrollment.courseId, progress: enrollment.progress, status: enrollment.status, enrolledAt: enrollment.enrolledAt.toISOString(), completedAt: enrollment.completedAt?.toISOString() ?? null, course: serializeCourse(course) });
});

// Auth required: my enrollments
router.get("/enrollments", requireAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(enrollmentsTable)
    .leftJoin(coursesTable, eq(enrollmentsTable.courseId, coursesTable.id))
    .where(eq(enrollmentsTable.userId, req.user!.id));
  const result = rows.map(r => ({
    id: r.enrollments.id, userId: r.enrollments.userId, courseId: r.enrollments.courseId,
    progress: r.enrollments.progress, status: r.enrollments.status,
    enrolledAt: r.enrollments.enrolledAt.toISOString(), completedAt: r.enrollments.completedAt?.toISOString() ?? null,
    course: r.courses ? serializeCourse(r.courses) : null,
  }));
  res.json(ListMyEnrollmentsResponse.parse(result));
});

// Auth required: update progress
router.patch("/enrollments/:id/progress", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateEnrollmentProgressParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: "Invalid ID" }); return; }
  const parsed = UpdateEnrollmentProgressBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const status = parsed.data.progress >= 100 ? "completed" : "active";
  const completedAt = status === "completed" ? new Date() : null;
  const [enrollment] = await db.update(enrollmentsTable).set({ progress: parsed.data.progress, status, completedAt }).where(eq(enrollmentsTable.id, params.data.id)).returning();
  if (!enrollment) { res.status(404).json({ error: "Enrollment not found" }); return; }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, enrollment.courseId));
  res.json(UpdateEnrollmentProgressResponse.parse({ id: enrollment.id, userId: enrollment.userId, courseId: enrollment.courseId, progress: enrollment.progress, status: enrollment.status, enrolledAt: enrollment.enrolledAt.toISOString(), completedAt: enrollment.completedAt?.toISOString() ?? null, course: course ? serializeCourse(course) : null }));
});

export default router;
