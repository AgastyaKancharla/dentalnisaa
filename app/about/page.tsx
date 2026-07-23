import type { Metadata } from "next";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import Transparency from "@/components/Transparency";
import TrustStats from "@/components/TrustStats";
import ClinicTourPreview from "@/components/ClinicTourPreview";
import OurValues from "@/components/OurValues";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/Breadcrumb";
import { clinic } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us — Kadarenahalli, Bengaluru",
  description: `${clinic.yearsActive} years of family dental care in Kadarenahalli, Bengaluru. Meet the team behind ${clinic.name}.`,
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: `${clinic.foundedYear}`,
    title: "Where it started",
    detail:
      "DentalNisaa Oral Care opens its doors in Bengaluru, built to feel like a family clinic first and a business second.",
  },
  {
    year: "Today",
    title: "A new home in Kadarenahalli",
    detail:
      "A relocated, purpose-built clinic — calmer, more modern, and designed around patient comfort from the waiting room in.",
  },
  {
    year: "Ongoing",
    title: "Three generations, one chair",
    detail:
      "Grandparents, parents, and children — many of our patients have trusted the same clinic across their whole family's life.",
  },
  {
    year: "Always",
    title: "Unhurried, honest care",
    detail:
      "Every visit runs on the same idea we started with: explain clearly, treat gently, and only recommend what's actually needed.",
  },
];

// Same vetted, honestly-labelled representative photo already used in the
// clinic gallery data — reused rather than introducing a new unverified
// stock image for the hero/story sections.
const REPRESENTATIVE_PHOTO =
  "https://images.unsplash.com/photo-1704455306251-b4634215d98f?fm=jpg&q=80&w=1200&auto=format&fit=crop";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-porcelain relative overflow-hidden">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-8 pb-14 md:pt-10 md:pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
          <Reveal>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mt-6 mb-3">
              About DentalNisaa
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              {clinic.yearsActive} years of{" "}
              <span className="italic text-gold-dark">family trust.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/70 leading-relaxed max-w-xl">
              DentalNisaa Oral Care started with a simple idea: dental care
              should feel like visiting someone who knows you, not a queue
              number. {clinic.yearsActive} years later, that's still what
              brings families back — including ones who've been coming
              since childhood.
            </p>
          </Reveal>
          <Reveal delay={100} className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={REPRESENTATIVE_PHOTO}
                alt="Treatment room at DentalNisaa"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-4 left-4 bg-ink/80 text-porcelain text-[10px] uppercase tracking-wide px-2.5 py-1">
              Representative photo
            </span>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-porcelain-dim/50">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
              Our story
            </h2>
          </Reveal>
          <div className="space-y-6 max-w-3xl">
            {milestones.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 80}
                className="flex gap-6 border border-ink/10 bg-white/60 p-6"
              >
                <span className="shrink-0 font-display text-xl text-gold-dark w-20">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/60 leading-relaxed max-w-md">
                    {m.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE DOCTOR */}
      <DoctorSpotlight topDivider={false} />

      {/* WHY PATIENTS TRUST US */}
      <TrustStats />

      {/* CLINIC TOUR */}
      <ClinicTourPreview />

      {/* CARE PHILOSOPHY */}
      <Transparency topDivider />

      {/* VALUES (closing quote folded in below the grid) */}
      <OurValues />

      {/* FINAL CTA */}
      <FinalCTA />
    </>
  );
}
