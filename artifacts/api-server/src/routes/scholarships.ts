import { Router, type IRouter } from "express";
import { eq, ilike, and, SQL } from "drizzle-orm";
import { db, scholarshipsTable, scholarshipApplicationsTable } from "@workspace/db";
import {
  ListScholarshipsQueryParams,
  CreateScholarshipBody,
  GetScholarshipParams,
  GetScholarshipResponse,
  UpdateScholarshipParams,
  UpdateScholarshipBody,
  UpdateScholarshipResponse,
  DeleteScholarshipParams,
  ApplyForScholarshipParams,
  ApplyForScholarshipBody,
  ListMyApplicationsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const DEMO_USER_ID = 1;

function serializeScholarship(s: typeof scholarshipsTable.$inferSelect) {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    provider: s.provider,
    amount: s.amount ?? null,
    category: s.category,
    deadline: s.deadline?.toISOString() ?? null,
    eligibility: s.eligibility,
    applicationCount: s.applicationCount ?? 0,
    createdAt: s.createdAt.toISOString(),
  };
}

router.get("/scholarships", async (req, res): Promise<void> => {
  const parsed = ListScholarshipsQueryParams.safeParse(req.query);
  const filters: SQL[] = [];
  if (parsed.success) {
    if (parsed.data.category) filters.push(ilike(scholarshipsTable.category, `%${parsed.data.category}%`));
    if (parsed.data.search) filters.push(ilike(scholarshipsTable.title, `%${parsed.data.search}%`));
  }
  const scholarships = filters.length > 0
    ? await db.select().from(scholarshipsTable).where(and(...filters))
    : await db.select().from(scholarshipsTable);
  res.json(scholarships.map(serializeScholarship));
});

router.post("/scholarships", async (req, res): Promise<void> => {
  const parsed = CreateScholarshipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const vals: Record<string, unknown> = { ...parsed.data };
  if (typeof vals.deadline === "string") vals.deadline = new Date(vals.deadline as string);
  const [scholarship] = await db.insert(scholarshipsTable).values(vals as Parameters<typeof db.insert>[0] extends (table: unknown, values: infer V) => unknown ? V : never).returning();
  res.status(201).json(GetScholarshipResponse.parse(serializeScholarship(scholarship)));
});

router.get("/scholarships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetScholarshipParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const [scholarship] = await db.select().from(scholarshipsTable).where(eq(scholarshipsTable.id, params.data.id));
  if (!scholarship) {
    res.status(404).json({ error: "Scholarship not found" });
    return;
  }
  res.json(GetScholarshipResponse.parse(serializeScholarship(scholarship)));
});

router.patch("/scholarships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateScholarshipParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = UpdateScholarshipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const vals: Record<string, unknown> = { ...parsed.data };
  if (typeof vals.deadline === "string") vals.deadline = new Date(vals.deadline as string);
  const [scholarship] = await db.update(scholarshipsTable).set(vals as Parameters<typeof db.update>[0] extends (table: unknown) => unknown ? never : unknown).where(eq(scholarshipsTable.id, params.data.id)).returning();
  if (!scholarship) {
    res.status(404).json({ error: "Scholarship not found" });
    return;
  }
  res.json(UpdateScholarshipResponse.parse(serializeScholarship(scholarship)));
});

router.delete("/scholarships/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteScholarshipParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  await db.delete(scholarshipsTable).where(eq(scholarshipsTable.id, params.data.id));
  res.sendStatus(204);
});

router.post("/scholarships/:id/apply", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = ApplyForScholarshipParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = ApplyForScholarshipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [scholarship] = await db.select().from(scholarshipsTable).where(eq(scholarshipsTable.id, params.data.id));
  if (!scholarship) {
    res.status(404).json({ error: "Scholarship not found" });
    return;
  }
  const [application] = await db.insert(scholarshipApplicationsTable).values({
    userId: DEMO_USER_ID,
    scholarshipId: params.data.id,
    statement: parsed.data.statement,
    status: "pending",
  }).returning();
  await db.update(scholarshipsTable).set({ applicationCount: (scholarship.applicationCount ?? 0) + 1 }).where(eq(scholarshipsTable.id, params.data.id));
  res.status(201).json({
    id: application.id,
    userId: application.userId,
    scholarshipId: application.scholarshipId,
    status: application.status,
    statement: application.statement ?? null,
    appliedAt: application.appliedAt.toISOString(),
    scholarship: serializeScholarship(scholarship),
  });
});

router.get("/applications", async (_req, res): Promise<void> => {
  const rows = await db.select().from(scholarshipApplicationsTable)
    .leftJoin(scholarshipsTable, eq(scholarshipApplicationsTable.scholarshipId, scholarshipsTable.id))
    .where(eq(scholarshipApplicationsTable.userId, DEMO_USER_ID));
  const result = rows.map(r => ({
    id: r.scholarship_applications.id,
    userId: r.scholarship_applications.userId,
    scholarshipId: r.scholarship_applications.scholarshipId,
    status: r.scholarship_applications.status,
    statement: r.scholarship_applications.statement ?? null,
    appliedAt: r.scholarship_applications.appliedAt.toISOString(),
    scholarship: r.scholarships ? serializeScholarship(r.scholarships) : null,
  }));
  res.json(ListMyApplicationsResponse.parse(result));
});

export default router;
