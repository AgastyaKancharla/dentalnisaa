"use client";

import { useRef, useState } from "react";
import {
  testimonials,
  practoTestimonials,
  justdialTestimonials,
  reviewPlatforms,
} from "@/lib/site-data";
import Breadcrumb from "@/components/Breadcrumb";
import FinalCTA from "@/components/FinalCTA";
import { GoogleGIcon } from "@/components/Icon";

type Quote = { quote: string; context: string; author: string };

const platformData: Record<string, Quote[]> = {
  Google: testimonials,
  Practo: practoTestimonials,
  Justdial: justdialTestimonials,
};

const tagStyles = ["bg-porcelain text-ink", "bg-gold-light text-ink"];

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

export default function ReviewsPageContent() {
  const [platform, setPlatform] = useState<"Google" | "Practo" | "Justdial">("Google");
  const gridRef = useRef<HTMLDivElement>(null);

  const activePlatform = reviewPlatforms.find((p) => p.name === platform)!;
  const quotes = platformData[platform];
  const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);

  return (
    <>
      <section className="bg-gold-dark text-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-8 pb-16 md:pt-10 md:pb-20">
          <div className="text-porcelain/50">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Patient Reviews" }]} />
          </div>
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mt-6 mb-3">
            Patient reviews
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight flex items-center gap-3 flex-wrap">
            <GoogleGIcon className="w-9 h-9 md:w-10 md:h-10" />
            {totalReviews}+ real reviews, across every platform.
          </h1>
          <p className="mt-6 text-porcelain/70 max-w-xl leading-relaxed">
            We're listed and reviewed on more than one site — here's the
            real rating and count from each, with real reviews, not just
            the headline number.
          </p>

          {/* Platform switcher + summary */}
          <div className="flex flex-wrap gap-2 mt-10">
            {reviewPlatforms.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setPlatform(p.name as "Google" | "Practo" | "Justdial");
                  gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`focus-ring px-5 py-3 text-sm font-semibold border transition-colors ${
                  platform === p.name
                    ? "bg-porcelain text-ink border-porcelain"
                    : "border-porcelain/25 text-porcelain/70 hover:border-porcelain/50 hover:text-porcelain"
                }`}
              >
                {p.name} · {p.rating.toFixed(1)}★ ({p.count}+ reviews)
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain">
        <div ref={gridRef} className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 scroll-mt-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-ink">
              All {platform} reviews
              {quotes.length > 0 && (
                <span className="text-ink/40 font-normal text-lg"> ({quotes.length} shown)</span>
              )}
            </h2>
            <a
              href={activePlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink underline underline-offset-4"
            >
              Read the rest on {platform} →
            </a>
          </div>

          {quotes.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((t, i) => (
                <div
                  key={`${platform}-${i}`}
                  className="border border-ink/10 bg-white/60 p-6 flex flex-col"
                >
                  <span
                    className={`self-start text-xs font-semibold px-3 py-1 ${tagStyles[i % tagStyles.length]}`}
                  >
                    {t.context}
                  </span>
                  <div className="mt-3">
                    <StarRow rating={activePlatform.rating} />
                  </div>
                  <blockquote className="mt-3 text-ink/75 text-sm leading-relaxed flex-1">
                    "{t.quote}"
                  </blockquote>
                  <p className="mt-4 font-semibold text-ink text-sm">{t.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-ink/10 bg-white/60 p-10 text-center max-w-xl mx-auto">
              <StarRow rating={activePlatform.rating} />
              <p className="mt-4 text-ink/60">
                {activePlatform.rating.toFixed(1)}★ from {activePlatform.count}+ reviews on{" "}
                {platform} — individual reviews coming soon.
              </p>
              <a
                href={activePlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center mt-5 rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Read reviews on {platform}
              </a>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
