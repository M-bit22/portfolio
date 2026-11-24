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

/* ------------------------------------------------------------------ */
/* Real or Fake? quiz — sample headlines, NOT the live model.         */
/*                                                                     */
/* Honesty rule: only two items were ever scored by the real          */
/* TruthLens model, in the live demo tests on 2026-11-22: a Federal   */
/* Reserve sample (Likely real, 100%) and a miracle-cure sample      */
/* (Likely fake, 100%). Their headlines below are paraphrases of     */
/* those tested samples. The other three are clearly-labelled sample  */
/* headlines with a known real/fake label — they were NOT scored by   */
/* the model, and no per-headline confidence score is shown for them. */
/* TruthLens's real measured result (98.7% on 7,765 unseen articles)  */
/* is shown as a separate stat, never as a per-headline score.        */
/* ------------------------------------------------------------------ */

export type QuizQuestion = {
  headline: string;
  answer: "real" | "fake";
  source: "verified-demo" | "sample";
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    headline: "Federal Reserve raises interest rates to fight rising inflation",
    answer: "real",
    source: "verified-demo",
    explanation:
      "Based on the Federal Reserve sample tested in the live TruthLens demo on 2026-11-22 — TruthLens said Likely real, 100%.",
  },
  {
    headline: "Miracle cure found: one simple drink cures every disease, doctors are stunned",
    answer: "fake",
    source: "verified-demo",
    explanation:
      "Based on the miracle-cure sample tested in the live TruthLens demo on 2026-11-22 — TruthLens said Likely fake, 100%.",
  },
  {
    headline: "City council approves funding to repair roads across Lahore",
    answer: "real",
    source: "sample",
    explanation:
      "Sample headline with a known label — a plain official announcement, the kind of thing real news looks like. Not scored by the live model.",
  },
  {
    headline: "Celebrity weight-loss tea burns fat overnight — lose 10 kg in a week, no diet needed!",
    answer: "fake",
    source: "sample",
    explanation:
      "Sample headline with a known label — a too-good-to-be-true health claim with no evidence. Not scored by the live model.",
  },
  {
    headline: "Local university opens a new library for students next month",
    answer: "real",
    source: "sample",
    explanation:
      "Sample headline with a known label — a normal, checkable local announcement. Not scored by the live model.",
  },
];

/* ------------------------------------------------------------------ */
/* RAG playground — a demo walkthrough of how the RAG apps work.      */
/* NOT a live RAG system: no real retrieval or model runs in the      */
/* browser. Document titles shown are illustrative examples of the    */
/* kind of documents the real systems search; only relative ranking   */
/* (1st, 2nd, 3rd match) is shown, never invented retrieval scores.   */
/* Real numbers used: CryptoInsight 827+ articles, 3,072-dim Gemini   */
/* embeddings, MongoDB Atlas Vector Search, cosine similarity;         */
/* University Policy Q&A page-level citations.                        */
/* ------------------------------------------------------------------ */

export type RagStep = {
  title: string;
  plain: string;
  detail: string;
};

export const RAG_STEPS: RagStep[] = [
  {
    title: "1 · Ask a question",
    plain: "You ask a question in plain words.",
    detail: "No keywords needed — just ask it like you would ask a person.",
  },
  {
    title: "2 · Turn it into an embedding",
    plain: "The question becomes a list of 3,072 numbers.",
    detail: "That list is a Gemini embedding — it captures what the question means, not just the words in it.",
  },
  {
    title: "3 · Search the vector store",
    plain: "Those numbers are compared with every document's numbers.",
    detail: "CryptoInsight compares against 827+ news articles in a MongoDB Atlas Vector Search index, using cosine similarity.",
  },
  {
    title: "4 · Retrieve the top matches",
    plain: "The closest documents win — 1st, 2nd, 3rd.",
    detail: "Only the most similar documents are kept. Anything far away is ignored, so the answer stays grounded.",
  },
  {
    title: "5 · Write a grounded answer",
    plain: "The language model answers using only those documents.",
    detail: "The answer cites its sources — page numbers for the policy app, article titles for CryptoInsight. If the documents don't say it, the answer says so.",
  },
];

export type RagSample = {
  id: string;
  label: string;
  question: string;
  project: string;
  matches: { rank: string; title: string; note: string }[];
  answer: string;
};

export const RAG_SAMPLES: RagSample[] = [
  {
    id: "crypto",
    label: "Crypto question",
    question: "What are analysts saying about Bitcoin this week?",
    project: "CryptoInsight — 827+ news articles",
    matches: [
      { rank: "1st match", title: "Bitcoin weekly market roundup", note: "Example article title" },
      { rank: "2nd match", title: "Crypto prices react to interest-rate news", note: "Example article title" },
      { rank: "3rd match", title: "Analysts discuss the Bitcoin outlook", note: "Example article title" },
    ],
    answer:
      "Example answer: analysts are mixed — some point to the interest-rate news, others to the weekly price trend. (Demo walkthrough, not a live answer.)",
  },
  {
    id: "policy",
    label: "University policy question",
    question: "How many days of leave can a student take?",
    project: "University Policy Q&A — rulebook PDFs",
    matches: [
      { rank: "1st match", title: "University rulebook — leave policy", note: "Page 12 (example)" },
      { rank: "2nd match", title: "University rulebook — attendance rules", note: "Page 8 (example)" },
      { rank: "3rd match", title: "University rulebook — semester rules", note: "Page 21 (example)" },
    ],
    answer:
      "Example answer: the leave policy on page 12 of the rulebook sets the limit — the real app quotes the exact page. (Demo walkthrough, not a live answer.)",
  },
];
