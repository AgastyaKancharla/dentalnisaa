"use client";

import { useMemo, useState } from "react";
import {
  testimonials,
  practoTestimonials,
  justdialTestimonials,
  reviewPlatforms,
} from "@/lib/site-data";
import Breadcrumb from "@/components/Breadcrumb";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import { GoogleGIcon } from "@/components/Icon";

type Entry = { platform: string; quote: string; context: string; author: string; rating: number };

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-3.5 h-3.5"
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

// A small monogram badge per platform instead of reproducing any
// trademarked logos — Google's is the one glyph already established
// elsewhere on the site (GoogleGIcon), Practo/Justdial get plain
// letterform badges so nothing here risks recreating brand marks we
// don't have rights to.
function PlatformMark({ platform }: { platform: string }) {
  if (platform === "Google") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-ink/10 shrink-0">
        <GoogleGIcon className="w-3.5 h-3.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink text-porcelain text-[11px] font-bold shrink-0">
      {platform[0]}
    </span>
  );
}

export default function ReviewsPageContent() {
  const [filter, setFilter] = useState<"All" | "Google" | "Practo" | "Justdial">("All");

  const allEntries: Entry[] = useMemo(() => {
    const google = reviewPlatforms.find((p) => p.name === "Google")!;
    const practo = reviewPlatforms.find((p) => p.name === "Practo")!;
    const justdial = reviewPlatforms.find((p) => p.name === "Justdial")!;
    return [
      ...testimonials.map((t) => ({ platform: "Google", rating: google.rating, ...t })),
      ...practoTestimonials.map((t) => ({ platform: "Practo", rating: practo.rating, ...t })),
      ...justdialTestimonials.map((t) => ({ platform: "Justdial", rating: justdial.rating, ...t })),
    ];
  }, []);

  const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
  const filtered = filter === "All" ? allEntries : allEntries.filter((e) => e.platform === filter);

  // Grouped by platform when showing everything, so it reads as a real
  // ledger with clear sections rather than a shuffled mix — filtering
  // down to one platform just shows that platform's rows plain.
  const groups =
    filter === "All"
      ? reviewPlatforms.map((p) => ({
          platform: p.name,
          rating: p.rating,
          count: p.count,
          url: p.url,
          entries: allEntries.filter((e) => e.platform === p.name),
        }))
      : [
          {
            platform: filter,
            rating: reviewPlatforms.find((p) => p.name === filter)!.rating,
            count: reviewPlatforms.find((p) => p.name === filter)!.count,
            url: reviewPlatforms.find((p) => p.name === filter)!.url,
            entries: filtered,
          },
        ];

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
          <h1 className="font-display text-4xl md:text-5xl leading-tight max-w-2xl">
            The full record — not the highlight reel.
          </h1>
          <p className="mt-6 text-porcelain/70 max-w-xl leading-relaxed">
            {totalReviews}+ real reviews across three independent
            platforms. Rather than picking out the best lines, this page
            is every review we have text for, grouped by where it came
            from — plus a direct link to read the rest on each platform
            yourself.
          </p>

          {/* Platform ledger header — all three shown at once, not hidden
              behind tabs. Each links straight to the real platform. */}
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 border-t border-l border-porcelain/15">
            {reviewPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group border-r border-b border-porcelain/15 p-6 hover:bg-porcelain/5 transition-colors"
              >
                <dt className="text-xs uppercase tracking-wide text-porcelain/50 flex items-center justify-between">
                  {p.name}
                  <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </dt>
                <dd className="mt-2 font-display text-2xl">
                  {p.rating.toFixed(1)}★
                </dd>
                <dd className="text-sm text-porcelain/60 mt-0.5">{p.count}+ reviews</dd>
              </a>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
          {/* Filter */}
          <Reveal className="flex flex-wrap gap-2.5 mb-14">
            {(["All", "Google", "Practo", "Justdial"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-ink text-porcelain"
                    : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>

          {/* Unified ledger, grouped by platform */}
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.platform}>
                <Reveal className="flex items-baseline justify-between gap-4 flex-wrap border-b border-ink/10 pb-4 mb-8">
                  <h2 className="font-display text-xl md:text-2xl text-ink flex items-center gap-3">
                    <PlatformMark platform={group.platform} />
                    {group.platform}
                    <span className="text-ink/40 font-normal text-base">
                      {group.rating.toFixed(1)}★ · {group.count}+ reviews
                    </span>
                  </h2>
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink underline underline-offset-4"
                  >
                    Read the rest on {group.platform} →
                  </a>
                </Reveal>

                {group.entries.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {group.entries.map((t, i) => (
                      <Reveal key={`${t.platform}-${i}`} delay={(i % 6) * 90}>
                        <p className="text-[11px] font-semibold text-teal-dark uppercase tracking-wide mb-2">
                          {t.context}
                        </p>
                        <StarRow rating={t.rating} />
                        <blockquote className="mt-3 text-ink/75 text-sm leading-relaxed">
                          "{t.quote}"
                        </blockquote>
                        <p className="mt-3 font-semibold text-ink text-sm">{t.author}</p>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <Reveal className="border border-dashed border-ink/15 p-8 text-ink/60 text-sm max-w-lg">
                    We don't have individual review text from {group.platform} on
                    the site yet — the {group.rating.toFixed(1)}★ average from{" "}
                    {group.count}+ reviews is real and verifiable directly on{" "}
                    {group.platform} using the link above.
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
