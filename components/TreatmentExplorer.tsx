"use client";

import { useMemo, useState } from "react";
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
          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40"
            />
            <input
              id="treatment-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search treatments — e.g. implants, braces, whitening"
              className="focus-ring w-full rounded-full border border-ink/15 bg-white/70 py-3 pl-11 pr-5 text-sm text-ink placeholder:text-ink/40"
            />
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={40} className="mb-12">
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter treatments by category"
          >
            <button
              type="button"
              onClick={() => setCategory("All")}
              aria-pressed={category === "All"}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === "All"
                  ? "bg-ink text-porcelain"
                  : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
              }`}
            >
              All treatments
            </button>
            {categoriesInUse.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-ink text-porcelain"
                    : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-7">
            {filtered.map((t, i) => (
              <Reveal key={t.id} delay={(i % 8) * 40}>
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
