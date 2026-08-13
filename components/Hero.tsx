"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import Icon from "./Icon";

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
      <section className="relative -mt-20 md:-mt-24 min-h-[100dvh] overflow-hidden bg-porcelain">
        {/* No scrim, no tint, no darkening — the photograph is shown exactly
            as shot. Legibility is bought with framing instead.

            Anchored right-top at every width, which pins the clinic's plain
            cream wall — the one genuinely quiet part of this photograph — to
            the top-right of the frame on any viewport, and that's where the
            type sits. Anchoring to the centre instead drops the subheading
            onto the green reception desk, where measured contrast against
            ink falls to 1.7:1 (4.5:1 is the readable threshold).

            The text column is deliberately narrow because that clean wall is
            only about a quarter of the frame wide. When the real entrance
            photograph is shot, compose it with one side left plain and this
            layout can open up without any other change. */}
        <Image
          src="/clinic/waiting-lounge.jpg"
          alt="The entrance and waiting lounge at DentalNisaa Oral Care, looking through to the reception desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top"
        />

        <div className="relative z-10 min-h-[100dvh] pt-24 md:pt-28 flex items-start justify-end px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-[23rem]"
          >
            <motion.h1
              variants={rise}
              className="font-display font-semibold text-ink text-[1.95rem] leading-[1.09] tracking-[-0.02em] sm:text-[2.2rem] lg:text-[2.5rem]"
            >
              The dentist Kadarenahalli{" "}
              <span className="text-gold-dark">grew up with.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-4 text-ink/80 text-[0.95rem] sm:text-base leading-relaxed font-medium"
            >
              Implants, cosmetic and family dentistry — all under one roof in
              Bengaluru, since {clinic.foundedYear}.
            </motion.p>

            <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3">
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

      {/* Proof sits on the page ground directly beneath the photograph, so
          nothing has to be laid over the image to carry it. */}
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
