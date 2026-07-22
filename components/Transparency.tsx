"use client";

import { useEffect, useState } from "react";
import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";
import { useInView } from "@/lib/useInView";

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

const HEADLINE = "Clear advice.\nCalmer visits.";

// This section's animation signature: the headline types itself out
// character by character once in view, then the panels rise up from
// below in sequence -- distinct from the fade-up used elsewhere and from
// the line-draw used in Appointment Process.
function TypedHeadline({ start }: { start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (count >= HEADLINE.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 28);
    return () => clearTimeout(id);
  }, [start, count]);

  const shown = HEADLINE.slice(0, count);
  const [line1, line2 = ""] = shown.split("\n");

  return (
    <h2 className="font-display text-4xl md:text-5xl leading-[1.05] min-h-[2.2em]">
      {line1}
      <br />
      {line2}
      <span
        className="inline-block w-[3px] h-[0.9em] bg-gold-light ml-1 align-middle animate-pulse"
        style={{ visibility: count >= HEADLINE.length ? "hidden" : "visible" }}
        aria-hidden
      />
    </h2>
  );
}

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="bg-ink text-porcelain relative">
      {topDivider && <SectionSeam tone="dark" />}
      <div
        ref={ref}
        className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10"
      >
        <div className="relative">
          <SignatureMark className="w-20 h-20 text-gold-dark absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Our care philosophy
          </p>
          <TypedHeadline start={inView} />
          <p className="mt-6 text-porcelain/60 leading-relaxed max-w-sm">
            Dental care feels easier when you understand the plan, the reason,
            and the next step before treatment begins.
          </p>
        </div>

        {/* Expand-on-hover/tap panels: collapsed tiles show only a vertical
            label; the active one expands to reveal its detail text. Exactly
            one panel is open at a time, like a set of tabs rendered as
            physical panels rather than a plain numbered list. Panels also
            rise up from below on scroll-in, staggered by index. */}
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
                className={`focus-ring group text-left border border-porcelain/10 overflow-hidden ${
                  isActive
                    ? "md:flex-[3] bg-white/[0.04]"
                    : "md:flex-[1] bg-transparent hover:bg-white/[0.03]"
                }`}
                style={{
                  // opacity/transform (the entrance) get the staggered delay;
                  // flex/background (the hover-expand interaction) always
                  // respond instantly, so switching tabs never feels laggy
                  // just because it happens after the intro.
                  transitionProperty: "opacity, transform, flex, background-color",
                  transitionDuration: "700ms, 700ms, 500ms, 500ms",
                  transitionTimingFunction: "ease-out, ease-out, ease-out, ease-out",
                  transitionDelay: `${300 + i * 150}ms, ${300 + i * 150}ms, 0ms, 0ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(28px)",
                }}
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
