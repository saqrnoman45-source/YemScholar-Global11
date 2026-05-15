import { Router, type IRouter } from "express";
import { eq, ilike, and, SQL } from "drizzle-orm";
import { db, articlesTable, usersTable } from "@workspace/db";
import {
  ListArticlesQueryParams,
  CreateArticleBody,
  GetArticleParams,
  GetArticleResponse,
  UpdateArticleParams,
  UpdateArticleBody,
  UpdateArticleResponse,
  DeleteArticleParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const DEMO_USER_ID = 1;

async function serializeArticle(a: typeof articlesTable.$inferSelect) {
  const [author] = await db.select().from(usersTable).where(eq(usersTable.id, a.authorId));
  return {
    id: a.id,
    title: a.title,
    summary: a.summary,
    content: a.content,
    topic: a.topic,
    authorId: a.authorId,
    authorName: author?.name ?? "Unknown",
    thumbnailUrl: a.thumbnailUrl ?? null,
    readTime: a.readTime,
    publishedAt: a.publishedAt.toISOString(),
  };
}

router.get("/articles", async (req, res): Promise<void> => {
  const parsed = ListArticlesQueryParams.safeParse(req.query);
  const filters: SQL[] = [];
  if (parsed.success) {
    if (parsed.data.topic) filters.push(ilike(articlesTable.topic, `%${parsed.data.topic}%`));
    if (parsed.data.search) filters.push(ilike(articlesTable.title, `%${parsed.data.search}%`));
  }
  const articles = filters.length > 0
    ? await db.select().from(articlesTable).where(and(...filters))
    : await db.select().from(articlesTable);
  const result = await Promise.all(articles.map(serializeArticle));
  res.json(result);
});

router.post("/articles", async (req, res): Promise<void> => {
  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [article] = await db.insert(articlesTable).values({ ...parsed.data, authorId: DEMO_USER_ID }).returning();
  res.status(201).json(await serializeArticle(article));
});

router.get("/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetArticleParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, params.data.id));
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(GetArticleResponse.parse(await serializeArticle(article)));
});

router.patch("/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateArticleParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const parsed = UpdateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [article] = await db.update(articlesTable).set(parsed.data).where(eq(articlesTable.id, params.data.id)).returning();
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(UpdateArticleResponse.parse(await serializeArticle(article)));
});

router.delete("/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteArticleParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  await db.delete(articlesTable).where(eq(articlesTable.id, params.data.id));
  res.sendStatus(204);
});

export default router;
