"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Treatment } from "@/lib/site-data";
import Icon from "./Icon";
import TreatmentMedia from "./TreatmentMedia";

const VISIBLE_SIDE = 2; // cards shown on each side of the active one (5 total on screen)
const ANGLE_STEP = 26; // degrees between adjacent cards around the arc
const RADIUS_X = 260; // horizontal spread, px
const RADIUS_Y = 64; // how much the arc curves upward at its ends, px

export default function TreatmentDeck({ treatments }: { treatments: Treatment[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = treatments.length;

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + count) % count);
  };
  const goTo = (index: number) => setActive(index);

  // Shortest signed distance around the loop, e.g. with 10 cards, index 9
  // relative to active 0 is -1 (one step back), not +9.
  const signedOffset = (i: number) => {
    let o = i - active;
    if (o > count / 2) o -= count;
    if (o < -count / 2) o += count;
    return o;
  };

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
        className="focus-ring relative h-[500px] sm:h-[460px] select-none"
      >
        {treatments.map((t, i) => {
          const offset = signedOffset(i);
          if (Math.abs(offset) > VISIBLE_SIDE) return null;
          const isFront = offset === 0;

          const angleDeg = offset * ANGLE_STEP;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = RADIUS_X * Math.sin(angleRad);
          const y = -RADIUS_Y * (1 - Math.cos(angleRad)); // curves upward away from center
          const rotate = angleDeg * 0.55;
          const dist = Math.abs(offset);
          const scale = 1 - dist * 0.14;
          const opacity = 1 - dist * 0.32;

          const style: React.CSSProperties = {
            transform: `translate(-50%, 0) translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
            zIndex: 10 - dist,
            opacity,
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
