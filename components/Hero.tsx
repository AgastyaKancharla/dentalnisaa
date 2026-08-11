"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import SignatureMark from "./SignatureMark";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import Icon from "./Icon";

// Every review the clinic can actually point at — 195 Google + 357 Practo +
// 579 Justdial. Computed, never hardcoded, so it stays true as the counts move.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");

// One orchestrated entrance rather than each element fading in on its own
// timer: the eye follows a single sequence down the composition.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// The rule draws across rather than fading — it's the one gesture that
// signals "this is a composition", not a stack of blocks.
const draw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // With motion suppressed the whole sequence resolves to its final state
  // immediately — no element is left mid-transform or invisible.
  const motionProps = reduceMotion
    ? { initial: "show" as const, animate: "show" as const }
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section className="relative bg-porcelain overflow-hidden -mt-20 md:-mt-24 pt-20 md:pt-24">
      {/* Brand mark, oversized and bled off the right edge at very low
          opacity — texture on the ground rather than a decorative badge. */}
      <SignatureMark
        className="pointer-events-none absolute -right-24 -top-10 w-[34rem] h-[34rem] text-sage/[0.07] hidden lg:block"
        strokeOpacity={0.5}
      />

      <motion.div
        variants={container}
        {...motionProps}
        className="relative px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 pt-10 pb-16 md:pt-14 md:pb-20 lg:min-h-[calc(100dvh-6rem)] grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 xl:gap-20 items-center"
      >
        {/* ── Left: the argument ─────────────────────────────────── */}
        <div className="max-w-2xl">
          <h1 className="text-ink">
            <motion.span
              variants={rise}
              className="block font-body text-[0.78rem] sm:text-sm font-semibold uppercase tracking-[0.2em] text-sage-deep"
            >
              Implants, cosmetic &amp; family dentistry
            </motion.span>
            <motion.span
              variants={rise}
              className="block font-display font-semibold text-[2.9rem] leading-[0.98] tracking-[-0.02em] mt-4 sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem] text-balance"
            >
              All under
              <br />
              one roof.
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-6 text-ink/70 text-base sm:text-lg leading-relaxed max-w-lg"
          >
            Caring for families in Kadarenahalli since {clinic.foundedYear} —
            led by Dr. Neha Kulsum for the last {clinic.yearsActive} years.
          </motion.p>

          {/* ── The proof band ───────────────────────────────────── */}
          <motion.div
            variants={draw}
            style={{ originX: 0 }}
            className="mt-9 h-px bg-ink/15"
            aria-hidden
          />

          <motion.dl
            variants={rise}
            className="grid grid-cols-3 divide-x divide-ink/10 -mx-1"
          >
            <div className="px-1 sm:px-4 first:pl-1 pt-5">
              <dd className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums">
                <AnimatedCounter value={clinic.rating} decimals={1} />
              </dd>
              <Stars
                rating={clinic.rating}
                className="w-3.5 h-3.5 mt-2"
                filled="text-sage-deep"
              />
              <dt className="mt-1.5 text-[0.68rem] sm:text-xs uppercase tracking-wider text-ink/45">
                Average rating
              </dt>
            </div>

            <div className="px-2 sm:px-4 pt-5">
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

            <div className="px-2 sm:px-4 pt-5">
              <dd className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-none tabular-nums">
                {clinic.foundedYear}
              </dd>
              <dt className="mt-2.5 text-[0.68rem] sm:text-xs uppercase tracking-wider text-ink/45">
                Caring since
              </dt>
            </div>
          </motion.dl>

          {/* ── Live state + place ───────────────────────────────── */}
          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5"
          >
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
          </motion.div>

          <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3.5">
            <Magnetic pull={0.25}>
              <Link
                href="/booking"
                className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-7 py-3.5 font-semibold hover:bg-gold-light transition-colors"
              >
                Book Appointment
              </Link>
            </Magnetic>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink/15 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
            >
              Call Clinic
            </a>
          </motion.div>
        </div>

        {/* ── Right: the counterweight ───────────────────────────── */}
        <motion.div
          variants={rise}
          className="relative lg:mt-10 xl:mt-12 max-w-sm w-full mx-auto lg:mx-0 lg:ml-auto lg:max-w-none"
        >
          {/* Height is capped against the viewport on large screens so the
              frame and its caption plate always land inside the fold —
              a fixed aspect ratio here runs the portrait off the bottom
              on shorter laptop displays. */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[min(60vh,32rem)] overflow-hidden rounded-sm border border-ink/10 bg-mist-soft">
            <Image
              src="/doctor-neha.jpg"
              alt="Dr. Neha Kulsum, proprietor and dental surgeon at DentalNisaa Oral Care"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-top"
            />
          </div>

          {/* Caption plate overlapping the frame's corner — the detail that
              makes this read as composed rather than a photo in a box. */}
          <div className="absolute -bottom-4 left-4 sm:left-6 bg-porcelain border border-ink/10 shadow-[0_12px_32px_-12px_rgba(33,30,26,0.28)] px-4 py-3">
            <p className="font-display text-base sm:text-lg text-ink leading-none">
              Dr. Neha Kulsum
            </p>
            <p className="mt-1.5 text-[0.68rem] uppercase tracking-wider text-ink/45">
              Proprietor · Dental Surgeon
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
