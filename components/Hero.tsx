"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import { group, rise, still } from "@/lib/motion";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import SignatureMark from "./SignatureMark";
import Icon from "./Icon";

const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const v = reduceMotion ? still : rise;
  const container = group({ stagger: 0.1, delay: 0.05 });

  return (
    <section className="relative -mt-20 md:-mt-24 min-h-[100dvh] bg-porcelain flex items-center justify-center overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 pt-28 md:pt-32 pb-12 md:pb-16 text-center"
      >
        {/* Keyword line */}
        <motion.p
          variants={v}
          className="text-xs sm:text-sm font-semibold text-sage-deep uppercase tracking-[0.15em]"
        >
          Implants · Cosmetic · Family Dentistry
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={v}
          className="mt-5 md:mt-6 font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em] text-ink"
        >
          All under one roof.
        </motion.h1>

        {/* Context line */}
        <motion.p
          variants={v}
          className="mt-4 md:mt-5 text-sm sm:text-base text-ink/60 font-medium"
        >
          Kadarenahalli, Bengaluru · Since {clinic.foundedYear}
        </motion.p>

        {/* Decorative mark */}
        <motion.div variants={v} className="flex justify-center mt-8 md:mt-10">
          <SignatureMark
            className="w-20 h-20 md:w-24 md:h-24 text-sage"
            strokeOpacity={0.12}
          />
        </motion.div>

        {/* Proof band — desktop: three columns; mobile: compact row */}
        <motion.div variants={v} className="mt-8 md:mt-10">
          {/* Desktop proof band */}
          <dl className="hidden sm:grid grid-cols-3 divide-x divide-ink/10 max-w-lg mx-auto">
            <div className="px-4">
              <dd className="font-display text-2xl md:text-3xl text-ink leading-none tabular-nums">
                <AnimatedCounter value={clinic.rating} decimals={1} />
              </dd>
              <dd className="mt-2">
                <Stars
                  rating={clinic.rating}
                  className="w-3.5 h-3.5"
                  filled="text-sage-deep"
                />
              </dd>
              <dt className="mt-1.5 text-[0.68rem] uppercase tracking-wider text-ink/40">
                Google rating
              </dt>
            </div>

            <div className="px-4">
              <dd className="font-display text-2xl md:text-3xl text-ink leading-none tabular-nums">
                <AnimatedCounter value={totalReviews} grouped />
              </dd>
              <dt className="mt-2.5 text-[0.68rem] uppercase tracking-wider text-ink/40">
                Patient reviews
              </dt>
              <dd className="mt-1 text-[0.68rem] text-ink/35">
                {platformNames}
              </dd>
            </div>

            <div className="px-4">
              <dd className="font-display text-2xl md:text-3xl text-ink leading-none tabular-nums">
                {clinic.foundedYear}
              </dd>
              <dt className="mt-2.5 text-[0.68rem] uppercase tracking-wider text-ink/40">
                Caring since
              </dt>
            </div>
          </dl>

          {/* Mobile proof row */}
          <p className="sm:hidden text-sm font-semibold text-ink/70 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <AnimatedCounter value={clinic.rating} decimals={1} />
              <span className="text-sage-deep">★</span>
            </span>
            <span className="text-ink/20">·</span>
            <span>
              <AnimatedCounter value={totalReviews} grouped /> reviews
            </span>
            <span className="text-ink/20">·</span>
            <span>since {clinic.foundedYear}</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={v}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Magnetic pull={0.25}>
            <Link
              href="/booking"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-gold text-porcelain px-8 py-3.5 font-semibold hover:bg-gold-dark transition-colors shadow-[0_10px_30px_-12px_rgba(33,30,26,0.35)] w-full sm:w-auto"
            >
              Book Appointment
            </Link>
          </Magnetic>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-porcelain text-ink px-8 py-3.5 font-semibold hover:bg-white transition-colors border border-ink/10 shadow-[0_10px_30px_-12px_rgba(33,30,26,0.2)] w-full sm:w-auto"
          >
            Call Clinic
          </a>
        </motion.div>

        {/* Status + directions */}
        <motion.div
          variants={v}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-2"
        >
          <ClinicOpenStatus tone="light" />
          <a
            href={clinic.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-gold-dark transition-colors"
          >
            <Icon name="pin" className="w-4 h-4 shrink-0" />
            Kadarenahalli, Bengaluru
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
