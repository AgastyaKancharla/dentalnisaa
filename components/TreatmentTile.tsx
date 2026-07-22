"use client";

import Link from "next/link";
import type { Treatment } from "@/lib/site-data";
import Icon from "./Icon";
import { useInView } from "@/lib/useInView";

// This grid's animation signature: tiles flip in on alternating 3D axes
// (even tiles rotateX, odd tiles rotateY) like mosaic tiles being set into
// place -- distinct from the fade-up used on most other sections. Each
// tile has its own observer so this still works correctly on the full
// /treatments page (25 items), not just the homepage's first 10.
export default function TreatmentTile({
  treatment: t,
  dark,
  index,
}: {
  treatment: Treatment;
  dark: boolean;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>(0.2);
  const axis = index % 2 === 0 ? "rotateX" : "rotateY";

  return (
    <Link
      ref={ref}
      href={`/treatments/${t.id}`}
      className={`group relative flex flex-col justify-between h-full min-h-[170px] sm:min-h-[220px] p-4 sm:p-7 md:p-8 transition-colors duration-300 ${
        dark
          ? "bg-ink text-porcelain hover:bg-[#2a2521]"
          : "bg-porcelain text-ink hover:bg-white"
      }`}
      style={{
        perspective: "700px",
        transitionProperty: "opacity, transform, background-color",
        transitionDuration: `600ms, 600ms, 300ms`,
        transitionDelay: `${(index % 6) * 70}ms, ${(index % 6) * 70}ms, 0ms`,
        transitionTimingFunction: "ease-out",
        opacity: inView ? 1 : 0,
        transform: inView ? `${axis}(0deg)` : `${axis}(60deg)`,
        transformOrigin: axis === "rotateX" ? "top" : "left",
      }}
    >
      <div>
        <span
          className={`inline-flex w-9 h-9 sm:w-12 sm:h-12 rounded-full items-center justify-center border transition-colors duration-300 ${
            dark
              ? "border-porcelain/25 group-hover:bg-gold-light group-hover:border-gold-light"
              : "border-ink/15 group-hover:bg-gold group-hover:border-gold"
          }`}
        >
          <Icon
            name={t.icon}
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
              dark
                ? "text-gold-light group-hover:text-ink"
                : "text-teal-dark group-hover:text-ink"
            }`}
          />
        </span>
        <h3 className="font-display text-base sm:text-xl mt-3 sm:mt-5 mb-1.5 sm:mb-2">{t.name}</h3>
        <p
          className={`text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none ${
            dark ? "text-porcelain/55" : "text-ink/55"
          }`}
        >
          {t.tagline}
        </p>
      </div>

      <span
        className={`mt-4 sm:mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${
          dark ? "text-gold-light" : "text-gold-dark"
        }`}
      >
        Learn more <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
