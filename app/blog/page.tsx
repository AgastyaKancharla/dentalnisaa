import type { Metadata } from "next";
import Link from "next/link";
import { clinic, blogPosts } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog — Dental Health & Advice",
  description: `Straightforward, honest advice on dental health topics from ${clinic.name}, Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Blog
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Dental health,
              <span className="italic text-gold-dark"> plainly explained.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pb-20 md:pb-28">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
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
        </div>
      </section>
    </>
  );
}
