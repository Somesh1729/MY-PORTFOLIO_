import { Router } from "express";

const router = Router();

// Real skills from Somesh Yallapur's resume — structured for radial visualization
const SKILLS = [
  {
    category: "Languages",
    skills: [
      { name: "Java", level: 85, yearsExperience: 2 },
      { name: "Python", level: 92, yearsExperience: 3 },
      { name: "JavaScript", level: 90, yearsExperience: 3 },
      { name: "SQL", level: 82, yearsExperience: 2 },
      { name: "HTML/CSS", level: 88, yearsExperience: 3 },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "LangGraph", level: 90, yearsExperience: 1 },
      { name: "Gemini / LLM", level: 88, yearsExperience: 1 },
      { name: "RAG Pipelines", level: 85, yearsExperience: 1 },
      { name: "Agentic AI", level: 85, yearsExperience: 1 },
      { name: "PyTorch", level: 72, yearsExperience: 1 },
      { name: "Hugging Face", level: 75, yearsExperience: 1 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 88, yearsExperience: 2 },
      { name: "Next.js", level: 80, yearsExperience: 1 },
      { name: "HTML / CSS", level: 90, yearsExperience: 3 },
      { name: "Tailwind CSS", level: 85, yearsExperience: 2 },
      { name: "Framer Motion", level: 72, yearsExperience: 1 },
      { name: "Vite", level: 80, yearsExperience: 1 },
    ],
  },
  {
    category: "Backend & DB",
    skills: [
      { name: "Node.js / Express", level: 88, yearsExperience: 2 },
      { name: "FastAPI", level: 80, yearsExperience: 1 },
      { name: "PostgreSQL", level: 82, yearsExperience: 2 },
      { name: "Firebase", level: 78, yearsExperience: 2 },
      { name: "MongoDB", level: 75, yearsExperience: 1 },
      { name: "REST API Design", level: 90, yearsExperience: 2 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", level: 90, yearsExperience: 3 },
      { name: "Docker", level: 72, yearsExperience: 1 },
      { name: "pandas", level: 88, yearsExperience: 2 },
      { name: "python-pptx", level: 80, yearsExperience: 1 },
      { name: "WebSocket", level: 78, yearsExperience: 1 },
      { name: "VS Code", level: 95, yearsExperience: 3 },
    ],
  },
];

router.get("/skills", (_req, res) => {
  res.json(SKILLS);
});

export default router;
