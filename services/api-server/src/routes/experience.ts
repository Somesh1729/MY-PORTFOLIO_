import { Router } from "express";
import { db } from "@workspace/db";
import { experienceTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router = Router();

// Seed real experience if DB is empty
async function seedExperienceIfEmpty() {
  const existing = await db.select().from(experienceTable).limit(1);
  if (existing.length > 0) return;

  const realExperience = [
    {
      company: "Learner Bytes",
      role: "AI Engineer Intern",
      startDate: "Jan 2026",
      endDate: "May 2026",
      current: false,
      location: "Remote",
      description: "Hands-on AI engineering internship focused on developing, fine-tuning, and deploying intelligent machine learning solutions.",
      highlights: [
        "Developed and optimized machine learning models for production environments",
        "Collaborated on building multi-agent AI workflows and LLM pipelines",
        "Implemented robust data preprocessing, evaluation, and fine-tuning pipelines",
      ],
      techStack: ["Python", "AI/ML", "LLMs", "PyTorch", "FastAPI"],
      sortOrder: 1,
    },
  ];

  for (const exp of realExperience) {
    await db.insert(experienceTable).values(exp).onConflictDoNothing();
  }
}

router.get("/experience", async (_req, res) => {
  await seedExperienceIfEmpty();
  const entries = await db
    .select()
    .from(experienceTable)
    .orderBy(asc(experienceTable.sortOrder));
  res.json(entries);
});

export default router;
