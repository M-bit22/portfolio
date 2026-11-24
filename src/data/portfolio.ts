/**
 * Single source of truth for the portfolio content.
 *
 * TODO (owner): add a photo at public/photo.jpg and set photoPath to "/photo.jpg".
 * Nothing on this site invents employment, a degree, or contact details.
 * TruthLens is the one traditional ML project here — the main work is
 * RAG / LLM backends, as the projects below show.
 */
export const PROFILE = {
  name: "Muhammad Ali Waqas",
  shortName: "Muhammad Ali",
  title: "AI Engineer",
  tagline:
    "I build AI apps that answer from real documents — RAG, LLM backends, and voice AI.",
  location: "Lahore, Pakistan",
  instructor: "Sir Iqbal Gill",
  github: "https://github.com/M-bit22",
  githubUsername: "M-bit22",
  dockerHub: "https://hub.docker.com/r/muhammadhuawei/truthlens",
  linkedin: "https://www.linkedin.com/in/muhammad-ali-1ba826348/",
  linkedinIsPlaceholder: false,
  // From your public GitHub profile, verified 2026-11-24
  email: "muhammadali.work2314@gmail.com",
  emailIsPlaceholder: false,
  // TODO: add public/photo.jpg and change this to "/photo.jpg"
  photoPath: null as string | null,
  education: "B.S. Computer Science, University of the Punjab, Lahore, 2022–2026",
  certification: "HCCDA-AI (Huawei), expected December 2026",
};

export type Project = {
  name: string;
  category: string;
  description: string;
  plainSummary: string;
  results: string[];
  stack: string[];
  github?: string;
  live?: string;
  extra?: { label: string; url: string }[];
};

