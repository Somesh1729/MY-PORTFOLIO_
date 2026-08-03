import { Router } from "express";
import { db } from "@workspace/db";
import { projectsTable, publicationsTable } from "@workspace/db";
import { count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res) => {
  const [[projectCount], [pubCount]] = await Promise.all([
    db.select({ count: count() }).from(projectsTable),
    db.select({ count: count() }).from(publicationsTable),
  ]);

  res.json({
    yearsExperience: 4,           // 4th year B.E. AI/ML student
    projectsShipped: Math.max(projectCount?.count ?? 0, 8),  // 8 GitHub repos
    publicationsCount: Math.max(pubCount?.count ?? 0, 1),   // 1 IEEE paper
    certificationsCount: 5,        // Certifications listed in resume
    cgpa: 9.27,                    // CGPA from New Horizon College
    leetcodeSolved: 174,           // LeetCode problems solved
    githubRepos: 10,               // 10 GitHub repositories
    technologiesMastered: 20,
  });
});

export default router;
