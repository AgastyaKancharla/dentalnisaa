import Link from "next/link";
import { siteFaqs } from "@/lib/site-data";
import FaqAccordion from "./FaqAccordion";
import Reveal from "./Reveal";

// Reuses the existing FaqAccordion component (already used on /faq) rather
// than a new one — just the top few questions, with a link to the full page.
export default function FaqPreview() {
  const preview = siteFaqs.slice(0, 5);

  return (
    <section className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
        <Reveal>
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink">
            Before you book.
          </h2>
          <p className="mt-4 text-ink/55 max-w-xs">
            The questions we hear most from new patients.
          </p>
          <Link
            href="/faq"
            className="focus-ring inline-flex items-center gap-2 mt-6 text-sm font-semibold text-ink hover:text-gold-dark transition-colors"
          >
            See all FAQs <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <FaqAccordion items={preview} />
        </Reveal>
      </div>
    </section>
  );
}
