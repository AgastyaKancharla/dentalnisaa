"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import AnimatedCounter from "./AnimatedCounter";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import Icon from "./Icon";

// Every review the clinic can actually point at — 195 Google + 357 Practo +
// 579 Justdial. Computed, never hardcoded, so it stays true as counts move.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <>
      {/* Full-bleed photograph with a deliberate gradient scrim, rather than
          depending on where a clean patch of wall happens to fall in the
          shot. A scrim bought with a gradient (not a flat tint) keeps the
          top of the frame true to the photograph while guaranteeing >7:1
          contrast wherever the headline lands — measured, not eyeballed —
          and it means the composition survives whatever photo replaces
          this one later. */}
      {/* svh, not dvh: dvh live-recalculates as the mobile browser's address
          bar collapses/expands during scroll, which visibly reflows this
          bottom-anchored, negative-margin-overlapped section on every scroll
          frame. svh is fixed to the smallest (chrome-visible) viewport, so
          it never changes mid-scroll. */}
      <section className="relative -mt-20 md:-mt-24 min-h-[100svh] overflow-hidden bg-ink">
        <Image
          src="/clinic/waiting-lounge.jpg"
          alt="The entrance and waiting lounge at DentalNisaa Oral Care, looking through to the reception desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,38,26,0.15) 0%, rgba(18,38,26,0.15) 30%, rgba(18,38,26,0.78) 70%, rgba(18,38,26,0.96) 100%)",
          }}
        />

        <div className="relative z-10 min-h-[100svh] flex flex-col justify-end pt-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 pb-24 sm:pb-28 md:pb-32 max-w-4xl"
          >
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2 text-gold-light text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] mb-5 md:mb-7"
            >
              Kadarenahalli, Bengaluru · Est. {clinic.foundedYear}
            </motion.p>

            <motion.h1
              variants={rise}
              className="font-display font-light text-porcelain leading-[0.98] tracking-[-0.01em] text-[2.75rem] sm:text-[3.75rem] md:text-[5.25rem] lg:text-[6.25rem]"
            >
              The dentist Kadarenahalli
              <br />
              <span className="italic font-normal text-gold-light">grew up with.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 md:mt-8 text-porcelain/90 text-base sm:text-lg leading-relaxed font-medium max-w-md"
            >
              Implants, cosmetic and family dentistry — all under one roof,
              caring for the same Bengaluru families for {clinic.yearsActive}+
              years.
            </motion.p>

            <motion.div variants={rise} className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
              <Magnetic pull={0.25}>
                <Link
                  href="/booking"
                  className="focus-ring inline-flex items-center rounded-full bg-gold text-ink-soft px-8 py-4 font-semibold hover:bg-gold-light transition-colors shadow-[0_16px_40px_-14px_rgba(0,0,0,0.6)]"
                >
                  Book Appointment
                </Link>
              </Magnetic>
              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-porcelain/35 text-porcelain px-8 py-4 font-semibold hover:bg-porcelain/10 transition-colors"
              >
                <Icon name="phone" className="w-4 h-4" />
                Call Clinic
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The credential shelf: proof, in three cards, elevated on the
          near-solid ink of the scrim so the shadow reads as genuine lift
          rather than a seam the cards got pushed against. */}
      <section className="bg-porcelain relative">
        <div className="px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-5xl -mt-20 sm:-mt-24 md:-mt-28 relative z-10 grid grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: "sparkle",
                value: <AnimatedCounter value={clinic.rating} decimals={1} />,
                label: "Google rating",
                sub: <Stars rating={clinic.rating} className="w-3.5 h-3.5" filled="text-gold" />,
              },
              {
                icon: "chat",
                value: <AnimatedCounter value={totalReviews} grouped />,
                label: "Patient reviews",
                sub: <span className="text-[0.65rem] sm:text-xs text-ink/70">{platformNames}</span>,
              },
              {
                icon: "calendar",
                value: clinic.foundedYear,
                label: "Caring since",
                sub: (
                  <span className="text-[0.65rem] sm:text-xs text-ink/70">
                    {clinic.yearsActive}+ years running
                  </span>
                ),
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-[1.75rem] bg-porcelain border border-ink/8 shadow-[0_24px_60px_-24px_rgba(15,64,44,0.4)] px-3 sm:px-6 pt-6 sm:pt-9 pb-5 sm:pb-7 text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto mb-2.5 sm:mb-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-sage-pale text-sage-deep">
                  <Icon name={card.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <dd className="font-display text-xl sm:text-3xl md:text-4xl text-ink leading-none tabular-nums">
                  {card.value}
                </dd>
                <dt className="mt-2.5 sm:mt-3 text-[0.6rem] sm:text-xs uppercase tracking-wider text-ink/70 font-semibold">
                  {card.label}
                </dt>
                <div className="mt-1.5 sm:mt-2 leading-snug">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-10 md:h-16" />
      </section>
    </>
  );
}
