"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { clinic } from "@/lib/site-data";
import { GoogleGIcon } from "./Icon";

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
        <Image
          src="https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?fm=jpg&q=80&w=1800&auto=format&fit=crop"
          alt="Calm, modern dental treatment room at DentalNisaa Oral Care"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110 contrast-105 saturate-125"
        />
      </motion.div>

      {/* No overlay on the photo itself — it stays fully bright everywhere.
          Legibility is solved structurally instead: the text sits inside a
          genuine frosted-glass panel (translucent porcelain + blur), not
          floating directly on the image. This guarantees contrast no
          matter how bright or busy the photo is, without darkening
          anything or relying on drop-shadows. */}

      <div className="relative z-10 min-h-[100dvh] flex items-center px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full md:max-w-xl overflow-hidden rounded-3xl border border-porcelain/25 bg-porcelain/28 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(33,30,26,0.3)] px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-11"
        >
          {/* A thin light-catching line along the top edge — a standard
              glass-panel cue that reinforces the translucent quality
              without adding any dark shading. */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-porcelain to-transparent opacity-70"
            aria-hidden
          />
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark mb-4">
            <GoogleGIcon className="w-4 h-4" />
            {clinic.rating} · {clinic.reviewCount}+ Google Reviews
          </p>

          <h1 className="text-ink">
            <span className="block font-display font-bold uppercase tracking-wide text-2xl sm:text-3xl md:text-4xl leading-snug">
              Implants, Cosmetic &amp; Family Dentistry
            </span>
            <span className="block font-display font-bold italic text-gold-dark text-3xl sm:text-4xl md:text-5xl leading-tight mt-1.5">
              — All Under One Roof
            </span>
          </h1>

          <p className="mt-5 text-ink/70 font-medium text-base sm:text-lg leading-relaxed">
            {clinic.yearsActive}+ years caring for families in Kadarenahalli, Bengaluru.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
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
