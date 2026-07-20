import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatments, clinic } from "@/lib/site-data";
import { buildTitle, buildDescription } from "@/lib/seo";
import {
  buildMedicalProcedureSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import TreatmentMedia from "@/components/TreatmentMedia";
import TreatmentCard from "@/components/TreatmentCard";
import TreatmentProcessTimeline from "@/components/TreatmentProcessTimeline";
import TreatmentFinalCTA from "@/components/TreatmentFinalCTA";
import FaqAccordion from "@/components/FaqAccordion";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import SectionSeam from "@/components/SectionSeam";

type Props = { params: { slug: string } };

// Every URL under /treatments/[slug] is built from this one template —
// new treatments only ever require a new entry in lib/site-data.ts, never
// a new page file or layout variant.
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
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatment(params.slug);
  if (!treatment) notFound();

  const related = treatment.relatedIds
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const procedureSchema = buildMedicalProcedureSchema(treatment);
  const faqSchema = buildFaqSchema(treatment);
  const breadcrumbSchema = buildBreadcrumbSchema(treatment);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative bg-porcelain overflow-hidden">
        <div className="grid md:grid-cols-2 md:min-h-[560px]">
          <div className="flex items-center px-5 md:pl-10 lg:pl-16 xl:pl-24 md:pr-10 py-14 md:py-20">
            <div className="max-w-lg">
              <Reveal>
                <nav aria-label="Breadcrumb" className="text-sm text-ink/50 mb-7">
                  <Link href="/treatments" className="hover:text-ink transition-colors">
                    Treatments
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-ink/70" aria-current="page">
                    {treatment.name}
                  </span>
                </nav>

                <span className="inline-flex items-center gap-3 text-teal-dark mb-5">
                  <Icon name={treatment.icon} className="w-7 h-7" />
                  <span className="h-px w-8 bg-ink/15" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-teal-dark">
                    {treatment.category}
                  </span>
                </span>

                <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
                  {treatment.tagline}
                </p>
                <h1 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                  {treatment.name}
                </h1>
                <p className="mt-6 text-ink/70 text-lg leading-relaxed">
                  {treatment.short}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6">
                  <div className="flex items-center gap-2.5">
                    <Icon name="clock" className="w-4 h-4 text-ink/40" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{treatment.duration}</p>
                      <p className="text-xs text-ink/45">Typical duration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Icon name="shield" className="w-4 h-4 text-ink/40" />
                    <div>
                      <p className="text-sm font-semibold text-ink max-w-[14rem] leading-snug">
                        {treatment.recovery}
                      </p>
                      <p className="text-xs text-ink/45">Recovery</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
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
                    className="focus-ring inline-flex items-center gap-1.5 font-semibold text-ink hover:text-gold-dark transition-colors"
                  >
                    Ask a question on WhatsApp
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative h-[300px] md:h-auto">
            <TreatmentMedia
              treatment={treatment}
              variant="hero"
              className="w-full h-full"
            />
          </div>
        </div>
        <SectionSeam />
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Overview</h2>
            <p className="text-ink/70 text-lg leading-relaxed">{treatment.overview}</p>
          </Reveal>
        </div>
      </section>

      {/* ================= WHO NEEDS THIS ================= */}
      <section className="bg-porcelain-dim/50">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                Is this right for you?
              </h2>
              <ul className="space-y-4">
                {treatment.forWhom.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-gold-dark shrink-0" aria-hidden>
                      ✓
                    </span>
                    <span className="text-ink/75 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                Signs to watch for
              </h2>
              <ul className="space-y-4">
                {treatment.symptoms.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-ink/30 shrink-0"
                      aria-hidden
                    />
                    <span className="text-ink/75 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
              Why patients choose this
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 border-t border-ink/10">
            {treatment.benefits.map((benefit, i) => (
              <Reveal
                key={benefit}
                delay={i * 70}
                className={`py-7 ${i > 0 ? "sm:border-l border-ink/10 sm:pl-8" : ""}`}
              >
                <span className="text-gold-dark text-xl" aria-hidden>
                  ✓
                </span>
                <p className="mt-3 text-ink/75 leading-relaxed">{benefit}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS (timeline) ================= */}
      <section className="bg-ink text-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl mb-12">What to expect</h2>
          </Reveal>
          <div className="max-w-xl">
            <TreatmentProcessTimeline steps={treatment.process} />
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY, DURATION & RECOVERY ================= */}
      <section className="bg-porcelain-dim/50">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            <Reveal>
              <h2 className="font-display text-xl text-ink mb-5">Technology used</h2>
              <ul className="space-y-3">
                {treatment.technology.map((tech) => (
                  <li key={tech} className="flex items-start gap-3 text-ink/75 leading-relaxed">
                    <Icon name="sparkle" className="w-4 h-4 mt-1 text-teal-dark shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="font-display text-xl text-ink mb-5">Treatment duration</h2>
              <p className="font-display text-2xl text-ink mb-2">{treatment.duration}</p>
              <p className="text-ink/60 text-sm leading-relaxed">
                Exact timing depends on your specific case — confirmed at consultation.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="font-display text-xl text-ink mb-5">Recovery</h2>
              <p className="text-ink/75 leading-relaxed">{treatment.recovery}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={60} className="max-w-2xl">
            <FaqAccordion items={treatment.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ================= MEET YOUR DOCTOR ================= */}
      <DoctorSpotlight topDivider={false} />

      {/* ================= RELATED TREATMENTS ================= */}
      {related.length > 0 && (
        <section className="bg-porcelain">
          <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
                Related treatments
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-7">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 60}>
                  <TreatmentCard treatment={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <TreatmentFinalCTA treatmentName={treatment.name} treatmentId={treatment.id} />
    </>
  );
}
