"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Treatment } from "@/lib/site-data";
import Icon from "./Icon";
import TreatmentMedia from "./TreatmentMedia";

const DEPTH = 4; // how many cards are visible in the stack (front + 3 peeking)

export default function TreatmentDeck({ treatments }: { treatments: Treatment[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = treatments.length;

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + count) % count);
  };
  const goTo = (index: number) => setActive(index);

  const onTouchStart: React.TouchEventHandler = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured treatments"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="focus-ring relative h-[460px] sm:h-[420px] select-none"
      >
        {treatments.map((t, i) => {
          const rank = (i - active + count) % count;
          if (rank >= DEPTH) return null;
          const isFront = rank === 0;

          const style: React.CSSProperties = {
            transform: `translate(-50%, 0) translateX(${rank * 26}px) translateY(${rank * 14}px) scale(${
              1 - rank * 0.06
            })`,
            zIndex: DEPTH - rank,
            opacity: 1 - rank * 0.22,
          };

          return (
            <article
              key={t.id}
              aria-hidden={!isFront}
              style={style}
              className="absolute left-1/2 top-0 w-[280px] sm:w-[320px] transition-[transform,opacity] duration-500 ease-out"
            >
              {isFront ? (
                <div className="rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-15px_rgba(33,30,26,0.25)] overflow-hidden">
                  <TreatmentMedia treatment={t} variant="card" className="rounded-t-2xl" />
                  <div className="p-6">
                    <p className="text-[11px] font-semibold text-teal-dark uppercase tracking-wide mb-2">
                      {t.category}
                    </p>
                    <h3 className="font-display text-xl text-ink leading-snug">{t.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed">{t.tagline}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Link
                        href={`/treatments/${t.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold-dark transition-colors"
                      >
                        Learn more <span aria-hidden>→</span>
                      </Link>
                      <Link
                        href={`/booking?treatment=${t.id}`}
                        className="focus-ring shrink-0 inline-flex items-center rounded-full bg-ink text-porcelain px-4 py-2 text-xs font-semibold hover:bg-teal-dark transition-colors"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${t.name}`}
                  className="focus-ring block w-full rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-15px_rgba(33,30,26,0.25)] overflow-hidden text-left"
                >
                  <TreatmentMedia treatment={t} variant="card" className="rounded-t-2xl" />
                  <div className="p-6">
                    <p className="text-[11px] font-semibold text-teal-dark uppercase tracking-wide mb-2">
                      {t.category}
                    </p>
                    <h3 className="font-display text-xl text-ink leading-snug">{t.name}</h3>
                  </div>
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous treatment"
          className="focus-ring flex items-center justify-center w-11 h-11 rounded-full border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/5 transition-colors"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
        </button>
        <p className="text-sm text-ink/50 tabular-nums w-16 text-center">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next treatment"
          className="focus-ring flex items-center justify-center w-11 h-11 rounded-full border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/5 transition-colors"
        >
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
