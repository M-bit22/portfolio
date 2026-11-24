"use client";

import { useEffect, useRef, useState } from "react";
import { RAG_SAMPLES, RAG_STEPS } from "@/data/portfolio";

/**
 * RAG playground — an animated walkthrough of how the RAG apps work.
 * NOT a live RAG system: nothing is retrieved or generated in the
 * browser. Document titles are illustrative examples; only relative
 * ranking (1st, 2nd, 3rd match) is shown, never invented scores.
 * Real facts used: CryptoInsight 827+ articles, 3,072-dim Gemini
 * embeddings, MongoDB Atlas Vector Search, cosine similarity;
 * University Policy Q&A page-level citations.
 */
export default function RagPlayground({ variant }: { variant: "terminal" | "simple" }) {
  const [sampleId, setSampleId] = useState(RAG_SAMPLES[0].id);
  const [step, setStep] = useState(0); // 0 = not started, 1..5 = steps shown
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);

  const sample = RAG_SAMPLES.find((s) => s.id === sampleId) ?? RAG_SAMPLES[0];
  const isTerminal = variant === "terminal";

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function play() {
    clearTimers();
    setPlaying(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(RAG_STEPS.length);
      setPlaying(false);
      return;
    }
    setStep(0);
    RAG_STEPS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setStep(i + 1), 700 * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => setPlaying(false), 700 * (RAG_STEPS.length + 1)));
  }

  function pick(id: string) {
    clearTimers();
    setSampleId(id);
    setStep(0);
    setPlaying(false);
  }

  return (
    <div className="rounded-xl border border-[#1d2b1d] bg-[#080d08] p-5 sm:p-6">
      <p className={isTerminal ? "font-mono text-xs text-[#4ade80]" : "text-sm font-semibold text-[#4ade80]"}>
        {isTerminal ? "$ ./how-rag-works --demo" : "See how it works: RAG, step by step"}
      </p>
      <h3 className="mt-2 text-xl font-bold text-[#f2f7f2]">How my RAG apps answer a question</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9fb49f]">
        Pick a question, press play, and watch the five steps. Demo walkthrough — not a live RAG
        system running in your browser.
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Sample question">
        {RAG_SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => pick(s.id)}
            aria-pressed={sampleId === s.id}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-[#4ade80] ${
              sampleId === s.id
                ? "bg-[#4ade80] text-[#04140a]"
                : "border border-[#1d2b1d] bg-[#0d130d] text-[#9fb49f] hover:text-[#4ade80]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-4 rounded-lg border border-[#1d2b1d] bg-[#0a0f0a] px-4 py-3 text-base leading-relaxed text-[#e8f5e8]">
        &ldquo;{sample.question}&rdquo;
        <span className="mt-1 block text-xs text-[#8a9a8a]">{sample.project}</span>
      </p>

      <button
        type="button"
        onClick={play}
        disabled={playing}
        className="mt-4 rounded-md bg-[#4ade80] px-5 py-2.5 text-sm font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80] disabled:opacity-50"
      >
        {playing ? "Playing…" : step === 0 ? "▶ Play the 5 steps" : "↻ Play again"}
      </button>

      <ol className="mt-5 space-y-3">
        {RAG_STEPS.map((s, i) => {
          const active = step > i;
          const isCurrent = step === i + 1;
          return (
            <li
              key={s.title}
              className={`rounded-lg border px-4 py-3 transition ${
                active
                  ? "border-[#4ade80]/50 bg-[#0a0f0a]"
                  : "border-[#1d2b1d] bg-[#080d08] opacity-45"
              }`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <p className="text-sm font-bold text-[#f2f7f2]">
                {active ? "✓ " : `${i + 1}. `}
                {s.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#9fb49f]">{s.plain}</p>
              {active && <p className="mt-1 text-xs leading-relaxed text-[#8a9a8a]">{s.detail}</p>}
              {active && i === 1 && (
                <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-[#67e8f9]">
                  vector [0.12, -0.45, 0.78, … 3,072 numbers]
                </p>
              )}
              {active && i === 3 && (
                <ul className="mt-2 space-y-1">
                  {sample.matches.map((m) => (
                    <li key={m.title} className="flex flex-wrap gap-2 font-mono text-xs text-[#c4d4c4]">
                      <span className="font-bold text-[#4ade80]">{m.rank}</span>
                      <span>{m.title}</span>
                      <span className="text-[#8a9a8a]">— {m.note}</span>
                    </li>
                  ))}
                </ul>
              )}
              {active && i === 4 && (
                <p className="mt-2 rounded-md border border-[#1d2b1d] bg-[#0a0f0a] px-3 py-2 text-sm leading-relaxed text-[#c4d4c4]">
                  {sample.answer}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-[#8a9a8a]">
        That is how CryptoInsight and University Policy Q&A work in real life — the same five
        steps, over real documents. This page just shows the steps; it does not run the real
        retrieval or the real model.
      </p>
    </div>
  );
}
