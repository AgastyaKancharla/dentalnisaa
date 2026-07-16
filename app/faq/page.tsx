import type { Metadata } from "next";
import { clinic, siteFaqs } from "@/lib/site-data";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Patient Resources",
  description: `Answers to common questions about booking, payment, hours, and what to expect at ${clinic.name} in Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-10">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Patient Resources
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Questions, answered.
            </h1>
            <p className="mt-5 text-ink/60 max-w-xl">
              Looking for something specific to a treatment? Each treatment
              page has its own FAQ section too.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28">
          <Reveal className="max-w-3xl">
            <FaqAccordion items={siteFaqs} />
          </Reveal>

          <Reveal className="mt-12 max-w-3xl rounded-2xl bg-porcelain-dim/60 p-8 text-center">
            <p className="text-ink/70">
              Still have a question? We're happy to answer it directly.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Ask on WhatsApp
              </a>
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-6 py-3 text-sm font-semibold hover:bg-ink/5 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
