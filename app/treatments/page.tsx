import type { Metadata } from "next";
import { clinic, treatments, treatmentCategories } from "@/lib/site-data";
import { buildTreatmentsCollectionSchema } from "@/lib/schema";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import SignatureMark from "@/components/SignatureMark";

export const metadata: Metadata = {
  title: "Dental Treatments in Kadarenahalli",
  description: `General, cosmetic, orthodontic, implant, and family dentistry at ${clinic.name} in Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/treatments" },
  openGraph: {
    title: `Dental Treatments | ${clinic.name}`,
    description: `${treatments.length} treatments across preventive, cosmetic, restorative, and family dentistry — all under one roof in Kadarenahalli, Bengaluru.`,
  },
};

export default function TreatmentsPage() {
  const schema = buildTreatmentsCollectionSchema(treatments);
  const categoriesInUse = treatmentCategories.filter((c) =>
    treatments.some((t) => t.category === c)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Premium hero */}
      <section className="relative bg-porcelain overflow-hidden">
        <SignatureMark
          className="absolute -right-6 -top-6 w-40 h-40 text-ink/[0.06] hidden md:block"
        />
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 pb-10 md:pt-24 md:pb-14 relative">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Dental Treatments in Kadarenahalli, Bengaluru
            </p>
            <h1 className="font-display text-4xl md:text-5xl xl:text-[3.4rem] text-ink leading-tight max-w-3xl">
              Care for every stage of{" "}
              <span className="italic text-gold-dark">every smile.</span>
            </h1>
            <p className="mt-6 text-ink/65 text-lg max-w-xl leading-relaxed">
              From a routine check-up to a full mouth rehabilitation,
              every treatment below follows the same honest approach —
              a clear explanation of what's needed, and why, before we
              ever start.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10 flex items-center gap-8 border-t border-ink/10 pt-6">
            <div>
              <p className="font-display text-3xl text-ink">{treatments.length}</p>
              <p className="text-xs uppercase tracking-wide text-ink/50 mt-1">
                Treatments offered
              </p>
            </div>
            <div className="h-8 w-px bg-ink/10" aria-hidden />
            <div>
              <p className="font-display text-3xl text-ink">{categoriesInUse.length}</p>
              <p className="text-xs uppercase tracking-wide text-ink/50 mt-1">
                Care categories
              </p>
            </div>
            <div className="h-8 w-px bg-ink/10" aria-hidden />
            <div>
              <p className="font-display text-3xl text-ink">{clinic.rating}★</p>
              <p className="text-xs uppercase tracking-wide text-ink/50 mt-1">
                {clinic.reviewCount}+ reviews
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <TreatmentExplorer treatments={treatments} />
      <FinalCTA />
    </>
  );
}
