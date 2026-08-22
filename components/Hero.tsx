"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import Icon from "./Icon";
import DentalChairIllustration from "./DentalChairIllustration";

// Every review the clinic can actually point at — 195 Google + 357 Practo +
// 579 Justdial. Computed, never hardcoded, so it stays true as counts move.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function Hero() {
  return (
    <>
      <section className="relative -mt-20 md:-mt-24 pt-24 md:pt-28 overflow-hidden bg-gradient-to-b from-porcelain via-porcelain to-beige-deep">
        <div className="relative z-10 flex flex-col items-center px-5 sm:px-8 pt-8 sm:pt-12 md:pt-16 pb-14 md:pb-20 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col items-center"
          >
            {/* The hero's visual: an original line illustration of a premium
                exam chair, not a photograph, so it needs no "Representative
                photo" disclosure — see DentalChairIllustration.tsx. It sits
                above the headline, and its own soft glow doubles as the
                warm wash the type below needs for contrast against the page. */}
            <motion.div
              variants={rise}
              className="w-[15rem] sm:w-[19rem] md:w-[23rem] lg:w-[26rem] -mb-4 sm:-mb-6"
            >
              <DentalChairIllustration />
            </motion.div>

            <motion.p
              variants={rise}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-gold-dark"
            >
              Bengaluru's family dental clinic
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-3 max-w-xl font-display font-semibold text-ink text-[2rem] leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3rem]"
            >
              The dentist Kadarenahalli{" "}
              <span className="text-gold-dark">grew up with.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-4 max-w-md text-ink/70 text-[0.95rem] sm:text-base leading-relaxed font-medium"
            >
              Implants, cosmetic and family dentistry — all under one roof in
              Bengaluru, since {clinic.foundedYear}.
            </motion.p>

            <motion.div variants={rise} className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Magnetic pull={0.25}>
                <Link
                  href="/booking"
                  className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-7 py-3.5 font-semibold hover:bg-gold-light transition-colors shadow-[0_10px_30px_-12px_rgba(33,30,26,0.5)]"
                >
                  Book Appointment
                </Link>
              </Magnetic>
              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-porcelain text-ink px-7 py-3.5 font-semibold hover:bg-white transition-colors border border-ink/10 shadow-[0_10px_30px_-12px_rgba(33,30,26,0.4)]"
              >
                Call Clinic
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Proof sits on the page ground directly beneath the hero, carrying
          the open-now status and directions link that used to overlay the
          photograph. */}
      <section className="bg-porcelain">
        <div className="px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <dl className="grid grid-cols-3 divide-x divide-ink/10">
              <div className="pr-2 sm:px-4 first:pl-0">
                <dd className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums">
                  <AnimatedCounter value={clinic.rating} decimals={1} />
                </dd>
                <Stars
                  rating={clinic.rating}
                  className="w-3.5 h-3.5 mt-2"
                  filled="text-sage-deep"
                />
                <dt className="mt-1.5 text-[0.68rem] sm:text-xs uppercase tracking-wider text-ink/45">
                  Google rating
                </dt>
              </div>

              <div className="px-2 sm:px-4">
                <dd className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums">
                  <AnimatedCounter value={totalReviews} grouped />
                </dd>
                <dt className="mt-2.5 text-[0.68rem] sm:text-xs uppercase tracking-wider text-ink/45">
                  Patient reviews
                </dt>
                <dd className="mt-1 text-[0.68rem] sm:text-xs text-ink/40">
                  {platformNames}
                </dd>
              </div>

              <div className="px-2 sm:px-4">
                <dd className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums">
                  {clinic.foundedYear}
                </dd>
                <dt className="mt-2.5 text-[0.68rem] sm:text-xs uppercase tracking-wider text-ink/45">
                  Caring since
                </dt>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <ClinicOpenStatus tone="light" />
              <a
                href={clinic.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 hover:text-gold-dark transition-colors"
              >
                <Icon name="pin" className="w-4 h-4 shrink-0" />
                Kadarenahalli, Bengaluru
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
