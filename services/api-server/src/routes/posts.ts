import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable } from "@workspace/db";
import { eq, desc, isNotNull, sql } from "drizzle-orm";

const router = Router();

router.get("/posts/recent", async (_req, res) => {
  const posts = await db
    .select()
    .from(postsTable)
    .where(isNotNull(postsTable.publishedAt))
    .orderBy(desc(postsTable.publishedAt))
    .limit(3);
  res.json(
    posts.map((p: any) => ({
      ...p,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

router.get("/posts", async (req, res) => {
  const { tag } = req.query;
  let query = db
    .select()
    .from(postsTable)
    .where(isNotNull(postsTable.publishedAt))
    .orderBy(desc(postsTable.publishedAt))
    .$dynamic();

  const posts = await query;
  const filtered = tag
    ? posts.filter((p: any) => p.tags.includes(String(tag)))
    : posts;
  res.json(
    filtered.map((p: any) => ({
      ...p,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

router.get("/posts/:slug", async (req, res) => {
  const [post] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.slug, req.params.slug));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json({
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
  });
});

router.post("/posts/:slug/view", async (req, res) => {
  const [updated] = await db
    .update(postsTable)
    .set({ views: sql`${postsTable.views} + 1` })
    .where(eq(postsTable.slug, req.params.slug))
    .returning({ views: postsTable.views });
  if (!updated) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json({ views: updated.views });
});

export default router;
