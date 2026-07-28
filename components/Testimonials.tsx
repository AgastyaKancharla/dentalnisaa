"use client";

import { useRef, useState } from "react";
import { testimonials, clinic } from "@/lib/site-data";
import SignatureMark from "./SignatureMark";
import SectionSeam from "./SectionSeam";
import { GoogleGIcon } from "./Icon";

const googleReviewsUrl =
  clinic.address.mapsUrl ||
  `https://www.google.com/search?q=${encodeURIComponent(
    clinic.name + " " + clinic.address.line2
  )}+reviews`;

// Google's actual review-star yellow, not a brand-palette gold -- this
// section leans into "these are real Google reviews" rather than
// inventing its own color language for it.
function GoogleStars() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4" fill="#FBBC05">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

// Small rotating set of tag treatments (border+background tint) so each
// card's treatment context reads as a distinct pill rather than plain
// gray caption text -- cycled by index, not tied to any taxonomy, so it
// never risks mis-categorizing what a patient actually came in for.
const tagStyles = [
  "bg-porcelain/15 border-porcelain/25",
  "bg-gold-light/20 border-gold-light/35",
  "bg-teal-dark/25 border-teal-dark/40",
];

export default function Testimonials() {
  const featured = testimonials.slice(0, 6);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.clientWidth ?? 1;
    const gap = 24; // matches gap-6 below
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    setActive(Math.max(0, Math.min(index, featured.length - 1)));
  };

  return (
    <section id="reviews" className="bg-gold-dark text-porcelain relative overflow-hidden">
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
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm font-semibold text-porcelain/60 hover:text-porcelain underline underline-offset-4"
          >
            See all reviews on Google →
          </a>
        </div>

        {featured.length > 0 ? (
          <>
            <SignatureMark
              className="w-16 h-16 text-porcelain/20 mb-2 hidden md:block"
              strokeOpacity={0.4}
            />

            {/* Swipeable card carousel -- native touch/trackpad scroll,
                snap-aligned, instead of the old quote-plus-name-list split
                that didn't translate to a mobile scroll. */}
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
            >
              {featured.map((t, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[38%] border border-porcelain/10 bg-porcelain/[0.04] p-7 md:p-8 flex flex-col"
                >
                  <span
                    className={`self-start text-xs font-semibold px-3 py-1 border ${tagStyles[i % tagStyles.length]}`}
                  >
                    {t.context}
                  </span>
                  <GoogleStars />
                  <blockquote className="mt-4 font-display text-xl md:text-2xl leading-[1.35] flex-1">
                    "{t.quote}"
                  </blockquote>
                  <p className="mt-6 font-semibold">{t.author}</p>
                </div>
              ))}
            </div>

            {/* Dot indicators -- tap to jump to a card */}
            <div className="flex items-center gap-2 mt-8">
              {featured.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Show review ${i + 1}`}
                  className={`focus-ring h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-gold-light" : "w-1.5 bg-porcelain/25 hover:bg-porcelain/40"
                  }`}
                />
              ))}
            </div>
          </>
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
      <SectionSeam tone="dark" />
    </section>
  );
}
