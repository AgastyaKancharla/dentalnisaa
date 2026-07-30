import type { Metadata } from "next";
import { clinic, blogPosts } from "@/lib/site-data";
import Reveal from "@/components/Reveal";
import BlogExplorer from "@/components/BlogExplorer";

export const metadata: Metadata = {
  title: "Dental Knowledge Base",
  description: `Straightforward, honest answers to common dental questions from ${clinic.name}, Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-10">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Dental knowledge base
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Answers to the questions
              <span className="italic text-gold-dark"> patients actually ask.</span>
            </h1>
            <p className="mt-5 text-ink/60 max-w-xl">
              A growing resource of straightforward, honest guidance — search by topic
              or browse by category below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28">
          <BlogExplorer posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
