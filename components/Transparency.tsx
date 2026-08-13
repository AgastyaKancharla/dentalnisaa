"use client";

import { motion } from "framer-motion";
import { MOTION, group, rise } from "@/lib/motion";
import { trustPoints, clinic } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";
import AnimatedCounter from "./AnimatedCounter";

const points = [
  {
    title: "Clear diagnosis",
    before: "We explain what we see and what it means, ",
    highlight: "before treatment begins",
    after: ".",
  },
  {
    title: "Comfort-first care",
    before: "Gentle techniques for ",
    highlight: "nervous patients and children",
    after: " alike.",
  },
  {
    title: "Long-term planning",
    before: "From check-ups to implants, we plan around ",
    highlight: "lasting oral health",
    after: ".",
  },
];

// The rating already leads the Hero — repeating it here would be the same
// redundancy problem again. Only the non-rating facts (years, painless
// care, multi-generational) carry over.
const facts = [trustPoints[0], trustPoints[2], trustPoints[3]];

// Timings now come from lib/motion, so this section moves at exactly the
// same speed and on the same curve as every other one. It previously
// carried four bespoke variant sets — including a spring nothing else on
// the site used — which is why it read as its own effect rather than as
// part of one continuous sequence.
const container = group();
const fadeUp = rise;
const pointNumber = rise;
const pointText = rise;

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-beige-deep text-ink relative overflow-hidden">
      {topDivider && <SectionSeam tone="light" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={MOTION.viewport}
          className="relative"
        >
          <SignatureMark className="w-20 h-20 text-sage absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />

          <motion.p variants={fadeUp} className="text-sm font-semibold text-sage-deep uppercase tracking-wide mb-3">
            Our care philosophy
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl leading-[1.05] text-ink">
            Clear advice.
            <br />
            Calmer visits.
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-ink/70 mt-7">
            <span>
              <AnimatedCounter value={clinic.yearsActive} suffix="+ years" /> in Kadarenahalli
            </span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[1].label}</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[2].label} care</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={MOTION.viewport}
          className="space-y-6 md:space-y-8"
        >
          {points.map((p, i) => (
            <div key={p.title} className="flex gap-5 border-b border-ink/10 pb-6 last:border-b-0">
              <motion.span variants={pointNumber} className="font-display text-2xl text-sage-deep shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <motion.div variants={pointText}>
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="text-ink/65 leading-relaxed text-sm mt-1.5 max-w-sm">
                  {p.before}
                  <span className="font-semibold text-sage-deep">{p.highlight}</span>
                  {p.after}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      <SectionSeam tone="light" />
    </section>
  );
}
