import { Router } from "express";
import { db } from "@workspace/db";
import { projectsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

// Real seed data from Somesh Yallapur's GitHub — inserted lazily if DB is empty
async function seedIfEmpty() {
  const existing = await db.select().from(projectsTable).limit(1);
  if (existing.length > 0) return;

  const realProjects = [
    {
      title: "ProjectHealth-ReportingAgent",
      slug: "project-health-reporting-agent",
      summary: "Multi-phase AI agent pipeline that ingests project Excel sheets, scores health deterministically, and generates JSON, Markdown & PowerPoint reports.",
      description: "A multi-phase agentic pipeline built with LangGraph and Gemini that processes S2P project Excel reports. The system uses deterministic weighted scoring (separated from LLM inference) to calculate project health across cost, schedule, scope, and risk dimensions. Outputs structured JSON, human-readable Markdown summaries, and professionally formatted PowerPoint decks via python-pptx.",
      problemStatement: "Project managers needed automated, objective health reporting across dozens of concurrent projects. Manual analysis was time-consuming, inconsistent, and prone to bias. The challenge: building a system where AI explains — but doesn't decide — the health score.",
      architectureNotes: "Phase 1 — Ingest: pandas reads Excel, cleans data, and normalizes fields.\nPhase 2 — Score: deterministic weighted scoring engine (no LLM).\nPhase 3 — LLM Explain: Gemini generates human-readable narrative per project.\nPhase 4 — Compile: JSON/Markdown/PPTX output via python-pptx.\nOrchestration: LangGraph StateGraph connects phases with typed state channels.",
      keyDecisions: "Deliberately kept scoring logic LLM-free to ensure auditability and reproducibility. LangGraph was chosen over a simple pipeline to allow future branching (e.g., escalation paths for critical projects). Gemini was used for explanation generation due to its large context window accommodating full project data.",
      outcomes: "Successfully processed multi-project Excel files, producing per-project and cross-project summaries. PowerPoint decks delivered at presentation quality. Scoring logic is fully testable and deterministic.",
      techStack: ["Python", "LangGraph", "Google Gemini", "pandas", "python-pptx", "FastAPI"],
      githubUrl: "https://github.com/Somesh1729/ProjectHealth-ReportingAgent",
      liveUrl: null,
      imageUrl: null,
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Code-Fixer",
      slug: "code-fixer",
      summary: "LangGraph-based bug detection and auto-fix pipeline with per-file isolation, static linter verification, and a React frontend.",
      description: "An intelligent code analysis tool that uses a LangGraph multi-agent pipeline to detect bugs, validate findings against actual source code (eliminating hallucinations), and generate verified patches. Features a React + Vite frontend and an Express API backend. Integrates static analysis tools for syntax-level issue detection alongside LLM-powered semantic analysis.",
      problemStatement: "LLM-based code review tools hallucinate — they report bugs on wrong line numbers or quote code that doesn't exist. The challenge was building a system that could self-verify its own findings before surfacing them to users.",
      architectureNotes: "Agent 1 — Analyzer: reads file content, generates bug report with exact quotes.\nAgent 2 — Verifier: programmatically checks quoted text & line numbers against source.\nAgent 3 — Fixer: generates patch only for verified issues.\nStatic Layer: ESLint/Pylint run in parallel for syntax-level checks.\nFrontend: React + Vite SPA with file upload and diff viewer.",
      keyDecisions: "Mandatory code quoting + programmatic verification was the core design innovation that eliminated hallucinations. Per-file isolation prevents cross-contamination of context. Self-correction pass re-runs verification after fix generation.",
      outcomes: "Reduced hallucination rate to near-zero on tested codebases. System correctly flags real bugs with accurate line numbers and provides working patches verified against source.",
      techStack: ["Python", "LangGraph", "Google Gemini", "Node.js", "Express", "React", "Vite", "TypeScript"],
      githubUrl: "https://github.com/Somesh1729/Code-Fixer",
      liveUrl: null,
      imageUrl: null,
      featured: true,
      sortOrder: 2,
    },
    {
      title: "Sahayak — AI Teaching Assistant",
      slug: "sahayak-ai-teaching-assistant",
      summary: "Multimodal AI-based voice and video teaching tool designed to make education more accessible and interactive.",
      description: "Sahayak (meaning 'helper' in Hindi) is a multimodal AI teaching assistant that combines voice interaction, video content analysis, and LLM-based Q&A to assist students. Built with JavaScript and AI APIs, it supports real-time explanations, concept breakdowns, and adaptive learning paths.",
      problemStatement: "Traditional e-learning platforms are one-directional. Students lack an interactive system that can answer follow-up questions, explain concepts in different ways, and adapt to individual learning pace.",
      architectureNotes: "Frontend: JavaScript-based UI with WebRTC for voice capture.\nAI Layer: LLM API integration for NLP understanding and response generation.\nMultimodal Input: text, voice, and video frame analysis.\nAdaptive Engine: tracks user interaction to adjust explanation depth.",
      keyDecisions: "JavaScript-first approach for rapid prototyping and browser-native audio APIs. LLM chosen for its ability to rephrase and simplify complex concepts on demand.",
      outcomes: "Functional multimodal teaching assistant capable of voice Q&A, concept explanation, and adaptive content delivery.",
      techStack: ["JavaScript", "HTML", "CSS", "WebRTC", "AI APIs", "Node.js"],
      githubUrl: "https://github.com/Somesh1729/Sahayak-AI-Teaching-Assistant",
      liveUrl: null,
      imageUrl: null,
      featured: true,
      sortOrder: 3,
    },
    {
      title: "Developer Hiring Platform",
      slug: "developer-hiring-platform",
      summary: "Real-time freelance developer booking system with crypto payment integration and live availability tracking.",
      description: "A full-stack platform connecting clients with freelance developers featuring real-time availability, in-app chat, profile matching, and cryptocurrency payment integration. Built to demonstrate modern full-stack architecture with WebSocket-based real-time features.",
      problemStatement: "Freelance platforms lack real-time availability signals and transparent payment mechanisms. The goal was to build a system where booking a developer is as simple as booking a ride.",
      architectureNotes: "Backend: Node.js/Express with WebSocket for real-time status updates.\nDatabase: PostgreSQL for persistent data, Redis for presence/availability cache.\nPayments: Crypto payment gateway integration.\nFrontend: React SPA with live notifications.",
      keyDecisions: "WebSocket-first for availability to ensure zero-latency presence updates. Crypto payments added as a differentiator for global, borderless transactions.",
      outcomes: "Functional platform with real-time developer availability, profile pages, booking flow, and crypto payment support.",
      techStack: ["Node.js", "Express", "React", "PostgreSQL", "Redis", "WebSocket", "Web3"],
      githubUrl: "https://github.com/Somesh1729/developer-hiring-platform",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      sortOrder: 4,
    },
    {
      title: "Finance Dashboard",
      slug: "finance-dashboard",
      summary: "Interactive financial analytics dashboard with real-time charts, portfolio tracking, and data visualization.",
      description: "A comprehensive finance dashboard for tracking investments, expenses, and portfolio performance. Features interactive charts, real-time data updates, and clean data visualization built with modern frontend technologies.",
      problemStatement: "Personal finance tools are often overly complex or too simplistic. The goal was a clean, fast, developer-grade dashboard for tracking financial metrics.",
      architectureNotes: "Data visualization with chart libraries.\nResponsive grid layout with component-based architecture.\nReal-time data fetching with optimistic updates.",
      keyDecisions: "Component isolation for reusability across different financial metric types. Clean separation of data fetching from presentation logic.",
      outcomes: "Production-ready finance dashboard with interactive charts, portfolio metrics, and responsive design.",
      techStack: ["React", "TypeScript", "Chart.js", "Node.js", "CSS"],
      githubUrl: "https://github.com/Somesh1729/finance-dashboard",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      sortOrder: 5,
    },
    {
      title: "Travelyt",
      slug: "travelyt",
      summary: "AI-powered travel planning and itinerary generation platform with smart recommendations.",
      description: "Travelyt is a travel planning application that leverages AI to generate personalized itineraries, suggest destinations, and optimize travel schedules based on user preferences and constraints.",
      problemStatement: "Planning a trip involves researching dozens of sources. Travelyt consolidates this into a single AI-assisted planning experience.",
      architectureNotes: "AI integration for itinerary generation.\nDestination recommendation engine.\nInteractive map and schedule views.",
      keyDecisions: "LLM-based itinerary generation over rule-based systems for flexibility and natural language interaction.",
      outcomes: "Working travel planner with AI itinerary generation and user-friendly interface.",
      techStack: ["JavaScript", "React", "AI APIs", "Node.js", "CSS"],
      githubUrl: "https://github.com/Somesh1729/Travelyt",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      sortOrder: 6,
    },
    {
      title: "AI Agent Evaluation Framework",
      slug: "ai-agent-eval",
      summary: "Framework for evaluating the accuracy, efficiency, and reliability of AI agents across task benchmarks.",
      description: "A systematic evaluation framework designed to benchmark AI agents on accuracy, latency, and task completion rate. Provides structured test suites, scoring rubrics, and comparative reporting for different agent architectures.",
      problemStatement: "AI agents are hard to evaluate objectively. This framework provides reproducible, quantitative benchmarks for agent comparison.",
      architectureNotes: "Test suite runner with configurable benchmarks.\nAgent interface abstraction for plug-and-play evaluation.\nScoring engine with weighted metrics.\nComparative reporting dashboard.",
      keyDecisions: "Abstracted agent interface allows evaluating any LLM-based agent without modifying the framework. Deterministic scoring separated from agent inference.",
      outcomes: "Functional evaluation framework capable of benchmarking multiple agent types with structured reporting.",
      techStack: ["Python", "LangGraph", "Gemini API", "pandas", "JSON"],
      githubUrl: "https://github.com/Somesh1729/ai-agent-eval",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      sortOrder: 7,
    },
    {
      title: "Bio-Translate",
      slug: "bio-translate",
      summary: "Deep learning-based biomedical speech transcription and translation system for medical professionals.",
      description: "A specialized NLP system for transcribing and processing biomedical speech. Uses deep learning models trained on medical vocabulary to accurately transcribe clinical notes, physician dictations, and medical terminology with high accuracy.",
      problemStatement: "General-purpose speech recognition systems perform poorly on medical jargon, drug names, and clinical terminology. Bio-Translate addresses this domain gap.",
      architectureNotes: "Domain-adapted ASR model fine-tuned on medical speech corpora.\nPost-processing pipeline for medical term normalization.\nTranslation layer for multilingual medical content.",
      keyDecisions: "Fine-tuning on domain-specific data was essential for accuracy. Post-processing normalization handles acronyms and drug name variations.",
      outcomes: "Improved transcription accuracy on biomedical speech compared to general-purpose ASR baselines.",
      techStack: ["Python", "PyTorch", "Hugging Face Transformers", "NLP", "ASR"],
      githubUrl: "https://github.com/Somesh1729/Bio-Translate",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      sortOrder: 8,
    },
  ];

  for (const project of realProjects) {
    await db.insert(projectsTable).values(project).onConflictDoNothing();
  }
}

router.get("/projects", async (req, res) => {
  await seedIfEmpty();
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.sortOrder));
  res.json(
    projects.map((p: any) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

router.get("/projects/featured", async (req, res) => {
  await seedIfEmpty();
  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.featured, true))
    .orderBy(asc(projectsTable.sortOrder));
  res.json(
    projects.map((p: any) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

router.get("/projects/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid project id" });
    return;
  }
  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id));
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json({
    ...project,
    createdAt: project.createdAt.toISOString(),
  });
});

export default router;
