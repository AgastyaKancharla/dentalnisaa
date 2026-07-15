import type { Metadata } from "next";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import { clinic } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description: `${clinic.yearsActive} years of family dental care in Kadarenahalli, Bengaluru. Meet the team behind ${clinic.name}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            About us
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            {clinic.yearsActive} years of{" "}
            <span className="italic text-gold-dark">family trust.</span>
          </h1>
          <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-2xl">
            DentalNisaa Oral Care started with a simple idea: dental care
            should feel like visiting someone who knows you, not a queue
            number. Three decades later, we still treat grandparents and
            their grandchildren in the same chair — and it shows in how our
            patients talk about us.
          </p>
        </div>
      </section>
      <DoctorSpotlight />
    </>
  );
}
