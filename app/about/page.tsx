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

// A real photograph of the clinic's own consultation room, the same one
// used in the gallery — it replaced a stock interior here, so there's no
// "representative photo" disclosure to make any more.
const CLINIC_PHOTO = "/clinic/consultation-room.jpg";

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
          <Reveal delay={90} variant="media" className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CLINIC_PHOTO}
                alt="The consultation room at DentalNisaa Oral Care, with the treatment room visible through the glass partition"
                className="w-full h-full object-cover"
              />
            </div>
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
              delay={90}
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

            <div className="max-w-xl space-y-8">
              <Reveal delay={180}>
                <p className="text-ink/75 leading-relaxed text-lg">
                  DentalNisaa isn't a new clinic that happens to share an
                  old name — it's the same one. Three generations of the
                  same Kadarenahalli families have sat in this chair:
                  grandparents, then their children, now their children's
                  own kids.
                </p>
              </Reveal>

              {/* Set apart from the paragraph above rather than following
                  it as more running prose — a border-and-indent treatment
                  reads as a distinct idea (the clinic's values today) worth
                  pausing on, not another sentence to skim past. */}
              <Reveal delay={270}>
                <p className="border-l-2 border-gold pl-6 font-display italic text-xl md:text-2xl leading-snug text-ink">
                  Led today by Dr. Neha Kulsum, the clinic's proprietor —
                  with the same values it was built on: clear
                  explanations, gentle care, and a plan built around what
                  you need, not what's easiest to sell.
                </p>
              </Reveal>
            </div>
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
