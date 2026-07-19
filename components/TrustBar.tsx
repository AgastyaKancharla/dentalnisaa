"use client";

import { useRef } from "react";
import { trustPoints, clinic } from "@/lib/site-data";
import AnimatedCounter from "./AnimatedCounter";

// Renders "4.8" as ★★★★★-with-a-partial-star, built from clinic.rating —
// no invented rating graphic, just a visual read of the real number.
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold-light" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block w-4 h-4">
            <span className="absolute inset-0 text-porcelain/20">★</span>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Typographic mural: one dominant stat (the rating, largest, anchoring the
// whole composition) with the others placed around it at varying scale and
// baseline on an asymmetric grid, rather than four equal boxes. A subtle
// cursor-parallax on desktop is the "interaction" layer — each block drifts
// a few px opposite the mouse, at a magnitude tied to its own weight in the
// composition (the big rating barely moves; the small caption drifts more).
export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
  };

  const handleLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="bg-ink text-porcelain overflow-hidden"
    >
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 md:gap-y-8">
        {/* Dominant: the real Google rating, largest element in the mural */}
        <div
          data-parallax
          className="md:col-span-7 md:row-span-2"
          style={{
            transform:
              "translate(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -8px))",
            transition: "transform 0.25s ease-out",
          }}
        >
          <Stars rating={clinic.rating} />
          <p className="font-display leading-[0.9] text-[4.5rem] sm:text-[6rem] md:text-[8rem] mt-2">
            <AnimatedCounter value={clinic.rating} decimals={1} />
            <span className="text-gold-light">★</span>
          </p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-widest text-porcelain/40">
            {trustPoints[1].detail}
          </p>
        </div>

        {/* Years — smaller, upper right */}
        <div
          data-parallax
          className="md:col-start-8 md:col-span-5 md:row-start-1 self-end"
          style={{
            transform:
              "translate(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 12px))",
            transition: "transform 0.25s ease-out",
          }}
        >
          <p className="font-display text-3xl sm:text-4xl md:text-5xl">
            <AnimatedCounter value={clinic.yearsActive} suffix="+ years" />
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-porcelain/40">
            {trustPoints[0].detail}
          </p>
        </div>

        {/* Painless care — mid right, different baseline */}
        <div
          data-parallax
          className="md:col-start-8 md:col-span-5 md:row-start-2 self-end"
          style={{
            transform:
              "translate(calc(var(--mx, 0) * 22px), calc(var(--my, 0) * 16px))",
            transition: "transform 0.25s ease-out",
          }}
        >
          <p className="font-display text-2xl sm:text-3xl md:text-4xl italic text-gold-light">
            {trustPoints[2].label}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-porcelain/40 max-w-xs">
            {trustPoints[2].detail}
          </p>
        </div>

        {/* Multi-generational — full-width footer line, ties the mural down */}
        <div className="md:col-span-12 pt-6 border-t border-porcelain/10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-display text-xl md:text-2xl">{trustPoints[3].label}</p>
          <p className="text-xs uppercase tracking-wide text-porcelain/40">
            {trustPoints[3].detail}
          </p>
        </div>
      </div>
    </section>
  );
}
