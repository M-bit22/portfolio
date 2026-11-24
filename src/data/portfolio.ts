/**
 * Single source of truth for the portfolio content.
 *
 * TODO (owner): replace the placeholders below with real details.
 * - LINKEDIN_URL: your LinkedIn profile URL
 * - EMAIL: your public contact email
 * - PHOTO: add a photo at public/photo.jpg and set photoPath to "/photo.jpg"
 * Nothing else on this site invents employment, a degree, or contact details.
 */
export const PROFILE = {
  name: "Muhammad Ali Waqas",
  shortName: "Muhammad Ali",
  title: "AI Engineer",
  tagline:
    "I build machine-learning products that people can actually use — from fake-news detection to full-stack apps.",
  location: "Lahore, Pakistan",
  instructor: "Sir Iqbal Gill",
  github: "https://github.com/M-bit22",
  githubUsername: "M-bit22",
  dockerHub: "https://hub.docker.com/r/muhammadhuawei/truthlens",
  // TODO: replace with your real LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/TODO-muhammad-ali-waqas",
  linkedinIsPlaceholder: true,
  // From your public GitHub profile, verified 2026-11-24
  email: "muhammadali.work2314@gmail.com",
  emailIsPlaceholder: false,
  // TODO: add public/photo.jpg and change this to "/photo.jpg"
  photoPath: null as string | null,
};

export type Project = {
  name: string;
  category: string;
  description: string;
  results: string[];
  stack: string[];
  github?: string;
  live?: string;
  extra?: { label: string; url: string }[];
};

export const PROJECTS: Project[] = [
  {
    name: "TruthLens",
    category: "Fake News Detection · NLP / ML",
    description:
      "A Streamlit app that classifies news text as real or fake, with a confidence score. Trained on 2015–2018 news and tested on 7,765 unseen articles.",
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
    name: "Job Application Tracker",
    category: "Full-Stack Web App",
    description:
      "A complete tracker for job hunting: save applications, follow their status, get reminders, and upload documents — so nothing falls through the cracks.",
    results: [
      "Application CRUD with Applied / Screening / Interview / Offer / Rejected",
      "Dashboard stats, success rate, search and filters",
      "Reminders and document upload per application",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "SQLite", "JWT", "bcrypt"],
    github: "https://github.com/M-bit22",
  },
  {
    name: "Gemini Travel Advisor",
    category: "Voice AI · Travel Q&A",
    description:
      "A voice-in, voice-out travel advisor. Ask a travel question by voice, get a text answer plus a spoken reply, powered by Gemini.",
    results: [
      "Voice recording input — no typing needed",
      "Spoken audio answers (TTS)",
      "Built under the guidance of Sir Iqbal Gill",
    ],
    stack: ["Python", "Streamlit", "Gemini AI", "Text-to-Speech"],
    github: "https://github.com/M-bit22/Gemini-Travel-Advisor",
    live: "https://gemini-travel-advisor-1.streamlit.app",
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI & Machine Learning",
    items: ["Python", "Machine Learning", "NLP", "Scikit-learn", "NLTK", "Model Evaluation", "LangChain", "RAG"],
  },
  {
    group: "Data",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Cleaning", "Vector Embeddings"],
  },
  {
    group: "Web Development",
    items: ["React", "Next.js", "JavaScript", "Node.js", "Express", "Streamlit", "SQLite", "Flask"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code"],
  },
];

export const JOURNEY = [
  {
    title: "Learning AI engineering",
    detail:
      "Learning and building under the guidance of instructor Sir Iqbal Gill — focused on real projects, not just theory.",
  },
  {
    title: "TruthLens — fake news detection",
    detail:
      "Built and trained an NLP model, measured it honestly on unseen data, and shipped it as a live Streamlit app and Docker image.",
  },
  {
    title: "Job Application Tracker — full-stack",
    detail:
      "Built a complete React + Node.js app with auth, a database, reminders, and file uploads — the tool I use for my own job hunt.",
  },
  {
    title: "Gemini Travel Advisor — voice AI",
    detail:
      "Built a voice-in, voice-out travel Q&A app with Gemini, showing how LLMs can work through speech, not just text.",
  },
  {
    title: "Now: looking for AI / ML roles",
    detail:
      "Open to junior AI Engineer and ML roles where I can keep building, learning, and shipping real products.",
  },
];
