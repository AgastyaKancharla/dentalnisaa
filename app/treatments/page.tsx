import type { Metadata } from "next";
import { clinic, treatments, treatmentCategories } from "@/lib/site-data";
import { buildTreatmentsCollectionSchema } from "@/lib/schema";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import SignatureMark from "@/components/SignatureMark";
import AnimatedCounter from "@/components/AnimatedCounter";
import Icon from "@/components/Icon";

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

          <div className="mt-10 pt-6 border-t border-ink/10 grid grid-cols-3 gap-3 sm:gap-5 max-w-xl">
            {[
              { icon: "tooth", value: treatments.length, decimals: 0, suffix: "", label: "Treatments offered" },
              { icon: "align", value: categoriesInUse.length, decimals: 0, suffix: "", label: "Care categories" },
              { icon: "sparkle", value: clinic.rating, decimals: 1, suffix: "★", label: `${clinic.reviewCount}+ reviews` },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={90 + i * 90}>
                <div className="group rounded-2xl border border-ink/10 bg-white/60 px-3 py-5 sm:px-5 sm:py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                  <div className="mx-auto mb-2.5 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition-transform duration-300 group-hover:scale-110">
                    <Icon name={stat.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl text-ink tabular-nums">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="mt-1.5 text-[0.65rem] sm:text-xs uppercase tracking-wide text-ink/50">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TreatmentExplorer treatments={treatments} />
      <FinalCTA />
    </>
  );
}
