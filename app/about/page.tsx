import type { Metadata } from "next";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import Transparency from "@/components/Transparency";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import { clinic } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description: `${clinic.yearsActive} years of family dental care in Kadarenahalli, Bengaluru. Meet the team behind ${clinic.name}.`,
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: `${clinic.foundedYear}`,
    title: "Where it started",
    detail:
      "DentalNisaa Oral Care opens its doors, built on a simple idea: dental care should feel personal, not like a queue number.",
  },
  {
    year: "Today",
    title: "A new home in Kadarenahalli",
    detail:
      "A relocated, purpose-built clinic — designed around light, glass, and openness, so patients see the care happening, not just wait for it.",
  },
  {
    year: "Ongoing",
    title: "Three generations, one chair",
    detail:
      "Grandparents, parents, and children — many of our patients have trusted the same clinic across their whole family's life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <Reveal>
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
              number. {clinic.yearsActive} years later, we still treat
              grandparents and their grandchildren in the same chair — and
              it shows in how our patients talk about us.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain-dim/50">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
              Our story
            </h2>
          </Reveal>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 80}
                className="flex gap-6 rounded-2xl border border-ink/10 bg-white/60 p-6"
              >
                <span className="shrink-0 font-display text-xl text-gold-dark w-20">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Transparency topDivider />
      <DoctorSpotlight topDivider={false} />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
