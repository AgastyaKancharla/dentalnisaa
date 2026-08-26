"use client";

import { motion } from "framer-motion";
import { MOTION, group, rise } from "@/lib/motion";
import { trustPoints, clinic } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";
import AnimatedCounter from "./AnimatedCounter";
import Icon from "./Icon";

const points = [
  {
    icon: "scan",
    title: "Clear diagnosis",
    before: "We explain what we see and what it means, ",
    highlight: "before treatment begins",
    after: ".",
  },
  {
    icon: "droplet",
    title: "Comfort-first care",
    before: "Gentle techniques for ",
    highlight: "nervous patients and children",
    after: " alike.",
  },
  {
    icon: "calendar",
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

const container = group();
const fadeUp = rise;

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-ink text-porcelain relative overflow-hidden">
      {topDivider && <SectionSeam tone="dark" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={MOTION.viewport}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-gold-light uppercase tracking-[0.14em] mb-4">
            Our care philosophy
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-light text-4xl md:text-6xl leading-[1.03] text-porcelain">
            Clear advice.
            <br />
            <span className="italic text-gold-light">Calmer visits.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-porcelain/85 mt-8">
            <span>
              <AnimatedCounter value={clinic.yearsActive} suffix="+ years" /> in Kadarenahalli
            </span>
            <span className="text-gold/50" aria-hidden>·</span>
            <span>{facts[1].label}</span>
            <span className="text-gold/50" aria-hidden>·</span>
            <span>{facts[2].label} care</span>
          </motion.div>
        </motion.div>

        {/* Three tenets of how a visit is run — not a sequence a patient
            moves through, so no 01/02/03 numbering. Each reads as its own
            quiet card rather than a list item, echoing the icon-badge
            treatment on the Hero's stat cards just above this section. */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={MOTION.viewport}
          className="mt-16 md:mt-20 grid md:grid-cols-3 gap-5 md:gap-6"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="group rounded-[1.75rem] border border-porcelain/12 bg-porcelain/[0.04] p-6 sm:p-7 transition-colors duration-300 hover:bg-porcelain/[0.07] hover:border-gold/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-light transition-colors duration-300 group-hover:bg-gold/25">
                <Icon name={p.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl text-porcelain mt-5">{p.title}</h3>
              <p className="text-porcelain/75 leading-relaxed text-[0.95rem] mt-3">
                {p.before}
                <span className="font-semibold text-gold-light">{p.highlight}</span>
                {p.after}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