export const PROJECTS: Project[] = [
  {
    name: "CryptoInsight",
    category: "Final Year Project · RAG · Crypto Intelligence",
    description:
      "An AI-powered crypto market intelligence platform. I built the AI backend for a 4-person team: a RAG chatbot that answers questions using retrieved news articles, with 3,072-dimensional Gemini embeddings for 827+ articles and a cosine-similarity Atlas Vector Search index.",
    plainSummary:
      "Answers crypto questions using real news articles. I built the AI backend for a 4-person team — it searches 827+ articles and answers with the facts it found.",
    results: [
      "RAG chatbot answering from 827+ retrieved news articles",
      "3,072-dimensional Gemini embeddings — about 2.54 million stored vector values",
      "Cosine-similarity Atlas Vector Search index for semantic retrieval",
      "Built the AI backend for a 4-person team project",
    ],
    stack: ["Python", "Flask", "LangChain", "Groq API (Llama 3.3)", "Google Gemini Embeddings", "MongoDB Atlas Vector Search"],
  },
  {
    name: "University Policy Q&A",
    category: "RAG · Document Q&A",
    description:
      "A web app where students and faculty upload university rulebook PDFs and query policies in natural language. Retrieval runs over the PDF content, so each answer is grounded in source text and includes page-level citations.",
    plainSummary:
      "Upload a university rulebook, ask a question in plain words, and get an answer from the document — with the page it came from.",
    results: [
      "Upload rulebook PDFs, ask in natural language",
      "Answers grounded in source text, with page-level citations",
      "Retrieval over PDF content — no made-up answers",
    ],
    stack: ["Python", "Streamlit", "LangChain", "Google Gemini", "RAG"],
    github: "https://github.com/M-bit22/University-policy-Q-A",
  },
  {
    name: "FinWise AI",
    category: "AI Finance Assistant",
    description:
      "An AI-powered personal finance assistant: a 5-section Streamlit dashboard (Dashboard, Budget Planner, Spending Analysis, AI Insights, Settings) with deterministic calculations for monthly expenses, remaining income, savings ratio, and expense ratio, plus a 3-stage LLM output pipeline (JSON parsing, retry without JSON mode, JSON-repair) with a non-AI fallback so the dashboard stays usable if Gemini fails.",
    plainSummary:
      "A personal finance dashboard that explains your money in plain words — budget, spending, and savings — with an AI that keeps working even if it fails.",
    results: [
      "5-section dashboard: Dashboard, Budget Planner, Spending Analysis, AI Insights, Settings",
      "Deterministic calculations: expenses, remaining income, savings and expense ratios",
      "3-stage LLM output pipeline with a non-AI fallback",
    ],
    stack: ["Python", "Streamlit", "LangChain", "Google Gemini", "Pandas", "Matplotlib"],
    github: "https://github.com/M-bit22/FinWise-AI",
  },
  {
    name: "TruthLens",
    category: "Classic ML · NLP — my one traditional ML project",
    description:
      "A Streamlit app that classifies news text as real or fake, with a confidence score. Trained on 2015–2018 news and tested on 7,765 unseen articles. This is my one traditional machine-learning project — most of my work is RAG and LLM backends.",
    plainSummary: "Checks if a news story is real or fake. It was correct 98.7% of the time on 7,765 news articles.",
    results: [
      "98.7% accuracy on 7,765 unseen articles",
      "Logistic Regression 98.7% · Naive Bayes 94.3% · Passive Aggressive 98.9%",
      "Live demo and Docker image published",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "NLTK", "Streamlit", "Docker"],
    github: "https://github.com/M-bit22/truthlens.git",
    live: "https://truthlens.streamlit.app",
    extra: [{ label: "Docker Hub", url: "https://hub.docker.com/r/muhammadhuawei/truthlens" }],
  },
  {
    name: "SupportPearlz",
    category: "RAG · Customer Support",
    description:
      "A LangChain RAG customer support chatbot. It answers questions from uploaded knowledge-base documents (PDF, DOCX, TXT) using FAISS vector search and Google Gemini, and shows the source filenames with each answer.",
    plainSummary:
      "Ask a question about a company's documents and get an answer from those documents — with the source shown.",
    results: [
      "Answers grounded in uploaded knowledge-base documents",
      "FAISS vector search + Google Gemini",
      "PDF, DOCX and TXT support, with source info shown",
      "Basic evaluation script for answer and source checks",
    ],
    stack: ["Python", "Streamlit", "LangChain", "Google Gemini", "FAISS"],
    github: "https://github.com/M-bit22/SupportPearlz",
  },
  {
    name: "Gemini Travel Advisor",
    category: "Voice AI · Travel Q&A",
    description:
      "A voice-in, voice-out travel advisor. Ask a travel question by voice, get a text answer plus a spoken reply, powered by Gemini.",
    plainSummary: "Ask a travel question by speaking, and get a spoken answer back. No typing needed.",
    results: [
      "Voice recording input — no typing needed",
      "Spoken audio answers (TTS)",
      "Built under the guidance of Sir Iqbal Gill",
    ],
    stack: ["Python", "Streamlit", "Gemini AI", "Text-to-Speech"],
    github: "https://github.com/M-bit22/Gemini-Travel-Advisor",
    live: "https://gemini-travel-advisor-1.streamlit.app",
  },
  {
    name: "Job Application Tracker",
    category: "Full-Stack Web App",
    description:
      "A complete tracker for job hunting: save applications, follow their status, get reminders, and upload documents — so nothing falls through the cracks.",
    plainSummary: "Keeps track of every job you apply for — what stage it is at, when to follow up, and what documents you sent.",
    results: [
      "Application CRUD with Applied / Screening / Interview / Offer / Rejected",
      "Dashboard stats, success rate, search and filters",
      "Reminders and document upload per application",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "SQLite", "JWT", "bcrypt"],
    github: "https://github.com/M-bit22",
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI & RAG",
    items: ["LangChain", "RAG", "LLM Integration", "Gemini API", "Groq API", "Prompt Engineering", "Embeddings", "Vector Search", "Semantic Search", "FAISS", "MongoDB Atlas Vector Search"],
  },
  {
    group: "ML Foundations (learning)",
    items: ["Scikit-learn", "PyTorch (learning)", "Classic ML Algorithms", "Model Evaluation", "NLP", "NLTK"],
  },
  {
    group: "Backend & Web",
    items: ["Python", "Flask", "REST API Design", "Streamlit", "JavaScript", "React", "Next.js", "Node.js", "Express", "SQLite"],
  },
  {
    group: "Automation & Agents (worked with)",
    items: ["n8n", "CrewAI"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "python-dotenv", "PyMongo", "MongoDB Atlas"],
  },
];

export const JOURNEY = [
  {
    title: "B.S. Computer Science — University of the Punjab",
    detail: "2022–2026, Lahore. My AI work was built here, including my final year project.",
  },
  {
    title: "Learning AI engineering",
    detail:
      "Learning and building under the guidance of instructor Sir Iqbal Gill — focused on real projects, not just theory.",
  },
  {
    title: "CryptoInsight — final year project",
    detail:
      "Built the AI backend for a 4-person team: a RAG chatbot over 827+ crypto news articles, with Gemini embeddings and MongoDB Atlas Vector Search.",
  },
  {
    title: "RAG apps — University Policy Q&A, FinWise AI, SupportPearlz",
    detail:
      "Built document Q&A, a finance assistant, and a support chatbot — all answering from real documents, grounded in retrieved text.",
  },
  {
    title: "TruthLens — my one classic ML project",
    detail:
      "Trained an NLP model the traditional way, measured it honestly on 7,765 unseen articles: 98.7% accuracy.",
  },
  {
    title: "Certification — HCCDA-AI (Huawei)",
    detail: "Expected December 2026.",
  },
  {
    title: "Now: looking for an AI Engineer internship / junior role",
    detail:
      "Open to AI Engineer internships and junior roles where I can keep building RAG and LLM backends, learning, and shipping real products.",
  },
];
