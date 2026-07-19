"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { clinic } from "@/lib/site-data";

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
        <img
          src="https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?fm=jpg&q=80&w=1800&auto=format&fit=crop"
          alt="Calm, modern dental treatment room at DentalNisaa Oral Care"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* 40% dark overlay for legible white type, plus a gentle bottom
          gradient so the section below never fights the image edge. */}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="relative z-10 h-full flex items-center px-5 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-2xl pt-14 md:pt-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light mb-6"
          >
            Kadarenahalli, Bengaluru — Since {clinic.foundedYear}
          </motion.p>

          <h1 className="font-display text-porcelain text-[3.4rem] leading-[0.95] md:text-[6rem] md:leading-[0.92] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
              className="block"
            >
              Smiles that
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: "easeOut" }}
              className="block italic text-gold-light"
            >
              grow up here.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.56, ease: "easeOut" }}
            className="mt-7 text-porcelain/75 text-lg leading-relaxed max-w-md"
          >
            Modern family dentistry with compassionate care — trusted by
            grandparents, parents, and children alike, {clinic.yearsActive}
            {" "}years and counting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/booking"
              className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-7 py-3.5 font-semibold shadow-[0_18px_45px_rgba(0,0,0,0.25)] hover:bg-gold-light transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-porcelain/30 text-porcelain px-7 py-3.5 font-semibold hover:bg-porcelain/10 transition-colors"
            >
              Call Clinic
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-porcelain/80 text-sm"
          >
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span className="text-gold-light tracking-tight" aria-hidden>
                ★★★★★
              </span>
              {clinic.rating} Google Rating
            </span>
            <span className="h-1 w-1 rounded-full bg-porcelain/30" aria-hidden />
            <span>{clinic.reviewCount}+ Happy Patients</span>
            <span className="h-1 w-1 rounded-full bg-porcelain/30" aria-hidden />
            <span>Since {clinic.foundedYear}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
