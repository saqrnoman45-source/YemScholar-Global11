import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import {
  RegisterBody,
  LoginBody,
  GetMeResponse,
  LoginResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/auth/me", async (req, res): Promise<void> => {
  const userId = req.session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json(GetMeResponse.parse({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt.toISOString(),
  }));
});

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, password, name } = parsed.data;
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already in use" });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const [user] = await db.insert(usersTable).values({ email, passwordHash, name }).returning();
  req.session!.userId = user.id;
  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    bio: user.bio ?? null,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt.toISOString(),
  });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email, password } = parsed.data;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  req.session!.userId = user.id;
  res.json(LoginResponse.parse({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt.toISOString(),
  }));
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  req.session?.destroy(() => {});
  res.json({ ok: true });
});

export default router;
