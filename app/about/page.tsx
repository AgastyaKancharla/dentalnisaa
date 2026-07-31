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
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Our story
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              The same legacy,{" "}
              <span className="italic text-gold-dark">still going.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
            <Reveal
              delay={80}
              className="flex items-center gap-4 md:flex-col md:items-start md:gap-3"
            >
              <span className="font-display text-4xl md:text-5xl text-ink">
                {clinic.foundedYear}
              </span>
              <span
                className="h-px w-12 md:h-16 md:w-px bg-ink/20 shrink-0"
                aria-hidden
              />
              <span className="font-display text-4xl md:text-5xl italic text-gold-dark">
                Today
              </span>
            </Reveal>

            <Reveal delay={140} className="max-w-xl space-y-4">
              <p className="text-ink/75 leading-relaxed text-lg">
                DentalNisaa's legacy started in {clinic.foundedYear} — and
                it's the same legacy today, not a different clinic that
                happens to share a name. The same unhurried approach has
                treated grandparents, then their children, then their
                children's own kids, all from the same neighbourhood
                clinic.
              </p>
              <p className="text-ink/75 leading-relaxed text-lg">
                That continuity is carried forward today by Dr. Neha
                Kulsum, the clinic's proprietor — leading with the same
                values it was built on: clear explanations, gentle care,
                and treatment plans built around what a patient actually
                needs, not what's easiest to sell.
              </p>
            </Reveal>
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
