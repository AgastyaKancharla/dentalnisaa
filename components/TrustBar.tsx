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

export default function TrustBar() {
  return (
    <section className="bg-ink text-porcelain">
      {/* Mobile: horizontal scroll-snap cards. Desktop: single fixed row. */}
      <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide px-5 md:px-10 lg:px-16 xl:px-24">
        {trustPoints.map((point, i) => (
          <div
            key={point.label}
            className={`snap-start shrink-0 w-[70%] sm:w-[45%] md:w-auto py-10 md:py-12 ${
              i % 2 === 0 ? "pr-6" : "pl-6"
            } ${i % 4 !== 3 ? "md:border-r" : ""} border-porcelain/10 ${
              i !== 0 ? "border-l md:border-l-0" : ""
            }`}
          >
            {i === 1 ? (
              <div className="flex items-center gap-2 mb-1">
                <Stars rating={clinic.rating} />
              </div>
            ) : null}
            <p className="font-display text-2xl md:text-[2.75rem] leading-none text-porcelain">
              {typeof point.value === "number" ? (
                <AnimatedCounter
                  value={point.value}
                  suffix={point.suffix}
                  decimals={point.value % 1 !== 0 ? 1 : 0}
                />
              ) : (
                point.label
              )}
            </p>
            <p className="mt-3 text-xs md:text-sm text-porcelain/45 leading-snug uppercase tracking-wide">
              {point.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
