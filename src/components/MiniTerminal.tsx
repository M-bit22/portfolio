"use client";

import { useRef, useState } from "react";
import { PROFILE, PROJECTS, SKILLS } from "@/data/portfolio";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const HELP_LINES = [
  "available commands:",
  "  whoami       — who is Muhammad Ali Waqas",
  "  ls           — list the folders in ~/",
  "  projects     — list shipped projects",
  "  cat <name>   — open a project (cryptoinsight, policy, finwise, truthlens, support, travel, tracker)",
  "  skills       — list tools, grouped",
  "  contact      — email, GitHub, location",
  "  help         — this list",
  "  clear        — clear the terminal",
  "fun ones — try: sudo hire-me, coffee, joke, matrix, neofetch",
];

function projectByToken(token: string) {
  const t = token.toLowerCase();
  if (t.startsWith("crypto")) return PROJECTS[0];
  if (t.startsWith("polic") || t.startsWith("uni")) return PROJECTS[1];
  if (t.startsWith("finwise") || t.startsWith("fin")) return PROJECTS[2];
  if (t.startsWith("truth")) return PROJECTS[3];
  if (t.startsWith("support") || t.startsWith("pearl")) return PROJECTS[4];
  if (t.startsWith("travel") || t.startsWith("gemini")) return PROJECTS[5];
  if (t.startsWith("track") || t.startsWith("job")) return PROJECTS[6];
  return PROJECTS.find((p) => p.name.toLowerCase().includes(t));
}

export default function MiniTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "muhammad@portfolio — type `help` to see what you can ask." },
    { kind: "out", text: "everything here is real: no invented jobs, no fake numbers." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const next: Line[] = [...lines, { kind: "cmd" as const, text: `muhammad@portfolio:~$ ${cmd}` }];
    const [verb, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const lower = verb.toLowerCase();

    const push = (text: string, kind: "out" | "err" = "out") =>
      next.push({ kind, text });

    if (lower === "help") {
      HELP_LINES.forEach((l) => push(l));
    } else if (lower === "whoami") {
      push(`${PROFILE.name} — ${PROFILE.title}`);
      push(`based in ${PROFILE.location} · builds RAG and LLM apps that answer from real documents`);
      push(`instructor: ${PROFILE.instructor}`);
    } else if (lower === "ls") {
      push("about.md  projects/  skills/  journey/  contact.md");
    } else if (lower === "projects") {
      PROJECTS.forEach((p) => push(`- ${p.name} — ${p.category}`));
      push("tip: cat cryptoinsight  (or policy / finwise / truthlens)");
    } else if (lower === "cat") {
      const p = arg ? projectByToken(arg) : undefined;
      if (!p) {
        push(`cat: ${arg || "(no file)"}: no such project — try cryptoinsight, policy, finwise, or truthlens`, "err");
      } else {
        push(`$ cat projects/${p.name.toLowerCase().replace(/\s+/g, "-")}.md`);
        push(p.description);
        p.results.forEach((r) => push(`  • ${r}`));
        push(`  stack: ${p.stack.join(", ")}`);
        if (p.live) push(`  live: ${p.live}`);
        if (p.github) push(`  code: ${p.github}`);
      }
    } else if (lower === "skills") {
      SKILLS.forEach((g) => push(`${g.group}: ${g.items.join(", ")}`));
    } else if (lower === "contact") {
      push(`email: ${PROFILE.email}`);
      push(`github: ${PROFILE.github}`);
      push(`location: ${PROFILE.location}`);
      push(PROFILE.linkedinIsPlaceholder ? "linkedin: link coming soon" : `linkedin: ${PROFILE.linkedin}`);
    } else if (lower === "clear") {
      setLines([]);
      setValue("");
      return;
    } else if (lower === "sudo" && arg === "hire-me") {
      push("Password: ********");
      push("Permission granted. Excellent decision.");
      push(`Email ${PROFILE.email} — subject: "You're hired".`);
      push("Muhammad is available for an AI Engineer internship / junior role.");
    } else if (lower === "coffee") {
      push("Brewing coffee… ☕");
      push("Coffee ready. All bugs are now features. (Kidding — the code is tested.)");
    } else if (lower === "joke") {
      push("Why do programmers prefer dark mode?");
      push("Because light attracts bugs.");
    } else if (lower === "matrix") {
      push("Wake up, Neo… the Matrix has you.");
      push("…or just this portfolio. Follow the green rabbit — try `sudo hire-me`.");
    } else if (lower === "neofetch") {
      push("muhammad@portfolio");
      push("─────────────────");
      push("OS: Next.js 16 · React 19");
      push("Shell: zsh (this page)");
      push("Role: AI Engineer");
      push("Focus: RAG · LLM backends · voice AI");
      push("Location: Lahore, Pakistan");
      push("Uptime: shipping since the first project");
    } else if (lower === "rm" && arg.startsWith("-rf")) {
      push("Nice try. This portfolio is backed up on GitHub — and so is Muhammad's work ethic.", "err");
    } else if (lower === "open" && arg) {
      const p = projectByToken(arg);
      if (p?.live) {
        window.open(p.live, "_blank", "noopener,noreferrer");
        push(`opening ${p.live} …`);
      } else if (p?.github) {
        window.open(p.github, "_blank", "noopener,noreferrer");
        push(`opening ${p.github} …`);
      } else {
        push(`open: no live link for "${arg}"`, "err");
      }
    } else {
      push(`command not found: ${lower} — try \`help\``, "err");
    }

    // Keep the transcript short so the page stays fast.
    setLines(next.slice(-60));
    setValue("");
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-[#1d2b1d] bg-[#080d08] text-left shadow-[0_0_0_1px_rgba(74,222,128,0.05),0_18px_50px_rgba(0,0,0,0.45)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-[#1d2b1d] bg-[#0a0f0a] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-[#8a9a8a]">muhammad@portfolio: ~/terminal</span>
        <span className="ml-auto hidden font-mono text-[11px] text-[#4ade80] sm:inline">zsh — try `help`</span>
      </div>

      <div className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed" aria-live="polite">
        {lines.map((line, i) => (
          <p
            key={`${i}-${line.text}`}
            className={
              line.kind === "cmd"
                ? "text-[#e8f5e8]"
                : line.kind === "err"
                  ? "text-[#f87171]"
                  : "whitespace-pre-wrap text-[#9fb49f]"
            }
          >
            {line.kind === "cmd" ? line.text : line.text}
          </p>
        ))}
        <form
          className="flex items-center gap-2 pt-1"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
        >
          <label htmlFor="mini-terminal-input" className="shrink-0 text-[#4ade80]">
            muhammad@portfolio:~$
          </label>
          <input
            id="mini-terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="type a command…"
            className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-[#e8f5e8] outline-none placeholder:text-[#5b6b5b]"
          />
          <span className="cursor-blink inline-block h-4 w-2 bg-[#4ade80]" aria-hidden="true" />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-[#1d2b1d] px-4 py-3">
        {["help", "whoami", "projects", "skills", "contact", "coffee", "sudo hire-me"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-md border border-[#1d2b1d] bg-[#0d130d] px-2.5 py-1 font-mono text-xs text-[#9fb49f] transition hover:-translate-y-0.5 hover:border-[#4ade80]/50 hover:text-[#4ade80] focus-visible:outline-2 focus-visible:outline-[#4ade80] active:translate-y-0"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
