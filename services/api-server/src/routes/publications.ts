import { Router } from "express";
import { db } from "@workspace/db";
import { publicationsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

// Seed real publication if DB is empty
async function seedPublicationsIfEmpty() {
  const existing = await db.select().from(publicationsTable).limit(1);
  if (existing.length > 0) return;

  await db.insert(publicationsTable).values([
    {
      title: "Biomedical Speech Transcription Using Deep Learning",
      authors: ["Somesh Yallapur", "et al."],
      venue: "IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)",
      year: 2024,
      doi: null,
      url: null,
      abstract: "This paper presents a deep learning-based system for accurate transcription and processing of biomedical speech. Traditional automatic speech recognition (ASR) systems fail to capture domain-specific medical terminology, drug names, and clinical jargon with sufficient accuracy. We propose a domain-adapted approach using fine-tuned transformer architectures on a curated biomedical speech corpus, achieving significant improvement over general-purpose ASR baselines in clinical settings.",
      plainLanguageSummary: "Medical professionals dictate clinical notes and diagnoses in complex language that general speech-to-text tools misunderstand. This research builds a specialized AI system trained specifically on medical vocabulary to transcribe doctors' speech accurately — making clinical documentation faster and more reliable.",
      tags: ["Deep Learning", "ASR", "NLP", "Biomedical", "Transformers", "Healthcare AI", "IEEE"],
    },
    {
      title: "Adaptive Speech Transcription for Medical Environments using Deep Neural Networks",
      authors: ["Somesh Yallapur"],
      venue: "3rd IEEE International Conference On Artificial Intelligence and Quantum Computation - Based Sensor Application (ICAIQSA)",
      year: 2025,
      doi: null,
      url: "/certificate.jpg",
      abstract: "Presented at the 3rd International Conference on Artificial Intelligence and Quantum Computation – Based Sensor Applications organized by G H Raisoni College of Engineering and Management.",
      plainLanguageSummary: "Research on using adaptive deep neural networks for speech transcription in specialized medical environments.",
      tags: ["Deep Neural Networks", "Speech Transcription", "Medical AI", "IEEE", "Quantum Computation"],
    }
  ]);
}

router.get("/publications", async (_req, res) => {
  await seedPublicationsIfEmpty();
  const pubs = await db
    .select()
    .from(publicationsTable)
    .orderBy(desc(publicationsTable.year));
  res.json(pubs);
});

export default router;
