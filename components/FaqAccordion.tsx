"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

// Numbered dossier with a side rail: a thin vertical line runs the full
// height of the list, and each marker fills solid gold once you've opened
// that question -- a visible sense of "working through the list" instead
// of a flat stack of identical cards. Scales the same way whether there
// are 3 questions (a treatment page) or 30 (the full FAQ page).
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    const next = openIndex === i ? null : i;
    setOpenIndex(next);
    if (next !== null) {
      setVisited((prev) => new Set(prev).add(next));
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute left-[15px] top-2 bottom-2 w-px bg-ink/10"
        aria-hidden
      />
      <div className="space-y-1">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const isVisited = visited.has(i);
          return (
            <div key={item.q} className="relative pl-11">
              <span
                className={`absolute left-0 top-4 w-[31px] h-[31px] rounded-full border flex items-center justify-center text-xs font-display transition-colors duration-300 ${
                  isVisited
                    ? "bg-gold border-gold text-ink"
                    : "bg-porcelain border-ink/15 text-ink/40"
                }`}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => toggle(i)}
                className="focus-ring w-full flex items-center justify-between gap-4 text-left py-4"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <span
                  className={`shrink-0 text-gold-dark text-xl leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                aria-hidden={!isOpen}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-ink/65 text-sm leading-relaxed max-w-xl">
                    {item.a}
                  </p>
                </div>
              </div>
              {i < items.length - 1 && <div className="border-b border-ink/10" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
