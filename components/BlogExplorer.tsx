"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  );

  const categories = useMemo(
    () => Array.from(new Set(sorted.map((p) => p.category))),
    [sorted]
  );

  const filtered = sorted.filter((post) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    const matchesCategory = !category || post.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <div className="relative mb-5 max-w-3xl">
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
          placeholder="Search the knowledge base…"
          aria-label="Search articles"
          className="focus-ring w-full rounded-full border border-ink/15 bg-white/70 pl-11 pr-4 py-3.5 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10 max-w-3xl" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`focus-ring rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            category === null ? "bg-ink text-porcelain border-ink" : "border-ink/15 text-ink/60 hover:border-ink/30"
          }`}
        >
          All topics
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
        <p className="text-ink/50 text-sm py-10">No articles match "{query}".</p>
      ) : (
        <div className="space-y-6 max-w-3xl">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-ink/10 bg-white/60 p-7 hover:border-gold/40 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
                  {post.category} · {formatDate(post.date)} · {post.readTime}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink group-hover:text-gold-dark transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-ink/60 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold-dark">
                  Read more →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
