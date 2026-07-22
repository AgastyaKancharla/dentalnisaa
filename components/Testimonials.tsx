"use client";

import { useState } from "react";
import Link from "next/link";
import { testimonials, clinic } from "@/lib/site-data";
import SignatureMark from "./SignatureMark";
import { GoogleGIcon } from "./Icon";
import { useInView } from "@/lib/useInView";
import MultiPlatformReviews from "./MultiPlatformReviews";

const googleReviewsUrl =
  clinic.address.mapsUrl ||
  `https://www.google.com/search?q=${encodeURIComponent(
    clinic.name + " " + clinic.address.line2
  )}+reviews`;

// This section's animation signature: stars twinkle in one by one (each
// pops past full size then settles), and the quote fades in only once
// they've finished -- distinct from every other section's entrance.
function GoogleStars({ start }: { start: boolean }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill="#FBBC05"
          style={{
            opacity: start ? 1 : 0,
            transform: start ? "scale(1)" : "scale(0)",
            transition: "transform 450ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease-out",
            transitionDelay: `${i * 120}ms`,
          }}
        >
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const featured = testimonials.slice(0, 6);
  const [active, setActive] = useState(0);
  const current = featured[active];
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="reviews" className="bg-ink text-porcelain relative overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
              What families say
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight flex items-center gap-3 flex-wrap">
              <GoogleGIcon className="w-8 h-8 md:w-9 md:h-9" />
              {clinic.rating}★ from {clinic.reviewCount}+ patients.
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              href="/reviews"
              className="focus-ring text-sm font-semibold text-gold-light hover:text-porcelain underline underline-offset-4"
            >
              See all platforms & reviews →
            </Link>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-sm font-semibold text-porcelain/60 hover:text-porcelain underline underline-offset-4"
            >
            See all reviews on Google →
            </a>
          </div>
        </div>

        <MultiPlatformReviews />

        {current ? (
          <div ref={ref} className="grid md:grid-cols-[1.4fr_0.6fr] gap-14 md:gap-16 items-start">
            <div className="relative">
              <SignatureMark
                className="w-16 h-16 text-porcelain absolute -top-8 -left-3 hidden md:block"
                strokeOpacity={0.15}
              />
              <GoogleStars start={inView} />
              <blockquote
                className="mt-4 font-display text-2xl md:text-[2rem] leading-[1.3]"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: "opacity 600ms ease-out",
                  transitionDelay: "750ms",
                }}
              >
                "{current.quote}"
              </blockquote>
              <p
                className="mt-7 font-semibold"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: "opacity 600ms ease-out",
                  transitionDelay: "900ms",
                }}
              >
                {current.author}
              </p>
              <p
                className="text-sm text-porcelain/45"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: "opacity 600ms ease-out",
                  transitionDelay: "950ms",
                }}
              >
                {current.context}
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-porcelain/10 pt-6 md:pt-0 md:pl-8">
              <p className="text-xs font-semibold text-porcelain/40 uppercase tracking-wide mb-4">
                More reviews
              </p>
              <div className="space-y-1">
                {featured.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`focus-ring block w-full text-left px-3 py-2.5 text-sm transition-colors ${
                      i === active
                        ? "bg-gold-light text-ink font-semibold"
                        : "text-porcelain/60 hover:text-porcelain hover:bg-porcelain/5"
                    }`}
                  >
                    {t.author}
                    <span className="block text-xs opacity-70 font-normal">{t.context}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-porcelain/10 bg-porcelain/[0.03] p-8 text-center">
            <p className="text-porcelain/70">
              Read {clinic.reviewCount}+ real reviews from our patients on
              Google.
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center mt-4 rounded-full bg-gold-light text-ink px-6 py-3 text-sm font-semibold hover:bg-porcelain transition-colors"
            >
              See our Google reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
