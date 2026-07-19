"use client";

import { useMemo, useState } from "react";
import { treatments } from "@/lib/site-data";
import Icon from "@/components/Icon";
import { useBooking } from "./BookingProvider";

export default function StepTreatment() {
  const { state, setTreatment, next } = useBooking();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(treatments.map((t) => t.category))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter((t) => {
      const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
      const matchesCategory = !category || t.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const handleSelect = (id: string) => {
    setTreatment(id);
    next();
  };

  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">What brings you in?</h1>
      <p className="text-ink/55 mb-8">Choose the treatment you'd like to book.</p>

      <div className="relative mb-5">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search treatments…"
          aria-label="Search treatments"
          className="focus-ring w-full rounded-full border border-ink/15 bg-white/70 pl-11 pr-4 py-3.5 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            category === null ? "bg-ink text-porcelain border-ink" : "border-ink/15 text-ink/60 hover:border-ink/30"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              category === c ? "bg-ink text-porcelain border-ink" : "border-ink/15 text-ink/60 hover:border-ink/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/50 text-sm py-10 text-center">No treatments match "{query}".</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((t) => {
            const selected = state.treatmentId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelect(t.id)}
                className={`focus-ring group text-left rounded-2xl border p-5 min-h-[112px] transition-all ${
                  selected
                    ? "border-gold bg-gold/10 ring-2 ring-gold"
                    : "border-ink/10 bg-white/60 hover:border-gold/50 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-teal/10 text-teal-dark flex items-center justify-center">
                    <Icon name={t.icon} className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg text-ink">{t.name}</h3>
                    <p className="mt-1 text-sm text-ink/55 leading-snug line-clamp-2">{t.short}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
