"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    more: "Every visit starts with a proper look — a visual exam and, where needed, digital X-rays — before any treatment is suggested. You'll see what we see and understand why it matters, so you're deciding alongside us, not being told what happens next.",
  },
  {
    icon: "droplet",
    title: "Comfort-first care",
    before: "Gentle techniques for ",
    highlight: "nervous patients and children",
    after: " alike.",
    more: "How a visit is paced adapts to who's in the chair — a first-time child, a longtime patient, or someone who's simply nervous about being here. Tell us what worries you, and the appointment adjusts around it, not the other way round.",
  },
  {
    icon: "calendar",
    title: "Long-term planning",
    before: "From check-ups to implants, we plan around ",
    highlight: "lasting oral health",
    after: ".",
    more: "A filling, an implant, or a routine check-up is never treated as an isolated fix. Each visit factors in what's likely to matter years from now, so today's treatment sets up tomorrow's — with the same clinic and the same records the whole way through.",
  },
];

// The rating already leads the Hero — repeating it here would be the same
// redundancy problem again. Only the non-rating facts (years, painless
// care, multi-generational) carry over.
const facts = [trustPoints[0], trustPoints[2], trustPoints[3]];

const container = group();
const fadeUp = rise;

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            moves through, so no 01/02/03 numbering. Each is a clickable
            card that expands in place for the fuller explanation, echoing
            the icon-badge treatment on the Hero's stat cards above. */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={MOTION.viewport}
          className="mt-16 md:mt-20 grid md:grid-cols-3 gap-5 md:gap-6 items-start"
        >
          {points.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={p.title} variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="focus-ring group w-full text-left rounded-[1.75rem] border border-porcelain/12 bg-porcelain/[0.04] p-6 sm:p-7 transition-colors duration-300 hover:bg-porcelain/[0.07] hover:border-gold/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-light transition-colors duration-300 group-hover:bg-gold/25">
                      <Icon name={p.icon} className="w-5 h-5" />
                    </div>
                    <Icon
                      name="chevron"
                      className={`w-4 h-4 mt-3 shrink-0 text-porcelain/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <h3 className="font-display text-2xl text-porcelain mt-5">{p.title}</h3>
                  <p className="text-porcelain/75 leading-relaxed text-[0.95rem] mt-3">
                    {p.before}
                    <span className="font-semibold text-gold-light">{p.highlight}</span>
                    {p.after}
                  </p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-porcelain/60 leading-relaxed text-[0.9rem] mt-4 pt-4 border-t border-porcelain/10">
                          {p.more}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
