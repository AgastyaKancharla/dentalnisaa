"use client";

import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION, group, rise, media, still } from "@/lib/motion";

// Inside a RevealGroup the children must not each start their own timer —
// the group drives them so they cascade in order. Outside one, a Reveal
// triggers on its own as it scrolls into view. Same visual language either
// way, because both read from lib/motion.
const InGroup = createContext(false);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds, kept from the original API so existing call sites work. */
  delay?: number;
  /** "media" gives photographs the settle-in treatment instead of a slide. */
  variant?: "text" | "media";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "text",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const inGroup = useContext(InGroup);

  const animated = variant === "media" ? media : rise;

  // Bake any explicit delay into the variant rather than passing a separate
  // transition prop, so it composes correctly with the shared timing.
  const variants = reduceMotion
    ? still
    : delay
    ? {
        hidden: animated.hidden,
        show: {
          ...animated.show,
          transition: { ...animated.show.transition, delay: delay / 1000 },
        },
      }
    : animated;

  if (inGroup) {
    return (
      <motion.div variants={variants} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={MOTION.viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a run of Reveals so they enter one after another on a fixed interval,
 * instead of each being hand-delayed with an arbitrary `i * 60`-style number.
 * The cascade is what makes a section read as one movement.
 */
export function RevealGroup({
  children,
  className = "",
  stagger,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <InGroup.Provider value={true}>
      <motion.div
        variants={reduceMotion ? still : group({ stagger, delay })}
        initial="hidden"
        whileInView="show"
        viewport={MOTION.viewport}
        className={className}
      >
        {children}
      </motion.div>
    </InGroup.Provider>
  );
}
