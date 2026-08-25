"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gallerySpaces, isStockImage, treatments } from "@/lib/site-data";
import Reveal from "./Reveal";
import Icon from "./Icon";
import Tilt3D from "./Tilt3D";

// Homepage-only section. Two things the old page said separately —
// "here's a look inside" (ClinicTourPreview) and "here's how we keep it
// safe" (TechnologySection) — are really one claim: the room backs up the
// promise. A visitor who taps "The Process" right after looking at the
// waiting lounge photo is following one thought, not starting a new one.
type Tab = "space" | "process";

type Step = { icon: string; label: string };

function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center text-center w-20 sm:w-24">
            <Tilt3D maxDeg={16}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gold/10 border border-gold/30">
                <Icon name={step.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-gold-dark" />
              </div>
            </Tilt3D>
            <p className="mt-3 text-xs sm:text-sm text-ink/75 leading-snug">
              {step.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="w-6 sm:w-10 h-px bg-ink/15 shrink-0 -mt-6" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

export default function InsideClinic() {
  const [tab, setTab] = useState<Tab>("space");

  const real = gallerySpaces.filter((s) => s.image && !isStockImage(s.image));
  const stock = gallerySpaces.filter((s) => isStockImage(s.image));
  const withPhotos = [...real, ...stock];
  const preview = (withPhotos.length ? withPhotos : gallerySpaces).slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? preview[openIndex] : null;
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

  const xray = treatments.find((t) => t.id === "digital-xray");
  const sterilization = gallerySpaces.find((s) => s.name === "Sterilization & Safety");

  return (
    <section className="bg-porcelain-dim/60 text-ink relative overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-10">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-[0.14em] mb-4">
            Inside DentalNisaa
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.03] text-ink">
            A look inside,
            <br />
            <span className="italic text-gold-dark font-normal">and how we work.</span>
          </h2>
        </Reveal>

        {/* Segmented control */}
        <Reveal delay={60} className="mb-12">
          <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-porcelain p-1">
            {(
              [
                { id: "space" as const, label: "The Space" },
                { id: "process" as const, label: "The Process" },
              ]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`focus-ring px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-ink text-porcelain"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab === "space" ? (
            <motion.div
              key="space"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`grid gap-6 ${preview.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 max-w-2xl"}`}>
                {preview.map((space, i) => (
                  <button
                    key={space.name}
                    type="button"
                    onClick={(e) => {
                      if (!space.image) return;
                      lastTriggerRef.current = e.currentTarget;
                      setOpenIndex(i);
                    }}
                    className="focus-ring group block w-full text-left rounded-2xl border border-ink/10 overflow-hidden bg-porcelain"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-mist-soft">
                      {space.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={space.image}
                          alt={space.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink/40 text-xs">
                          Photo coming soon
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink">{space.name}</h3>
                      <p className="mt-1.5 text-sm text-ink/70 leading-relaxed line-clamp-2">
                        {space.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/gallery"
                  className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-gold-dark transition-colors"
                >
                  See the full gallery <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-14"
            >
              <div>
                <div className="grid md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-10 pb-7 border-b border-ink/15">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 text-ink">
                      From scan to answer, one visit.
                    </h3>
                    <p className="text-ink/70 max-w-md text-sm leading-relaxed">
                      {xray?.overview ??
                        "Digital X-rays use meaningfully less radiation than traditional film."}
                    </p>
                  </div>
                  <Link
                    href={xray ? `/treatments/${xray.id}` : "/treatments"}
                    className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-ink transition-colors shrink-0"
                  >
                    How digital X-rays work <span aria-hidden>→</span>
                  </Link>
                </div>
                <div className="pt-9 overflow-x-auto">
                  <StepFlow
                    steps={[
                      { icon: "scan", label: "Scan taken" },
                      { icon: "monitor", label: "On screen instantly" },
                      { icon: "chat", label: "Explained together" },
                    ]}
                  />
                </div>
              </div>

              <div>
                <div className="grid md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-10 pb-7 border-b border-ink/15">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 text-ink">
                      Every instrument, the same cycle.
                    </h3>
                    <p className="text-ink/70 max-w-md text-sm leading-relaxed">
                      {sterilization?.description ??
                        "Every instrument that touches your mouth goes through the same sterilization cycle, whether you're the first appointment of the morning or the last of the day."}
                    </p>
                  </div>
                  <Link
                    href="/gallery"
                    className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-ink transition-colors shrink-0"
                  >
                    See the sterilization room <span aria-hidden>→</span>
                  </Link>
                </div>
                <div className="pt-9 overflow-x-auto">
                  <StepFlow
                    steps={[
                      { icon: "droplet", label: "Cleaned" },
                      { icon: "shield", label: "Sterilized" },
                      { icon: "lock", label: "Sealed until use" },
                    ]}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <p className="mt-1 text-porcelain/70 text-sm max-w-xl">{active.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
