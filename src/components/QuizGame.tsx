"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/data/portfolio";

/**
 * Real or Fake? — a sample quiz, NOT the live TruthLens model.
 * Only the first two headlines are based on samples the real model
 * scored in the live demo (2026-11-22); the rest are clearly-labelled
 * sample headlines with a known label. No per-headline model score
 * is ever shown. TruthLens's real result (98.7% on 7,765 articles)
 * is a separate stat on the page.
 */
export default function QuizGame({ variant }: { variant: "terminal" | "simple" }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<"real" | "fake" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[index];
  const isTerminal = variant === "terminal";

  function guess(choice: "real" | "fake") {
    if (picked) return;
    setPicked(choice);
    if (choice === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  const verdict =
    score === total
      ? "Perfect score — you spot fake news like TruthLens does."
      : score >= 3
        ? "Nice — you caught most of them. TruthLens scored 98.7% on 7,765 real articles."
        : "Tough round — fake news is designed to fool us. That's why TruthLens exists.";

  return (
    <div className="rounded-xl border border-[#1d2b1d] bg-[#080d08] p-5 sm:p-6">
      <p className={isTerminal ? "font-mono text-xs text-[#4ade80]" : "text-sm font-semibold text-[#4ade80]"}>
        {isTerminal ? "$ ./real-or-fake --play" : "Play: Real or Fake?"}
      </p>
      <h3 className="mt-2 text-xl font-bold text-[#f2f7f2]">Real or Fake?</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9fb49f]">
        Guess whether each headline is real or fake. Sample quiz — try it, not the live model.
        TruthLens itself scored 98.7% on 7,765 unseen articles.
      </p>

      {finished ? (
        <div className="mt-5">
          <p className="text-2xl font-bold text-[#4ade80]">
            You scored {score} out of {total}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#c4d4c4]">{verdict}</p>
          <button
            type="button"
            onClick={restart}
            className="mt-5 rounded-md bg-[#4ade80] px-5 py-2.5 text-sm font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
          >
            Play again
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-xs text-[#8a9a8a]">
            Question {index + 1} of {total} · Score so far: {score}
          </p>
          <p className="mt-3 rounded-lg border border-[#1d2b1d] bg-[#0a0f0a] px-4 py-4 text-base font-semibold leading-relaxed text-[#f2f7f2]">
            &ldquo;{q.headline}&rdquo;
          </p>
          {!picked ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => guess("real")}
                className="rounded-md bg-[#4ade80] px-6 py-2.5 text-sm font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
              >
                Real
              </button>
              <button
                type="button"
                onClick={() => guess("fake")}
                className="rounded-md border border-[#f87171]/50 bg-[#0d130d] px-6 py-2.5 text-sm font-semibold text-[#fca5a5] transition hover:-translate-y-0.5 hover:border-[#f87171] focus-visible:outline-2 focus-visible:outline-[#f87171]"
              >
                Fake
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <p
                className={`text-lg font-bold ${
                  picked === q.answer ? "text-[#4ade80]" : "text-[#f87171]"
                }`}
              >
                {picked === q.answer ? "✓ Correct!" : "✗ Not quite —"} this one is {q.answer}.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb49f]">{q.explanation}</p>
              <p className="mt-2 text-xs text-[#8a9a8a]">
                {q.source === "verified-demo"
                  ? "Tested by the real TruthLens model in the live demo."
                  : "Sample headline — not scored by the live model."}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 rounded-md bg-[#4ade80] px-5 py-2.5 text-sm font-semibold text-[#04140a] transition hover:-translate-y-0.5 hover:bg-[#86efac] focus-visible:outline-2 focus-visible:outline-[#4ade80]"
              >
                {index + 1 >= total ? "See my score" : "Next headline"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
