// ============================================================================
// One motion vocabulary for the whole site.
// ----------------------------------------------------------------------------
// Before this existed, sections animated with whatever numbers each was
// written with: stagger steps of 40, 60, 70, 80 and 90ms, one-off delays of
// 40/60/70/80/100/140/200ms, durations of 0.35/0.4/0.5/0.6/0.7s, and two
// different engines — a CSS `ease-out` transition in Reveal alongside
// framer-motion's [0.22, 1, 0.36, 1] elsewhere. Two sections entering the
// viewport therefore moved at visibly different speeds along different
// curves, which is what made the page feel unsynchronised.
//
// Everything now derives from the constants below. Change a value here and
// the entire site re-times together.
// ============================================================================

export const MOTION = {
  /** Every entrance takes exactly this long. */
  duration: 0.7,
  /** A single easing curve sitewide — fast out of the gate, long settle. */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** How far an element travels on its way in. */
  distance: 22,
  /** Gap between consecutive items in a staggered group. */
  stagger: 0.08,
  /** How much of an element must be visible before it starts. Uniform, so
   *  two sections scrolled into view at the same rate begin at the same
   *  point rather than at 0.15 in one place and 0.3 in another. */
  viewport: { once: true, amount: 0.25 } as const,
};

/**
 * The grammar every section follows: eyebrow, then heading, then lead
 * paragraph, then media or grid items — each one `MOTION.stagger` behind the
 * last. Because the order and interval never change, different sections read
 * as the same gesture repeating rather than as unrelated effects.
 */
export const group = (options?: { stagger?: number; delay?: number }) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: options?.stagger ?? MOTION.stagger,
      delayChildren: options?.delay ?? 0,
    },
  },
});

/** Text and general content: rise and fade. */
export const rise = {
  hidden: { opacity: 0, y: MOTION.distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration, ease: MOTION.ease },
  },
};

/**
 * Photographs settle rather than slide — a slight scale-down as they fade in,
 * so an image looks like it's coming to rest in its frame. Paired with
 * `overflow-hidden` on the frame this reads as the crop easing outward.
 */
export const media = {
  hidden: { opacity: 0, scale: 1.06, y: MOTION.distance * 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: MOTION.duration * 1.15, ease: MOTION.ease },
  },
};

/** Static variants for anyone who opts out of motion: no transform at all. */
export const still = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
};
