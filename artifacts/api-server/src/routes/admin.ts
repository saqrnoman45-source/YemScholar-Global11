import { Router, type IRouter } from "express";
import { eq, count, sql } from "drizzle-orm";
import { db, usersTable, coursesTable, enrollmentsTable, scholarshipsTable, scholarshipApplicationsTable, articlesTable } from "@workspace/db";
import {
  UpdateAdminUserParams,
  UpdateAdminUserBody,
  UpdateAdminUserResponse,
  UpdateApplicationStatusParams,
  UpdateApplicationStatusBody,
  UpdateApplicationStatusResponse,
  ListAdminUsersResponse,
  ListAdminApplicationsResponse,
} from "@workspace/api-zod";
import { scholarshipsTable as st } from "@workspace/db";

const router: IRouter = Router();

router.get("/admin/stats", async (req, res): Promise<void> => {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const [totalUsersRow] = await db.select({ count: count() }).from(usersTable);
  const [totalCoursesRow] = await db.select({ count: count() }).from(coursesTable);
  const [totalEnrollmentsRow] = await db.select({ count: count() }).from(enrollmentsTable);
  const [totalScholarshipsRow] = await db.select({ count: count() }).from(scholarshipsTable);
  const [totalApplicationsRow] = await db.select({ count: count() }).from(scholarshipApplicationsTable);
  const [totalArticlesRow] = await db.select({ count: count() }).from(articlesTable);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [recentSignupsRow] = await db.select({ count: count() }).from(usersTable).where(sql`${usersTable.createdAt} >= ${weekAgo}`);
  const [completedRow] = await db.select({ count: count() }).from(enrollmentsTable).where(eq(enrollmentsTable.status, "completed"));
  const totalEnrollments = Number(totalEnrollmentsRow?.count ?? 0);
  const completedEnrollments = Number(completedRow?.count ?? 0);
  const completionRate = totalEnrollments > 0 ? completedEnrollments / totalEnrollments : 0;
  res.json({
    totalUsers: Number(totalUsersRow?.count ?? 0),
    totalCourses: Number(totalCoursesRow?.count ?? 0),
    totalEnrollments,
    totalScholarships: Number(totalScholarshipsRow?.count ?? 0),
    totalApplications: Number(totalApplicationsRow?.count ?? 0),
    totalArticles: Number(totalArticlesRow?.count ?? 0),
    recentSignups: Number(recentSignupsRow?.count ?? 0),
    completionRate,
  });
});

router.get("/admin/users", async (req, res): Promise<void> => {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const users = await db.select().from(usersTable);
  res.json(ListAdminUsersResponse.parse(users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    bio: u.bio ?? null,
    avatarUrl: u.avatarUrl ?? null,
    createdAt: u.createdAt.toISOString(),
  }))));
});

router.patch("/admin/users/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateAdminUserParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = UpdateAdminUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [user] = await db.update(usersTable).set(parsed.data).where(eq(usersTable.id, params.data.id)).returning();
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(UpdateAdminUserResponse.parse({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    bio: user.bio ?? null,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt.toISOString(),
  }));
});

router.get("/admin/applications", async (req, res): Promise<void> => {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const rows = await db.select().from(scholarshipApplicationsTable)
    .leftJoin(scholarshipsTable, eq(scholarshipApplicationsTable.scholarshipId, scholarshipsTable.id));
  const result = rows.map(r => ({
    id: r.scholarship_applications.id,
    userId: r.scholarship_applications.userId,
    scholarshipId: r.scholarship_applications.scholarshipId,
    status: r.scholarship_applications.status,
    statement: r.scholarship_applications.statement ?? null,
    appliedAt: r.scholarship_applications.appliedAt.toISOString(),
    scholarship: r.scholarships ? {
      id: r.scholarships.id,
      title: r.scholarships.title,
      description: r.scholarships.description,
      provider: r.scholarships.provider,
      amount: r.scholarships.amount ?? null,
      category: r.scholarships.category,
      deadline: r.scholarships.deadline?.toISOString() ?? null,
      eligibility: r.scholarships.eligibility,
      applicationCount: r.scholarships.applicationCount ?? 0,
      createdAt: r.scholarships.createdAt.toISOString(),
    } : null,
  }));
  res.json(ListAdminApplicationsResponse.parse(result));
});

router.patch("/admin/applications/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateApplicationStatusParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = UpdateApplicationStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [application] = await db.update(scholarshipApplicationsTable)
    .set({ status: parsed.data.status })
    .where(eq(scholarshipApplicationsTable.id, params.data.id))
    .returning();
  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }
  const [scholarship] = await db.select().from(scholarshipsTable).where(eq(scholarshipsTable.id, application.scholarshipId));
  res.json(UpdateApplicationStatusResponse.parse({
    id: application.id,
    userId: application.userId,
    scholarshipId: application.scholarshipId,
    status: application.status,
    statement: application.statement ?? null,
    appliedAt: application.appliedAt.toISOString(),
    scholarship: scholarship ? {
      id: scholarship.id,
      title: scholarship.title,
      description: scholarship.description,
      provider: scholarship.provider,
      amount: scholarship.amount ?? null,
      category: scholarship.category,
      deadline: scholarship.deadline?.toISOString() ?? null,
      eligibility: scholarship.eligibility,
      applicationCount: scholarship.applicationCount ?? 0,
      createdAt: scholarship.createdAt.toISOString(),
    } : null,
  }));
});

export default router;
