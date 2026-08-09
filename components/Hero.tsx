"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import ClinicOpenStatus from "./ClinicOpenStatus";
import Icon, { GoogleGIcon } from "./Icon";

// Every review the clinic can actually point at, not just the Google
// subset — the three platforms in reviewPlatforms are all independently
// verifiable, and 1,100+ is a far stronger opening number than 195.
// Rounded down to the nearest hundred so the headline figure stays true
// as counts drift upward between deploys.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const roundedReviews = Math.floor(totalReviews / 100) * 100;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax: background drifts slower than scroll, image scales
  // slightly so no edge gap ever appears while it translates.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative -mt-20 md:-mt-24 min-h-[100dvh] overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* A real photograph of the clinic's own waiting lounge — not a
            stock interior. The alt text describes what is actually in
            frame, which the previous stock hero did not. */}
        <Image
          src="/clinic/waiting-lounge.jpg"
          alt="The waiting lounge at DentalNisaa Oral Care, looking through to the reception desk and treatment room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.06] contrast-[1.02] saturate-[1.05]"
        />
      </motion.div>

      {/* The photo is an evening interior — warmer and busier than a studio
          shot — so legibility is solved structurally rather than by
          darkening it: the text sits inside a genuine frosted-glass panel
          (translucent porcelain + blur) that lightens whatever falls behind
          it. A soft scrim along the left edge only deepens the ground the
          panel sits on; the photo itself stays bright and uncovered on the
          right where there's no text. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/35 via-ink/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 min-h-[100dvh] flex items-center px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full md:max-w-xl overflow-hidden rounded-3xl border border-porcelain/30 bg-porcelain/[0.86] backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(33,30,26,0.45)] px-6 py-7 sm:px-9 sm:py-9 md:px-10 md:py-10"
        >
          {/* A thin light-catching line along the top edge — a standard
              glass-panel cue that reinforces the translucent quality
              without adding any dark shading. */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-porcelain to-transparent opacity-70"
            aria-hidden
          />

          {/* Line 1 — who vouches for this clinic, across every platform. */}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-dark">
            <GoogleGIcon className="w-4 h-4 shrink-0" />
            <span>{clinic.rating}★</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{roundedReviews.toLocaleString("en-IN")}+ reviews</span>
            <span className="font-normal normal-case tracking-normal text-ink/50">
              on Google, Practo &amp; Justdial
            </span>
          </p>

          <h1 className="mt-5 text-ink text-balance">
            <span className="block font-display font-bold uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl leading-[1.12]">
              Implants, Cosmetic &amp; Family Dentistry
            </span>
            <span className="block font-display font-bold italic text-gold-dark text-3xl sm:text-4xl md:text-5xl leading-tight mt-1.5">
              — All Under One Roof
            </span>
          </h1>

          <p className="mt-4 text-ink/70 font-medium text-base sm:text-lg leading-relaxed">
            Caring for families in Kadarenahalli since {clinic.foundedYear} —
            led by Dr. Neha Kulsum for the last {clinic.yearsActive} years.
          </p>

          {/* Line 2 — the two things someone standing outside actually
              needs: is it open, and where is it. Both live/actionable
              rather than decorative. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-ink/10 pt-5">
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

          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <Link
              href="/booking"
              className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-6 py-3.5 font-semibold hover:bg-gold-light transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink/20 text-ink px-6 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
            >
              Call Clinic
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
