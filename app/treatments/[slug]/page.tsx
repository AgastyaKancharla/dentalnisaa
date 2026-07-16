import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatments, clinic } from "@/lib/site-data";
import { buildTitle, buildDescription } from "@/lib/seo";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.id }));
}

function getTreatment(slug: string) {
  return treatments.find((t) => t.id === slug);
}

export function generateMetadata({ params }: Props): Metadata {
  const treatment = getTreatment(params.slug);
  if (!treatment) return {};

  // `absolute` bypasses the root layout's "%s | DentalNisaa" template —
  // these titles already carry their own location branding within a
  // search-safe length budget, so stacking the site name on top would
  // push them well past 60 characters and get truncated in results.
  const title = buildTitle(treatment.name);
  const description = buildDescription(
    treatment.overview,
    `Book at ${clinic.name}, Kadarenahalli.`
  );

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/treatments/${treatment.id}` },
    openGraph: { title, description },
  };
}

export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatment(params.slug);
  if (!treatment) notFound();

  const related = treatment.relatedIds
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.overview,
    provider: {
      "@type": "Dentist",
      name: clinic.name,
      telephone: clinic.phone,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: treatment.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: clinic.website },
      { "@type": "ListItem", position: 2, name: "Treatments", item: `${clinic.website}/treatments` },
      { "@type": "ListItem", position: 3, name: treatment.name, item: `${clinic.website}/treatments/${treatment.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
          <Reveal>
            <nav className="text-sm text-ink/50 mb-8">
              <Link href="/treatments" className="hover:text-ink transition-colors">
                Treatments
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink/70">{treatment.name}</span>
            </nav>

            <span className="inline-flex items-center gap-3 text-teal-dark mb-6">
              <Icon name={treatment.icon} className="w-8 h-8" />
              <span className="h-px w-8 bg-ink/15" />
            </span>

            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              {treatment.tagline}
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-ink">
              {treatment.name}
            </h1>
            <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-2xl">
              {treatment.overview}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/booking?treatment=${treatment.id}`}
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-teal-dark transition-colors"
              >
                Book a consultation
              </Link>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
              >
                Ask a question on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-porcelain-dim/50">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
              Is this right for you?
            </h2>
            <ul className="space-y-4">
              {treatment.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-gold-dark" aria-hidden>
                    ✓
                  </span>
                  <span className="text-ink/75 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl mb-10">
              What to expect
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2">
            {treatment.process.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 80}
                className={`py-7 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"} ${
                  i < 2 ? "border-b border-porcelain/10" : ""
                } ${i % 2 === 0 ? "sm:border-r border-porcelain/10" : ""}`}
              >
                <span className="text-sm font-semibold text-gold-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg mt-2">{step.title}</h3>
                <p className="mt-2 text-porcelain/65 text-sm leading-relaxed max-w-xs">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
              Common questions
            </h2>
          </Reveal>
          <div className="border-t border-ink/10">
            {treatment.faqs.map((f) => (
              <Reveal key={f.q} className="py-6 border-b border-ink/10">
                <h3 className="font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 text-ink/65 text-sm leading-relaxed max-w-xl">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related treatments */}
      {related.length > 0 && (
        <section className="bg-porcelain-dim/50">
          <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                Related treatments
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 border-t border-ink/10">
              {related.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/treatments/${r.id}`}
                  className={`group flex items-center gap-3 py-6 hover:pl-2 transition-[padding] duration-300 ${
                    i > 0 ? "sm:border-l border-ink/10 sm:pl-6" : ""
                  }`}
                >
                  <Icon name={r.icon} className="w-5 h-5 text-teal-dark group-hover:text-gold-dark transition-colors shrink-0" />
                  <span className="font-display text-base text-ink group-hover:text-gold-dark transition-colors">
                    {r.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-gold text-ink">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl">
            Ready to talk about {treatment.name.toLowerCase()}?
          </h2>
          <p className="mt-3 text-ink/70 max-w-md mx-auto">
            Book a consultation and we'll walk you through exactly what's
            right for your situation.
          </p>
          <Link
            href={`/booking?treatment=${treatment.id}`}
            className="focus-ring inline-flex items-center mt-7 bg-ink text-porcelain px-8 py-3.5 font-semibold hover:bg-ink/85 transition-colors"
          >
            Book your visit
          </Link>
        </div>
      </section>
    </>
  );
}
