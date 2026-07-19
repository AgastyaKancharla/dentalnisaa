"use client";

import { useState } from "react";
import Link from "next/link";
import { gallerySpaces } from "@/lib/site-data";
import Reveal from "./Reveal";
import SectionSeam from "./SectionSeam";

// Homepage teaser for the full /gallery page — same data, condensed to the
// spaces that currently have a real photo so the preview never shows an
// empty "coming soon" tile above the fold.
export default function ClinicTourPreview() {
  const withPhotos = gallerySpaces.filter((s) => s.image);
  const preview = (withPhotos.length ? withPhotos : gallerySpaces).slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? preview[openIndex] : null;

  return (
    <section className="bg-porcelain relative">
      <SectionSeam tone="light" />
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Inside the clinic
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              A look inside,
              <span className="text-gold-dark italic"> before you arrive.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink underline underline-offset-4"
          >
            See the full gallery →
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {preview.map((space, i) => (
            <Reveal key={space.name} delay={i * 60}>
              <button
                type="button"
                onClick={() => space.image && setOpenIndex(i)}
                className="focus-ring group block w-full text-left border border-ink/10 overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-glass/50 via-porcelain-dim to-glass/20">
                  {space.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={space.image}
                      alt={space.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink/30 text-xs">
                      Photo coming soon
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ink">{space.name}</h3>
                  <p className="mt-1.5 text-sm text-ink/55 leading-relaxed line-clamp-2">
                    {space.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && active.image && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="focus-ring absolute top-6 right-6 text-porcelain/70 hover:text-porcelain text-sm font-semibold"
            aria-label="Close"
          >
            Close ✕
          </button>
          <div className="max-w-3xl w-full animate-fadeUp" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.name}
              className="w-full max-h-[75vh] object-contain"
            />
            <p className="mt-4 text-porcelain font-display text-xl">{active.name}</p>
            <p className="mt-1 text-porcelain/60 text-sm max-w-xl">{active.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
