"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { clinic, reviewPlatforms } from "@/lib/site-data";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import ClinicOpenStatus from "./ClinicOpenStatus";
import AnimatedCounter from "./AnimatedCounter";
import SignatureMark from "./SignatureMark";
import Magnetic from "./Magnetic";
import Stars from "./Stars";
import Icon from "./Icon";

// Every review the clinic can actually point at — 195 Google + 357 Practo +
// 579 Justdial. Computed, never hardcoded, so it stays true as counts move.
const totalReviews = reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
const platformNames = reviewPlatforms.map((p) => p.name).join(" · ");

export default function Hero() {
  return (
    <section className="relative bg-porcelain overflow-hidden -mt-20 md:-mt-24 pt-20 md:pt-24">
      <SignatureMark
        className="pointer-events-none absolute -right-24 -top-6 w-[34rem] h-[34rem] text-sage/[0.07] hidden lg:block"
        strokeOpacity={0.5}
      />

      <ContainerScroll
        className="h-[52rem] md:h-[68rem] px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 pt-8 md:pt-12"
        titleComponent={
          <div className="mx-auto max-w-3xl text-center pb-10 md:pb-14">
            {/* "Dentist" + "Kadarenahalli" is the exact phrase local search
                uses, so the shortest punchy line available is also the
                strongest one for SEO. It isn't a slogan invented for the
                page either — the clinic has run since 1995 and its own
                copy already describes patients who've been coming since
                childhood, which is precisely what this claims. */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold text-ink text-[2.15rem] leading-[1.08] tracking-[-0.022em] sm:text-5xl lg:text-[3.6rem] text-balance"
            >
              The dentist Kadarenahalli{" "}
              <span className="text-gold-dark">grew up with.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed mx-auto max-w-xl"
            >
              Implants, cosmetic and family dentistry — all under one roof in
              Bengaluru, since {clinic.foundedYear}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
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
        }
      >
        {/* The waiting lounge shot looks down the room toward reception, so
            as the panel rotates flat the view opens up ahead of you — the
            reason this particular photograph carries the effect. */}
        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full">
          <Image
            src="/clinic/waiting-lounge.jpg"
            alt="Looking through the waiting lounge at DentalNisaa Oral Care toward the reception desk and treatment room"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
        </div>
      </ContainerScroll>

      {/* Proof lands as you finish stepping in. */}
      <div className="px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24 pb-16 md:pb-20 -mt-4 md:-mt-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-px bg-ink/15" aria-hidden />

          <dl className="grid grid-cols-3 divide-x divide-ink/10">
            <div className="pr-2 sm:px-4 first:pl-0 pt-5">
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
  );
}
