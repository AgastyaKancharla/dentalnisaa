"use client";

import { useEffect, useRef, useState } from "react";
import { gallerySpaces, isStockImage } from "@/lib/site-data";
import Reveal from "./Reveal";
import SignatureMark from "./SignatureMark";

// Same accessible lightbox pattern as ClinicTourPreview (the homepage teaser
// for this same data) — Escape-to-close, body scroll lock while open, and
// focus returned to whichever tile opened it. Kept in sync deliberately
// rather than sharing a component, since this page's grid (asymmetric,
// full set of spaces) and that one's (fixed 3-up teaser) diverge enough to
// not be worth abstracting over yet.
export default function GalleryShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? gallerySpaces[openIndex] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

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
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallerySpaces.map((space, i) => {
          // The first tile runs wide on desktop — one deliberate focal
          // point instead of a uniform grid of equal boxes, echoing the
          // asymmetric treatment used for the doctor profiles and hero
          // stat cards elsewhere on the site.
          const featured = i === 0;
          return (
            <Reveal
              key={space.name}
              delay={i * 90}
              variant="media"
              className={featured ? "sm:col-span-2" : ""}
            >
              <button
                type="button"
                onClick={(e) => {
                  if (!space.image) return;
                  lastTriggerRef.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                disabled={!space.image}
                className={`focus-ring group block w-full text-left rounded-2xl overflow-hidden border border-ink/10 bg-white/60 h-full transition-colors duration-300 ${
                  space.image ? "hover:border-gold/40 cursor-zoom-in" : "cursor-default"
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-gradient-to-br from-gold/15 via-porcelain-dim to-teal/10 ${
                    featured ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  {space.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={space.image}
                        alt={space.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* Room name as a caption on the photo, not a plain
                          heading below it — the name is what a scanning
                          visitor should register first. */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                      />
                      <h3
                        className={`absolute bottom-4 left-4 right-4 font-display text-porcelain drop-shadow-sm ${
                          featured ? "text-2xl md:text-3xl" : "text-xl"
                        }`}
                      >
                        {space.name}
                      </h3>
                      {isStockImage(space.image) && (
                        <span className="absolute top-3 right-3 bg-ink/60 text-porcelain text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur">
                          Representative photo
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-6">
                      <SignatureMark className="absolute -right-4 -bottom-4 w-28 h-28 text-gold/25" />
                      <p className="relative font-display text-lg text-ink/70">
                        {space.name}
                      </p>
                      <p className="relative mt-1.5 text-xs uppercase tracking-wide text-ink/40">
                        Photo coming soon
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
                    {space.description}
                  </p>
                </div>
              </button>
            </Reveal>
          );
        })}
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
    </>
  );
}
