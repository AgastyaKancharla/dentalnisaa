import type { Metadata } from "next";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import FinalCTA from "@/components/FinalCTA";
import { clinic } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Treatments",
  description: `General, cosmetic, orthodontic, implant, and family dentistry at ${clinic.name} in Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-6 md:pt-24">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Treatments
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            Care for every stage of{" "}
            <span className="italic text-gold-dark">every smile.</span>
          </h1>
        </div>
      </section>
      <TreatmentsGrid />
      <FinalCTA />
    </>
  );
}
