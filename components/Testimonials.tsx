"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  testimonials,
  practoTestimonials,
  justdialTestimonials,
  reviewPlatforms,
  clinic,
} from "@/lib/site-data";
import SignatureMark from "./SignatureMark";
import Reveal, { RevealGroup } from "./Reveal";
import SectionSeam from "./SectionSeam";

type Quote = { quote: string; context: string; author: string };

const platformData: Record<string, Quote[]> = {
  Google: testimonials,
  Practo: practoTestimonials,
  Justdial: justdialTestimonials,
};

// Every review across all three listings — the same figure the Hero leads
// with, computed from the same source so the two can never drift apart.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i < Math.round(rating) ? "#FBBC05" : "none"}
          stroke="#FBBC05"
          strokeWidth={i < Math.round(rating) ? 0 : 1}
        >
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

// Punchier tag pills than the previous low-opacity-tint version -- solid
// fill so they actually read as distinct tags against the dark card,
// alternating between the two lightest tones in the palette.
const tagStyles = ["bg-porcelain text-ink", "bg-gold-light text-ink"];

export default function Testimonials() {
  const [platform, setPlatform] = useState<"Google" | "Practo" | "Justdial">("Google");
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const activePlatform = reviewPlatforms.find((p) => p.name === platform)!;
  const quotes = platformData[platform];

  const switchPlatform = (name: "Google" | "Practo" | "Justdial") => {
    setPlatform(name);
    setActive(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || quotes.length === 0) return;
    const cardWidth = track.children[0]?.clientWidth ?? 1;
    const gap = 24;
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    setActive(Math.max(0, Math.min(index, quotes.length - 1)));
  };

  return (
    <section id="reviews" className="bg-gold-dark text-porcelain relative overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <RevealGroup className="max-w-xl">
            <Reveal>
              <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
                What families say
              </p>
            </Reveal>
            {/* Leads with the figure that spans every platform. Headlining
                whichever tab happened to be selected meant this section
                opened with Google's 195 while the Hero two screens above
                had already said 1,131 — the page appeared to lose 900
                reviews as you scrolled. Each platform's own real rating
                still sits on its switcher button below; nothing here
                blends them into an average the clinic couldn't point at
                on a real listing. */}
            <Reveal>
              <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight">
                {totalReviews.toLocaleString("en-IN")} patient reviews.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-3 text-porcelain/70 leading-relaxed">
                Verified on Google, Practo and Justdial — all of them, not
                just the ones we'd have picked.
              </p>
            </Reveal>
          </RevealGroup>
          <div className="flex flex-col items-end gap-2">
            <Link
              href="/reviews"
              className="focus-ring text-sm font-semibold text-gold-light hover:text-porcelain underline underline-offset-4"
            >
              See all platforms & reviews →
            </Link>
            <a
              href={activePlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-sm font-semibold text-porcelain/60 hover:text-porcelain underline underline-offset-4"
            >
              See all reviews on {platform} →
            </a>
          </div>
        </div>

        {/* Platform switcher */}
        <div className="flex flex-wrap gap-2 mb-12">
          {reviewPlatforms.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => switchPlatform(p.name as "Google" | "Practo" | "Justdial")}
              className={`focus-ring px-4 py-2 text-sm font-semibold border transition-colors ${
                platform === p.name
                  ? "bg-porcelain text-ink border-porcelain"
                  : "border-porcelain/25 text-porcelain/70 hover:border-porcelain/50 hover:text-porcelain"
              }`}
            >
              {p.name} · {p.rating.toFixed(1)}★ ({p.count}+)
            </button>
          ))}
        </div>

        {quotes.length > 0 ? (
          <>
            <SignatureMark
              className="w-16 h-16 text-porcelain/20 mb-2 hidden md:block"
              strokeOpacity={0.4}
            />

            {/* Revealed as one unit rather than card-by-card: the cards
                past the first live inside a horizontal scroller, so they
                may never intersect the viewport and would sit at zero
                opacity until swiped to. */}
            <Reveal>
              <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
              >
              {quotes.map((t, i) => (
                <div
                  key={`${platform}-${i}`}
                  className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[38%] border border-porcelain/15 bg-porcelain/[0.06] p-7 md:p-8 flex flex-col"
                >
                  <span
                    className={`self-start text-xs font-semibold px-3 py-1 ${tagStyles[i % tagStyles.length]}`}
                  >
                    {t.context}
                  </span>
                  <div className="mt-4">
                    <StarRow rating={activePlatform.rating} />
                  </div>
                  <blockquote className="mt-4 font-display text-xl md:text-2xl leading-[1.35] flex-1">
                    "{t.quote}"
                  </blockquote>
                  <p className="mt-6 font-semibold">{t.author}</p>
                </div>
              ))}
              </div>
            </Reveal>

            <div className="flex items-center gap-2 mt-8">
              {quotes.map((_, i) => (
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
          <div className="border border-porcelain/15 bg-porcelain/[0.06] p-8 text-center">
            <StarRow rating={activePlatform.rating} />
            <p className="mt-4 text-porcelain/70">
              {activePlatform.rating.toFixed(1)}★ from {activePlatform.count}+ reviews on{" "}
              {platform} — individual quotes coming soon.
            </p>
            <a
              href={activePlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center mt-4 rounded-full bg-porcelain text-ink px-6 py-3 text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Read reviews on {platform}
            </a>
          </div>
        )}
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
