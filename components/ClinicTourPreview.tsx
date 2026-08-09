"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gallerySpaces, isStockImage } from "@/lib/site-data";
import Reveal from "./Reveal";
import SectionSeam from "./SectionSeam";

// Homepage teaser for the full /gallery page — same data, condensed to the
// spaces that currently have a photo so the preview never shows an empty
// "coming soon" tile above the fold.
//
// Actual photographs of the clinic are preferred over the stock stand-ins:
// this section's whole claim is "a look inside, before you arrive", which
// only holds if what's shown is genuinely inside. Stock only fills in if
// there aren't yet three real photos to show.
export default function ClinicTourPreview() {
  const real = gallerySpaces.filter((s) => s.image && !isStockImage(s.image));
  const stock = gallerySpaces.filter((s) => isStockImage(s.image));
  const withPhotos = [...real, ...stock];
  const preview = (withPhotos.length ? withPhotos : gallerySpaces).slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? preview[openIndex] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Escape-to-close + body scroll lock while the lightbox is open, and
  // return focus to whatever tile opened it when it closes.
  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [active]);

  return (
    <section className="bg-porcelain relative">
      <SectionSeam tone="light" />
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Inside the clinic
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            A look inside,
            <span className="text-gold-dark italic"> before you arrive.</span>
          </h2>
        </Reveal>

        <div className={`grid gap-6 ${preview.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 max-w-2xl"}`}>
          {preview.map((space, i) => (
            <Reveal key={space.name} delay={i * 60}>
              <button
                type="button"
                onClick={(e) => {
                  if (!space.image) return;
                  lastTriggerRef.current = e.currentTarget;
                  setOpenIndex(i);
                }}
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

        <Reveal delay={200} className="mt-10">
          <Link
            href="/gallery"
            className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold-dark transition-colors"
          >
            See the full gallery <span aria-hidden>→</span>
          </Link>
        </Reveal>
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
            ref={closeButtonRef}
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
