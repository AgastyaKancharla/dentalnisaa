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
    <section ref={ref} className="relative -mt-14 md:-mt-16 h-[100dvh] min-h-[560px] overflow-hidden bg-ink">
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

      {/* No dark overlay of any kind — the photo stays fully bright. Text
          legibility now comes entirely from weight and scale (bold/black
          weights, larger sizes) rather than darkening the image or
          shadowing the type. */}

      <div className="relative z-10 h-full flex items-end md:items-center justify-center px-5 md:px-10 lg:px-16 xl:px-24 pb-16 md:pb-0">
        <div className="max-w-2xl pt-14 md:pt-16 text-center mx-auto flex flex-col items-center">
          <h1 className="text-porcelain">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="block font-display font-bold text-gold-light text-5xl md:text-7xl leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
            >
              Specialists,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="block font-display font-bold uppercase tracking-wide text-3xl md:text-5xl leading-snug mt-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
            >
              implants, cosmetic &amp; family dentistry under one roof
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.56, ease: "easeOut" }}
            className="mt-7 text-porcelain font-semibold text-xl leading-relaxed max-w-md [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
          >
            {clinic.tagline}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/booking"
              className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-7 py-3.5 font-semibold shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:bg-gold-light transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-porcelain/70 text-porcelain px-7 py-3.5 font-semibold hover:bg-porcelain/10 transition-colors"
            >
              Call Clinic
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-porcelain font-semibold text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
          >
            <span className="inline-flex items-center gap-2 font-semibold">
              <GoogleGIcon className="w-4 h-4" />
              {clinic.rating} Google Rating
            </span>
            <span className="h-1 w-1 rounded-full bg-porcelain/30" aria-hidden />
            <span>{clinic.reviewCount}+ Google Reviews</span>
            <span className="h-1 w-1 rounded-full bg-porcelain/30" aria-hidden />
            <span>Since {clinic.foundedYear}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
