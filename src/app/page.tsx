"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MiniTerminal from "@/components/MiniTerminal";
import { JOURNEY, PROFILE, PROJECTS, SKILLS } from "@/data/portfolio";

/* ------------------------------------------------------------------ */
/* Hero terminal — typed, line by line. Reduced-motion users see it all. */
/* ------------------------------------------------------------------ */

const HERO_LINES: { cmd: string; out: string[] }[] = [
  {
    cmd: "whoami",
    out: ["Muhammad Ali Waqas — AI Engineer", "Lahore, Pakistan · open to junior AI / ML roles"],
  },
  {
    cmd: "cat what-i-build.txt",
    out: ["ML products people can actually use —", "fake-news detection, full-stack apps, voice AI."],
  },
  {
    cmd: "ls projects/",
    out: ["truthlens/   job-tracker/   travel-advisor/"],
  },
  {
    cmd: "echo $STATUS",
    out: ["available for work — and shipping, not just talking about it."],
  },
];

function HeroTerminal() {
  const [shown, setShown] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setShown(HERO_LINES.length), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setInterval(() => {
      setShown((s) => {
        if (s >= HERO_LINES.length) {
          window.clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 650);
    return () => window.clearInterval(id);
  }, []);

  // Clock only after mount, so the server render stays deterministic.
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="scanlines overflow-hidden rounded-xl border border-[#1d2b1d] bg-[#080d08] shadow-[0_0_0_1px_rgba(74,222,128,0.06),0_24px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 border-b border-[#1d2b1d] bg-[#0a0f0a] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-[#8a9a8a]">muhammad@portfolio: ~</span>
        <span className="ml-auto font-mono text-[11px] text-[#5b6b5b] tabular-nums">{time || "--:--:--"}</span>
      </div>
      <div className="min-h-[248px] px-4 py-4 font-mono text-[13px] leading-relaxed sm:px-5 sm:text-sm">
        {HERO_LINES.slice(0, shown).map((line) => (
          <div key={line.cmd} className="mb-3">
            <p className="text-[#e8f5e8]">
              <span className="text-[#4ade80]">muhammad@portfolio:~$</span> {line.cmd}
            </p>
            {line.out.map((o) => (
              <p key={o} className="pl-1 text-[#9fb49f]">
                {o}
              </p>
            ))}
          </div>
        ))}
        {shown < HERO_LINES.length ? (
          <p className="text-[#e8f5e8]">
            <span className="text-[#4ade80]">muhammad@portfolio:~$</span>{" "}
            <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-[#4ade80]" />
          </p>
        ) : (
          <p className="text-[#e8f5e8]">
            <span className="text-[#4ade80]">muhammad@portfolio:~$</span>{" "}
            <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-[#4ade80]" />
            <span className="ml-2 text-[#5b6b5b]">— scroll down, or type below</span>
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* File explorer                                                       */
/* ------------------------------------------------------------------ */

type NodeId = string;

const TREE: { id: NodeId; label: string; kind: "file" | "folder"; children?: NodeId[]; hint?: string }[] = [
  { id: "about.md", label: "about.md", kind: "file", hint: "who I am" },
  { id: "projects", label: "projects/", kind: "folder", children: ["projects/truthlens", "projects/tracker", "projects/travel"] },
  { id: "projects/truthlens", label: "truthlens.md", kind: "file", hint: "98.7% accuracy" },
  { id: "projects/tracker", label: "job-tracker.md", kind: "file", hint: "full-stack" },
  { id: "projects/travel", label: "travel-advisor.md", kind: "file", hint: "voice AI" },
  { id: "skills", label: "skills/", kind: "folder", children: ["skills/ai", "skills/data", "skills/web", "skills/tools"] },
  { id: "skills/ai", label: "ai-ml.txt", kind: "file", hint: "Python · LangChain · RAG" },
  { id: "skills/data", label: "data.txt", kind: "file", hint: "Pandas · NumPy" },
  { id: "skills/web", label: "web.txt", kind: "file", hint: "React · Next.js · Node" },
  { id: "skills/tools", label: "tools.txt", kind: "file", hint: "Git · Docker" },
  { id: "journey.log", label: "journey.log", kind: "file", hint: "how I got here" },
  { id: "contact.md", label: "contact.md", kind: "file", hint: "say hello" },
];

const TOP_LEVEL: NodeId[] = ["about.md", "projects", "skills", "journey.log", "contact.md"];
const SKILL_BY_ID: Record<string, number> = { "skills/ai": 0, "skills/data": 1, "skills/web": 2, "skills/tools": 3 };
const PROJECT_BY_ID: Record<string, number> = { "projects/truthlens": 0, "projects/tracker": 1, "projects/travel": 2 };

function useReveal(view: "terminal" | "simple") {
  // Re-runs on every view change: when Terminal View is remounted after
  // toggling back from Simple View, its .reveal elements are brand-new DOM
  // nodes that no earlier observer ever saw. Without this, they would stay
  // at opacity: 0 forever (the toggle-back blank-hero bug).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      io.observe(el);
      // Deterministic: elements already in the viewport (e.g. the hero
      // after toggling back to Terminal View) show immediately, without
      // waiting on observer timing or a scroll event. Below-fold elements
      // are left hidden until the observer fires as the user scrolls.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add("is-visible");
    });
    return () => io.disconnect();
  }, [view]);
}


/* ------------------------------------------------------------------ */
/* Simple View — a normal, easy-to-read version for non-technical      */
/* visitors. No terminal words, no file names, no commands. Same data. */
/* ------------------------------------------------------------------ */

function SimpleView({ onSwitchToTerminal }: { onSwitchToTerminal: () => void }) {
  return (
    <div>
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#9fb49f]">
          You are viewing the <strong className="text-[#f2f7f2]">Simple View</strong> — the
          easy-to-read version of this site.
        </p>
        <button
          type="button"
          onClick={onSwitchToTerminal}
          className="shrink-0 rounded-md border border-[#4ade80]/40 px-4 py-2 text-sm font-semibold text-[#4ade80] transition hover:-translate-y-0.5 hover:bg-[#4ade80] hover:text-[#04140a] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
        >
          Switch to Terminal View
        </button>
      </div>

      <section className="pt-10 sm:pt-14">
        <p className="text-sm font-semibold text-[#4ade80]">
          <span className="pulse-dot mr-2 inline-block h-2 w-2 rounded-full bg-[#4ade80]" />
          Available for work — junior AI / ML roles
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#f2f7f2] sm:text-6xl">
          Muhammad Ali Waqas
        </h1>
        <p className="mt-2 text-2xl font-semibold text-[#4ade80] sm:text-3xl">AI Engineer</p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#c4d4c4]">
          {PROFILE.tagline} I learn by shipping — data, model, app, deployment — and I measure the
          result honestly, in public.
        </p>
        <p className="mt-3 text-sm text-[#8a9a8a]">
          Built while learning under instructor {PROFILE.instructor}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#simple-projects"
            className="rounded-md bg-[#4ade80] px-5 py-2.5 font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
          >
            See My Projects
          </a>
          <a
            href="#simple-contact"
            className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]"
          >
            Contact Me
          </a>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { value: "98.7%", label: "TruthLens accuracy — correct on 98.7 out of every 100 news articles tested" },
            { value: "7,765", label: "News articles used to test TruthLens" },
            { value: "3", label: "Projects built and shared" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] px-4 py-4">
              <p className="text-2xl font-bold text-[#4ade80] sm:text-3xl">{s.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#9fb49f] sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <h2 className="text-3xl font-bold text-[#f2f7f2]">About Me</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c4d4c4]">
          I am an AI Engineer from Lahore, Pakistan. I build machine-learning products that people
          can actually use — from checking whether news is real or fake, to full websites and apps.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#c4d4c4]">
          I learn by building things end to end: I prepare the data, train the model, test it
          honestly on new data, and then turn it into an app anyone can try.
        </p>
        <ul className="mt-5 max-w-2xl space-y-2 text-base leading-relaxed text-[#c4d4c4]">
          <li>• I train and test machine-learning models with Python, Scikit-learn, Pandas, and NLTK.</li>
          <li>• I turn models into apps people can use, with Streamlit, React, and Next.js.</li>
          <li>• I build full websites and apps with Node.js, Express, and SQLite — including logins, file uploads, and reminders.</li>
          <li>• I share my work openly on GitHub, with live demos and Docker images.</li>
        </ul>
      </section>

      <section id="simple-projects" className="scroll-mt-24 pt-16">
        <h2 className="text-3xl font-bold text-[#f2f7f2]">My Projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#9fb49f]">
          Three projects I built, tested, and shared. Each one taught me a different skill.
        </p>
        <div className="mt-8 space-y-6">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] p-6 transition hover:-translate-y-0.5 hover:border-[#4ade80]/40 sm:p-7"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#4ade80]">{p.category}</p>
              <h3 className="mt-2 text-2xl font-bold text-[#f2f7f2]">{p.name}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[#c4d4c4]">{p.plainSummary}</p>
              <p className="mt-2 text-base leading-relaxed text-[#9fb49f]">{p.description}</p>
              <ul className="mt-4 space-y-2">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-2 text-base text-[#d6e2d6]">
                    <span className="text-[#4ade80]">✓</span> {r}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-2.5 py-1 text-sm text-[#9fb49f]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-[#4ade80] px-5 py-2.5 font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
                  >
                    Live Demo
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]"
                  >
                    GitHub
                  </a>
                )}
                {p.extra?.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              {p.name === "TruthLens" && (
                <p className="mt-5 rounded-lg border border-[#1d2b1d] bg-[#080d08] px-4 py-3 text-sm leading-relaxed text-[#8a9a8a]">
                  Please note: the live demo has been unreliable at times. The numbers above come
                  from testing on real news articles, not from the demo.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <h2 className="text-3xl font-bold text-[#f2f7f2]">My Skills</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#9fb49f]">
          Tools I have actually used in the projects above — not just a list.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SKILLS.map((group) => (
            <div
              key={group.group}
              className="rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] p-6 transition hover:-translate-y-0.5 hover:border-[#4ade80]/40"
            >
              <h3 className="text-lg font-semibold text-[#4ade80]">{group.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span key={s} className="rounded-md border border-[#1d2b1d] bg-[#080d08] px-3 py-1.5 text-sm text-[#d6e2d6]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <h2 className="text-3xl font-bold text-[#f2f7f2]">How I Got Here</h2>
        <ol className="mt-8 space-y-6">
          {JOURNEY.map((step, i) => (
            <li key={step.title} className="border-l-2 border-[#4ade80]/40 pl-5">
              <p className="text-sm font-semibold text-[#4ade80]">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-[#f2f7f2]">{step.title}</h3>
              <p className="mt-1 max-w-2xl text-base leading-relaxed text-[#9fb49f]">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="simple-contact" className="scroll-mt-24 pt-16 pb-16">
        <div className="rounded-xl border border-[#4ade80]/30 bg-[#0a0f0a] p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-[#f2f7f2]">Contact Me</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#9fb49f]">
            I would love to hear about junior AI Engineer or ML roles, internships, or freelance
            projects. Email is the fastest way to reach me — GitHub is second.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={"mailto:" + PROFILE.email}
              className="rounded-md bg-[#4ade80] px-5 py-2.5 font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
            >
              Email Me: {PROFILE.email}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[#1d2b1d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]"
            >
              GitHub — @{PROFILE.githubUsername}
            </a>
          </div>
          <p className="mt-5 text-base text-[#9fb49f]">Based in {PROFILE.location}.</p>
          <p className="mt-1 text-sm text-[#8a9a8a]">
            {PROFILE.linkedinIsPlaceholder ? "LinkedIn — link coming soon" : "LinkedIn: " + PROFILE.linkedin}
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<"terminal" | "simple">("terminal");
  // Must run after `view` exists: re-observes .reveal elements on each toggle.
  useReveal(view);
  const [selected, setSelected] = useState<NodeId>("projects/truthlens");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["projects", "skills"]));
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.name, p.category, p.description, ...p.stack, ...p.results].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  function toggleFolder(id: string) {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function select(id: NodeId) {
    setSelected(id);
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const selectedProject =
    selected.startsWith("projects/") && PROJECT_BY_ID[selected] !== undefined
      ? PROJECTS[PROJECT_BY_ID[selected]]
      : null;
  const selectedSkill =
    selected.startsWith("skills/") && SKILL_BY_ID[selected] !== undefined
      ? SKILLS[SKILL_BY_ID[selected]]
      : null;

  const treeNode = TREE.find((n) => n.id === selected);
  const detailTitle = treeNode?.label ?? selected;

  return (
    <div className="min-h-screen bg-[#060906] text-[#d6e2d6]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[#1d2b1d] bg-[#060906]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 font-mono text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#4ade80]/40 bg-[#0d130d] text-xs font-bold text-[#4ade80]">~/</span>
            <span className="hidden text-[#e8f5e8] min-[480px]:inline">muhammad@portfolio</span>
            <span className="hidden text-[#5b6b5b] sm:inline">:~$</span>
          </a>
          <div className="ml-auto flex items-center rounded-lg border border-[#1d2b1d] bg-[#0a0f0a] p-1" role="group" aria-label="View mode">
            <button
              type="button"
              onClick={() => setView("terminal")}
              aria-pressed={view === "terminal"}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#4ade80] sm:px-3 sm:text-xs ${view === "terminal" ? "bg-[#4ade80] text-[#04140a]" : "text-[#9fb49f] hover:text-[#4ade80]"}`}
            >
              Terminal View
            </button>
            <button
              type="button"
              onClick={() => setView("simple")}
              aria-pressed={view === "simple"}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#4ade80] sm:px-3 sm:text-xs ${view === "simple" ? "bg-[#4ade80] text-[#04140a]" : "text-[#9fb49f] hover:text-[#4ade80]"}`}
            >
              Simple View
            </button>
          </div>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-[#4ade80]/40 px-3 py-1.5 font-mono text-xs text-[#4ade80] transition hover:-translate-y-0.5 hover:bg-[#4ade80] hover:text-[#04140a] focus-visible:outline-2 focus-visible:outline-[#4ade80] sm:inline-block"
          >
            github ↗
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {view === "terminal" && (
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#4ade80]/30 bg-[#0a0f0a] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-[#d6e2d6]">
              <strong className="text-[#f2f7f2]">New here?</strong> This site is styled like a
              computer terminal. If you prefer a normal, easy-to-read version, switch to Simple View.
            </p>
            <button
              type="button"
              onClick={() => setView("simple")}
              className="shrink-0 rounded-md bg-[#4ade80] px-4 py-2 text-sm font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
            >
              Switch to Simple View
            </button>
          </div>
        )}
        {view === "simple" ? (
          <SimpleView onSwitchToTerminal={() => setView("terminal")} />
        ) : (
          <>
        {/* Hero */}
        <section className="pt-10 sm:pt-14">
          <p className="reveal font-mono text-xs text-[#4ade80]">
            <span className="pulse-dot mr-2 inline-block h-2 w-2 rounded-full bg-[#4ade80]" />
            available for work — junior AI / ML roles
          </p>
          <h1 className="reveal mt-5 text-4xl font-bold leading-[1.02] tracking-tight text-[#f2f7f2] sm:text-6xl">
            Muhammad Ali Waqas
            <span className="mt-2 block font-mono text-2xl font-medium text-[#4ade80] sm:text-3xl">
              AI Engineer<span className="text-[#5b6b5b]">_</span>
            </span>
          </h1>
          <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-[#9fb49f] sm:text-lg">
            {PROFILE.tagline} I learn by shipping — data, model, app, deployment — and I measure the
            result honestly, in public.
          </p>
          <p className="reveal mt-3 font-mono text-xs text-[#8a9a8a]">
            # built while learning under instructor {PROFILE.instructor}
          </p>

          <div className="reveal mt-6 flex flex-wrap gap-3 font-mono text-sm">
            <a
              href="#explorer"
              className="rounded-md bg-[#4ade80] px-5 py-2.5 font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
            >
              $ ls projects/
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]"
            >
              github — @{PROFILE.githubUsername} ↗
            </a>
          </div>

          <div className="reveal mt-8">
            <HeroTerminal />
          </div>

          {/* Stats as terminal output, not gradient cards */}
          <div className="reveal mt-6 grid grid-cols-3 gap-3 font-mono text-sm sm:gap-4">
            {[
              { value: "98.7%", label: "TruthLens accuracy" },
              { value: "7,765", label: "unseen articles tested" },
              { value: "3", label: "shipped projects" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-[#1d2b1d] bg-[#0a0f0a] px-3 py-3 sm:px-4">
                <p className="text-lg font-bold text-[#4ade80] sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#8a9a8a] sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="reveal mt-4 font-mono text-xs text-[#5b6b5b]">
            # every number above is measured on real, unseen data — not a self-rating.
          </p>
        </section>

        {/* Explorer */}
        <section id="explorer" className="reveal scroll-mt-24 pt-16">
          <p className="font-mono text-xs text-[#4ade80]">~/explorer</p>
          <h2 className="mt-2 text-2xl font-bold text-[#f2f7f2] sm:text-3xl">Browse the work like a repo</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9fb49f]">
            Click a file on the left. The right pane is its contents — no marketing copy, just what it
            does, what it measured, and where to open it.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]">
            {/* Tree */}
            <div className="rounded-xl border border-[#1d2b1d] bg-[#0a0f0a]">
              <div className="flex items-center justify-between border-b border-[#1d2b1d] px-4 py-2.5">
                <span className="font-mono text-xs text-[#8a9a8a]">EXPLORER</span>
                <span className="font-mono text-[11px] text-[#5b6b5b]">~/</span>
              </div>
              <ul className="px-2 py-2 font-mono text-[13px]">
                {TOP_LEVEL.map((id) => {
                  const node = TREE.find((n) => n.id === id)!;
                  if (node.kind === "folder") {
                    const open = openFolders.has(id);
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => toggleFolder(id)}
                          aria-expanded={open}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[#d6e2d6] transition hover:bg-[#0d130d] hover:text-[#4ade80]"
                        >
                          <span className="w-3 text-[#5b6b5b]">{open ? "▾" : "▸"}</span>
                          <span>{open ? "📂" : "📁"}</span> {node.label}
                        </button>
                        {open &&
                          node.children?.map((childId) => {
                            const child = TREE.find((n) => n.id === childId)!;
                            return (
                              <button
                                key={childId}
                                type="button"
                                onClick={() => select(childId)}
                                aria-current={selected === childId}
                                className={`ml-6 flex w-[calc(100%-1.5rem)] items-center gap-2 rounded-md px-2 py-1.5 text-left transition hover:bg-[#0d130d] ${
                                  selected === childId
                                    ? "bg-[#4ade80]/10 text-[#4ade80]"
                                    : "text-[#9fb49f] hover:text-[#4ade80]"
                                }`}
                              >
                                <span className="text-[#5b6b5b]">├──</span> {child.label}
                                <span className="ml-auto hidden text-[11px] text-[#5b6b5b] xl:inline">{child.hint}</span>
                              </button>
                            );
                          })}
                      </li>
                    );
                  }
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => select(id)}
                        aria-current={selected === id}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition hover:bg-[#0d130d] ${
                          selected === id ? "bg-[#4ade80]/10 text-[#4ade80]" : "text-[#9fb49f] hover:text-[#4ade80]"
                        }`}
                      >
                        <span className="w-3" />
                        <span>📄</span> {node.label}
                        <span className="ml-auto hidden text-[11px] text-[#5b6b5b] xl:inline">{node.hint}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-[#1d2b1d] px-4 py-3">
                <label htmlFor="project-search" className="font-mono text-[11px] text-[#5b6b5b]">
                  $ grep projects/
                </label>
                <input
                  id="project-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="truthlens, python, react…"
                  autoComplete="off"
                  className="mt-1.5 w-full rounded-md border border-[#1d2b1d] bg-[#080d08] px-3 py-2 font-mono text-xs text-[#e8f5e8] outline-none placeholder:text-[#5b6b5b] focus:border-[#4ade80]/60"
                />
                <p className="mt-2 font-mono text-[11px] text-[#5b6b5b]">
                  {filteredProjects.length} of {PROJECTS.length} projects match
                </p>
              </div>
            </div>

            {/* Detail pane */}
            <div ref={detailRef} className="min-h-[320px] rounded-xl border border-[#1d2b1d] bg-[#080d08]">
              <div className="flex items-center gap-2 border-b border-[#1d2b1d] bg-[#0a0f0a] px-4 py-2.5">
                <span className="font-mono text-xs text-[#4ade80]">$ cat</span>
                <span className="font-mono text-xs text-[#e8f5e8]">~/{detailTitle}</span>
              </div>
              <div className="px-5 py-5">
                {selected === "about.md" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#f2f7f2]">An engineer who learns by shipping</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9fb49f]">
                      I am an AI Engineer focused on machine learning and practical products. I learn by
                      building end to end: data, model, app, deployment — and measuring the result honestly.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#9fb49f]">
                      <li><span className="font-mono text-[#4ade80]">&gt;</span> Train and evaluate ML models with Scikit-learn, Pandas, and NLTK.</li>
                      <li><span className="font-mono text-[#4ade80]">&gt;</span> Turn models into usable apps with Streamlit, React, and Next.js.</li>
                      <li><span className="font-mono text-[#4ade80]">&gt;</span> Build full-stack apps with Node.js, Express, and SQLite — auth, file uploads, reminders.</li>
                      <li><span className="font-mono text-[#4ade80]">&gt;</span> Ship with Git, GitHub, and Docker. A live demo, not just code.</li>
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-[#9fb49f]">
                      I built these projects while learning under my instructor,{" "}
                      <strong className="text-[#e8f5e8]">{PROFILE.instructor}</strong> — each one taught a
                      different skill: NLP and model evaluation, full-stack development, and voice AI.
                    </p>
                  </div>
                )}

                {selectedProject && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#4ade80]">{selectedProject.category}</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#f2f7f2]">{selectedProject.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9fb49f]">{selectedProject.description}</p>
                    <ul className="mt-4 space-y-2">
                      {selectedProject.results.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-[#d6e2d6]">
                          <span className="font-mono text-[#4ade80]">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedProject.stack.map((t) => (
                        <span key={t} className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-2 py-1 font-mono text-[11px] text-[#9fb49f]">{t}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {selectedProject.live && (
                        <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#4ade80] px-4 py-2 font-mono text-xs font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac]">live demo ↗</a>
                      )}
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1d2b1d] px-4 py-2 font-mono text-xs text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]">github ↗</a>
                      )}
                      {selectedProject.extra?.map((l) => (
                        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1d2b1d] px-4 py-2 font-mono text-xs text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]">{l.label} ↗</a>
                      ))}
                    </div>
                    {selectedProject.name === "TruthLens" && (
                      <p className="mt-4 font-mono text-xs leading-relaxed text-[#8a9a8a]">
                        # honest note: the TruthLens demo has been flaky on Streamlit Cloud.
                        The model and metrics are in the repo — the numbers above are from
                        the measured test set, not from the demo page.
                      </p>
                    )}
                  </div>
                )}

                {selectedSkill && (
                  <div>
                    <h3 className="text-xl font-bold text-[#f2f7f2]">{selectedSkill.group}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedSkill.items.map((s) => (
                        <span key={s} className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-3 py-1.5 font-mono text-xs text-[#d6e2d6]">{s}</span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#9fb49f]">
                      No percentage bars. If a tool is listed here, there is a shipped project in this
                      repo that used it — open the projects folder and check.
                    </p>
                  </div>
                )}

                {selected === "journey.log" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#f2f7f2]">journey.log — how I got here</h3>
                    <p className="mt-2 font-mono text-xs text-[#8a9a8a]"># no invented job titles. The honest path, in order.</p>
                    <ol className="mt-4 space-y-4">
                      {JOURNEY.map((step, i) => (
                        <li key={step.title} className="border-l-2 border-[#4ade80]/40 pl-4">
                          <p className="font-mono text-xs text-[#4ade80]">{String(i + 1).padStart(2, "0")}</p>
                          <h4 className="mt-1 font-semibold text-[#f2f7f2]">{step.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-[#9fb49f]">{step.detail}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {selected === "contact.md" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#f2f7f2]">contact.md</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9fb49f]">
                      Looking for a junior AI / ML role, an internship, or a freelance project? The
                      fastest way to reach me is email or GitHub.
                    </p>
                    <dl className="mt-4 space-y-2 font-mono text-sm">
                      <div className="flex gap-3"><dt className="w-20 shrink-0 text-[#5b6b5b]">email</dt><dd><a className="text-[#4ade80] underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
                      <div className="flex gap-3"><dt className="w-20 shrink-0 text-[#5b6b5b]">github</dt><dd><a className="text-[#4ade80] underline" href={PROFILE.github} target="_blank" rel="noopener noreferrer">{PROFILE.github}</a></dd></div>
                      <div className="flex gap-3"><dt className="w-20 shrink-0 text-[#5b6b5b]">location</dt><dd className="text-[#d6e2d6]">{PROFILE.location}</dd></div>
                      <div className="flex gap-3"><dt className="w-20 shrink-0 text-[#5b6b5b]">linkedin</dt><dd className="text-[#8a9a8a]">{PROFILE.linkedinIsPlaceholder ? "link coming soon" : PROFILE.linkedin}</dd></div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search results strip — the filtered project list, still terminal-styled */}
          <div className="mt-4 rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] px-4 py-3 font-mono text-xs text-[#9fb49f]">
            <span className="text-[#4ade80]">$ grep -i &quot;{query || "…"}&quot; projects/</span>
            <span className="ml-3">
              {filteredProjects.length === 0
                ? "no matches — try python, react, voice, or fake-news"
                : filteredProjects.map((p) => p.name).join("  ·  ")}
            </span>
          </div>
        </section>

        {/* Skills index */}
        <section id="skills-section" className="reveal scroll-mt-24 pt-16">
          <p className="font-mono text-xs text-[#4ade80]">~/skills</p>
          <h2 className="mt-2 text-2xl font-bold text-[#f2f7f2] sm:text-3xl">Tools I actually use</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SKILLS.map((group) => (
              <div key={group.group} className="rounded-xl border border-[#1d2b1d] bg-[#0a0f0a] p-5 transition hover:-translate-y-0.5 hover:border-[#4ade80]/40">
                <h3 className="font-mono text-sm font-semibold text-[#4ade80]">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span key={s} className="rounded-md border border-[#1d2b1d] bg-[#080d08] px-2.5 py-1 font-mono text-xs text-[#d6e2d6]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mini terminal */}
        <section id="terminal" className="reveal scroll-mt-24 pt-16">
          <p className="font-mono text-xs text-[#4ade80]">~/terminal</p>
          <h2 className="mt-2 text-2xl font-bold text-[#f2f7f2] sm:text-3xl">Don&apos;t just read it — run it</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9fb49f]">
            This terminal is part of the site. Type a command, or tap one below. It answers from the
            same data as the rest of the page.
          </p>
          <div className="mt-6">
            <MiniTerminal />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="reveal scroll-mt-24 pt-16 pb-16">
          <div className="rounded-xl border border-[#4ade80]/30 bg-[#0a0f0a] p-6 sm:p-8">
            <p className="font-mono text-xs text-[#4ade80]">$ ./hire-me --role &quot;AI Engineer&quot;</p>
            <h2 className="mt-3 text-2xl font-bold text-[#f2f7f2] sm:text-3xl">Let&apos;s talk about an AI / ML role</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#9fb49f]">
              I would love to hear about junior AI Engineer or ML roles, internships, or freelance
              projects. Email is fastest — GitHub is second.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
              <a href={`mailto:${PROFILE.email}`} className="rounded-md bg-[#4ade80] px-5 py-2.5 font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac]">
                {PROFILE.email}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1d2b1d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]">
                github — @{PROFILE.githubUsername} ↗
              </a>
              {PROFILE.linkedinIsPlaceholder ? (
                <span className="rounded-md border border-dashed border-[#1d2b1d] px-5 py-2.5 text-[#8a9a8a]">LinkedIn — link coming soon</span>
              ) : (
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#1d2b1d] px-5 py-2.5 text-[#d6e2d6] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80]">LinkedIn ↗</a>
              )}
            </div>
            <p className="mt-5 font-mono text-xs text-[#5b6b5b]">
              # to update LinkedIn / photo, edit src/data/portfolio.ts — search for TODO.
            </p>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="border-t border-[#1d2b1d]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 font-mono text-xs text-[#5b6b5b] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Muhammad Ali Waqas — AI Engineer · Lahore, Pakistan</p>
          <p>
            built with Next.js 16, React 19 &amp; Tailwind CSS ·{" "}
            <a className="text-[#4ade80]" href={PROFILE.github} target="_blank" rel="noopener noreferrer">github ↗</a>
            {view === "simple" ? " · Simple View" : " · $ exit"}
          </p>
        </div>
      </footer>
    </div>
  );
}
