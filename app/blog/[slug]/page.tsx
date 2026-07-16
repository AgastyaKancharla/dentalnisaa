import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, clinic } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: clinic.name },
    publisher: { "@type": "Organization", name: clinic.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="bg-porcelain">
        <div className="max-w-2xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
          <Reveal>
            <nav className="text-sm text-ink/50 mb-8">
              <Link href="/blog" className="hover:text-ink transition-colors">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink/70">{post.category}</span>
            </nav>

            <p className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
              {post.category} · {formatDate(post.date)} · {post.readTime}
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-4xl leading-tight text-ink">
              {post.title}
            </h1>

            <div className="mt-10 space-y-5">
              {post.content.map((para, i) => (
                <p key={i} className="text-ink/75 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <p className="mt-8 text-sm text-ink/40 italic">
              General information only — for anything specific to your
              situation, please consult a dentist directly.
            </p>
          </Reveal>
        </div>
      </article>

      <section className="bg-porcelain-dim/50">
        <div className="max-w-2xl mx-auto px-5 md:px-8 py-16">
          <Reveal className="glass-panel rounded-2xl p-8 text-center">
            <h2 className="font-display text-xl text-ink">
              Have a question of your own?
            </h2>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Book a consultation
              </Link>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-6 py-3 text-sm font-semibold hover:bg-ink/5 transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="font-display text-lg text-ink mb-5">
                More from the blog
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-2xl border border-ink/10 bg-white/60 p-6 hover:border-gold/40 transition-all"
                  >
                    <p className="text-xs font-semibold text-teal-dark uppercase tracking-wide">
                      {r.category}
                    </p>
                    <h4 className="mt-2 font-display text-base text-ink group-hover:text-gold-dark transition-colors">
                      {r.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
