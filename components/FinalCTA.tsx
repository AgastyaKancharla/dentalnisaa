"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clinic } from "@/lib/site-data";

// This section's animation signature: a thin rule expands outward from
// the center first, like a curtain-call flourish marking "this is the
// close" -- then the heading, subtext, and buttons settle in afterward,
// each a beat behind the last. Distinct from every other section's
// entrance, and reserved for the page's final word on purpose.
const rule = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.45 } },
};

export default function FinalCTA() {
  return (
    <section className="bg-mist-soft">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
        className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-24 text-center"
      >
        <motion.div
          variants={rule}
          className="w-16 h-px bg-gold-dark/50 mx-auto mb-8 origin-center"
        />
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl text-ink max-w-2xl mx-auto leading-tight"
        >
          Your next appointment could be the start of{" "}
          <span className="italic text-gold-dark">{clinic.yearsActive}+ more years</span> of
          trusted care.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-ink/60">
          Kadarenahalli, Bengaluru · {clinic.phone}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-teal-dark transition-colors"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center rounded-full bg-sand text-ink px-7 py-3.5 font-semibold hover:bg-sand-light transition-colors"
          >
            Call the clinic
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
