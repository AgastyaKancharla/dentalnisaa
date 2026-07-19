"use client";

import { useState } from "react";
import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";

const points = [
  {
    title: "Clear diagnosis",
    detail:
      "We explain what we see, what can wait, and what should be treated now, so every appointment starts with clarity.",
  },
  {
    title: "Comfort-first care",
    detail:
      "Gentle techniques, unhurried conversations, and practical aftercare help nervous patients and children feel more at ease.",
  },
  {
    title: "Long-term planning",
    detail:
      "From routine check-ups to implants, braces, and full-mouth rehabilitation, we plan around lasting oral health.",
  },
];

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ink text-porcelain relative">
      {topDivider && <SectionSeam tone="dark" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10">
        <div className="relative">
          <SignatureMark className="w-20 h-20 text-gold-dark absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Our care philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Clear advice.
            <br />
            Calmer visits.
          </h2>
          <p className="mt-6 text-porcelain/60 leading-relaxed max-w-sm">
            Dental care feels easier when you understand the plan, the reason,
            and the next step before treatment begins.
          </p>
        </div>

        {/* Expand-on-hover/tap panels: collapsed tiles show only a vertical
            label; the active one expands to reveal its detail text. Exactly
            one panel is open at a time, like a set of tabs rendered as
            physical panels rather than a plain numbered list. */}
        <div
          role="tablist"
          aria-label="Our care philosophy"
          className="flex flex-col md:flex-row gap-2 md:gap-1 md:h-[340px]"
        >
          {points.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.title}
                type="button"
                id={`philosophy-tab-${i}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`philosophy-panel-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`focus-ring group text-left border border-porcelain/10 transition-all duration-500 ease-out overflow-hidden ${
                  isActive
                    ? "md:flex-[3] bg-white/[0.04]"
                    : "md:flex-[1] bg-transparent hover:bg-white/[0.03]"
                }`}
              >
                <div className="h-full flex md:flex-col p-6 md:p-7 gap-4">
                  {/* Collapsed state: number + vertical label (desktop only) */}
                  <div
                    className={`flex md:flex-col items-center md:items-start gap-3 shrink-0 transition-opacity duration-300 ${
                      isActive ? "md:opacity-40" : "opacity-100"
                    }`}
                  >
                    <span className="font-display text-lg text-gold-light/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display text-lg md:text-xl whitespace-nowrap ${
                        !isActive ? "md:[writing-mode:vertical-rl] md:rotate-180" : ""
                      }`}
                    >
                      {p.title}
                    </h3>
                  </div>

                  {/* Detail — only meaningfully visible when active */}
                  <div
                    id={`philosophy-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`philosophy-tab-${i}`}
                    className={`transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100 delay-150"
                        : "opacity-0 hidden md:block md:pointer-events-none"
                    }`}
                  >
                    <p className="text-porcelain/60 leading-relaxed text-sm max-w-xs mt-1 md:mt-8">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
