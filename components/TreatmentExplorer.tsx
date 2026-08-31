"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { treatmentCategories, type Treatment } from "@/lib/site-data";
import Icon from "./Icon";
import TreatmentCard from "./TreatmentCard";
import Reveal from "./Reveal";

export default function TreatmentExplorer({ treatments }: { treatments: Treatment[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery =
        q.length === 0 ||
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [treatments, query, category]);

  const categoriesInUse = useMemo(
    () => treatmentCategories.filter((c) => treatments.some((t) => t.category === c)),
    [treatments]
  );

  return (
    <section className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28">
        {/* Search */}
        <Reveal className="max-w-md mb-6">
          <label htmlFor="treatment-search" className="sr-only">
            Search treatments
          </label>
          <div className="group relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 transition-colors duration-300 group-focus-within:text-gold-dark"
            />
            <input
              id="treatment-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search treatments — e.g. implants, braces, whitening"
              className="focus-ring w-full rounded-full border border-ink/15 bg-white/70 py-3 pl-11 pr-11 text-base text-ink placeholder:text-ink/40 transition-all duration-300 hover:border-ink/25 focus:border-gold/50 focus:shadow-[0_0_0_4px_rgba(209,160,87,0.12)]"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="focus-ring absolute right-3.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-ink transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Category filters — the active pill's fill slides between buttons
            (a shared layoutId) instead of each button independently
            swapping its own background color. */}
        <Reveal delay={90} className="mb-12">
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter treatments by category"
          >
            {["All", ...categoriesInUse].map((c) => {
              const isActive = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={isActive}
                  className={`focus-ring relative rounded-full px-4 py-2 text-sm font-medium border transition-colors duration-300 ${
                    isActive
                      ? "border-transparent text-porcelain"
                      : "border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c === "All" ? "All treatments" : c}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-7">
            {filtered.map((t, i) => (
              <Reveal key={t.id} delay={(i % 8) * 90}>
                <TreatmentCard treatment={t} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="rounded-2xl border border-ink/10 bg-white/60 py-16 text-center">
            <p className="font-display text-xl text-ink">No treatments match that search.</p>
            <p className="mt-2 text-sm text-ink/60">
              Try a different term, or{" "}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="focus-ring font-semibold text-gold-dark underline underline-offset-2"
              >
                clear filters
              </button>
              .
            </p>
          </Reveal>
        )}

        <p className="mt-8 text-sm text-ink/45" aria-live="polite">
          Showing {filtered.length} of {treatments.length} treatments
        </p>
      </div>
    </section>
  );
}
