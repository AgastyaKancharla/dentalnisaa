"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import { group, rise, still } from "@/lib/motion";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import GlassTooth from "./GlassTooth";
import Tilt3D from "./Tilt3D";
import Icon from "./Icon";

const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");
const badgeText = `${totalReviews.toLocaleString("en-IN")}+ REVIEWS   ·   SINCE ${clinic.foundedYear}   ·   `;

// Deterministic layout for the ambient particles — computed once at module
// scope so it's stable across renders, never randomized per paint.
const DRIFTS = ["animate-particleDriftA", "animate-particleDriftB", "animate-particleDriftC"];
const PARTICLE_COLORS = ["#7C9483", "#C9A66B", "#8CA68A"];
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3) * 1.5,
  left: (i * 17 + 6) % 100,
  top: (i * 23 + 8) % 90,
  drift: DRIFTS[i % DRIFTS.length],
  duration: 18 + (i % 5) * 3,
  delay: (i * 1.3) % 6,
  opacity: 0.08 + (i % 4) * 0.03,
  color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
}));

// Hero-only entrance variants — richer than the sitewide `rise` because this
// plays once on load rather than on scroll like every other section, so a
// more cinematic reveal is appropriate here and nowhere else.
const heroBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroEyebrow: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.3em", y: 12 },
  show: {
    opacity: 1,
    letterSpacing: "0.15em",
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroCTA: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// `still` (from lib/motion.ts) only resets opacity/y/scale — it doesn't know
// about the extra `filter`/`letterSpacing` properties the hero-only variants
// above animate. Swapping straight to `still` under reduced motion leaves
// those properties frozen wherever they were interpolated to, so the
// headline can get stuck mid-blur. These local variants explicitly pin the
// hero-specific properties to their resting values too.
const heroBlurStill: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

const heroEyebrowStill: Variants = {
  hidden: { opacity: 1, y: 0, letterSpacing: "0.15em" },
  show: { opacity: 1, y: 0, letterSpacing: "0.15em" },
};

const heroTooth: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: -10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroToothStill: Variants = {
  hidden: { opacity: 1, scale: 1, y: 0 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const blurV = reduceMotion ? heroBlurStill : heroBlur;
  const eyebrowV = reduceMotion ? heroEyebrowStill : heroEyebrow;
  const fadeV = reduceMotion ? still : rise;
  const ctaV = reduceMotion ? still : heroCTA;
  const toothV = reduceMotion ? heroToothStill : heroTooth;
  const container = group({ stagger: 0.12, delay: 0.15 });

  return (
    <section className="relative -mt-20 md:-mt-24 min-h-[100dvh] bg-porcelain flex items-center justify-center overflow-hidden">
      {/* Layer 1 — animated gradient background: slow drifting color washes
          that give the flat porcelain ground depth. Reduced motion zeroes
          the animation durations globally, leaving static color washes. */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-[10%] right-[5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[80px] animate-orbDriftA"
          style={{ backgroundColor: "#7C9483", opacity: 0.15 }}
        />
        <div
          className="absolute bottom-[5%] -left-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full blur-[60px] md:blur-[80px] animate-orbDriftB"
          style={{ backgroundColor: "#C9A66B", opacity: 0.12 }}
        />
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full blur-[60px] md:blur-[80px] animate-orbPulse"
          style={{ backgroundColor: "#EDE4D2", opacity: 0.35 }}
        />
      </div>

      {/* Layer 5 — floating ambient particles, standing in for the drifting
          detail the reference photo carries with water droplets. */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            className={`absolute rounded-full ${p.drift}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating proof badge, the direct analog to the reference's
          circular "4800+ happy patients" mark, built from real review data. */}
      <div className="hidden sm:block absolute top-[10%] right-[6%] md:top-[14%] md:right-[9%] z-[2]">
        <Tilt3D maxDeg={8}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full animate-heroSpin text-ink/40">
              <defs>
                <path id="hero-badge-circle" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
              </defs>
              <text fontSize="8.2" letterSpacing="1.5" fill="currentColor" className="font-body">
                <textPath href="#hero-badge-circle" startOffset="0%">
                  {badgeText}
                </textPath>
              </text>
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl md:text-3xl text-ink leading-none">
                {clinic.rating.toFixed(1)}
              </span>
              <Stars rating={clinic.rating} className="w-2.5 h-2.5 mt-1.5" filled="text-sage-deep" />
            </div>
          </div>
        </Tilt3D>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 pt-24 md:pt-28 pb-12 md:pb-16 text-center"
      >
        {/* Glass tooth — hero centerpiece, echoing the reference's glossy 3D
            tooth using the site's own tooth silhouette (same path as the
            Icon component) built up from layered gradients rather than a
            literal photo or 3D render. Sits above the text in normal flow,
            not behind it, so ink-colored copy never has to fight a busy
            image for contrast — the failure mode every earlier photo-based
            hero hit. */}
        <motion.div
          variants={toothV}
          initial="hidden"
          animate="show"
          className="flex justify-center mb-6 md:mb-8"
        >
          <Tilt3D maxDeg={6} className="animate-toothFloat">
            <GlassTooth className="w-32 sm:w-44 md:w-56 lg:w-64 h-32 sm:h-44 md:h-56 lg:h-64 drop-shadow-[0_25px_35px_rgba(33,30,26,0.18)]" />
          </Tilt3D>
        </motion.div>

        {/* Keyword line */}
        <motion.p
          variants={eyebrowV}
          className="text-xs sm:text-sm font-semibold text-sage-deep uppercase tracking-[0.15em]"
        >
          Implants · Cosmetic · Family Dentistry
        </motion.p>

        {/* Headline — mixed-weight treatment: a small tracked label crossing
            into the large italic display line, echoing the reference's
            layered typography using only this site's own two fonts. */}
        <motion.h1 variants={blurV} className="mt-5 md:mt-6">
          <span className="block font-body text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] text-ink/50 font-semibold">
            All under
          </span>
          <span className="block font-display italic text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] text-ink mt-1">
            one roof.
          </span>
        </motion.h1>

        {/* Context line */}
        <motion.p
          variants={fadeV}
          className="mt-5 md:mt-6 text-sm sm:text-base text-ink/60 font-medium"
        >
          Kadarenahalli, Bengaluru · Since {clinic.foundedYear}
        </motion.p>

        {/* Proof band — desktop: three columns; mobile: compact row */}
        <motion.div variants={fadeV} className="mt-9 md:mt-11">
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
          variants={ctaV}
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
          variants={fadeV}
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
