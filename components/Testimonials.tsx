"use client";

import { useState } from "react";
import { testimonials, clinic } from "@/lib/site-data";
import SignatureMark from "./SignatureMark";

const googleReviewsUrl =
  clinic.address.mapsUrl ||
  `https://www.google.com/search?q=${encodeURIComponent(
    clinic.name + " " + clinic.address.line2
  )}+reviews`;

export default function Testimonials() {
  const featured = testimonials.slice(0, 6);
  const [active, setActive] = useState(0);
  const current = featured[active];

  return (
    <section id="reviews" className="bg-porcelain-dim/40 relative overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              What families say
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              {clinic.rating}★ from {clinic.reviewCount}+ patients.
            </h2>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink underline underline-offset-4"
          >
            See all reviews on Google →
          </a>
        </div>

        {current ? (
          <div className="grid md:grid-cols-[1.4fr_0.6fr] gap-14 md:gap-16 items-start">
            <div className="relative">
              <SignatureMark className="w-16 h-16 text-gold absolute -top-8 -left-3 hidden md:block" strokeOpacity={0.5} />
              <blockquote className="font-display text-2xl md:text-[2rem] leading-[1.3] text-ink">
                “{current.quote}”
              </blockquote>
              <p className="mt-7 font-semibold text-ink">{current.author}</p>
              <p className="text-sm text-ink/45">{current.context}</p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-ink/10 pt-6 md:pt-0 md:pl-8">
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-4">
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
                        ? "bg-ink text-porcelain font-semibold"
                        : "text-ink/60 hover:text-ink hover:bg-ink/5"
                    }`}
                  >
                    {t.author}
                    <span className="block text-xs opacity-60 font-normal">{t.context}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-none border border-ink/10 bg-white/60 p-8 text-center">
            <p className="text-ink/70">
              Read {clinic.reviewCount}+ real reviews from our patients on
              Google.
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center mt-4 rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
            >
              See our Google reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
