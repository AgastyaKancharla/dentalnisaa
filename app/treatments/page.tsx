import TreatmentsGrid from "@/components/TreatmentsGrid";
import FinalCTA from "@/components/FinalCTA";

export default function TreatmentsPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-6 md:pt-24">
          <p className="text-sm font-semibold text-brass-dark uppercase tracking-wide mb-3">
            Treatments
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            Care for every stage of{" "}
            <span className="italic text-brass-dark">every smile.</span>
          </h1>
        </div>
      </section>
      <TreatmentsGrid />
      <FinalCTA />
    </>
  );
}
