"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MOTION } from "@/lib/motion";

type Burst = {
  id: number;
  x: number;
  y: number;
  particles: {
    angle: number;
    distance: number;
    size: number;
    color: string;
    blur: number;
    delay: number;
  }[];
};

const PARTICLE_COLORS = ["#D1A057", "#DDB273", "#835D28"];
const MAX_CONCURRENT_BURSTS = 8;
const BURST_LIFETIME_MS = 900;

function makeParticles() {
  // 5 wisps per touch, each with its own angle/distance/size so the burst
  // reads as dissipating smoke rather than a uniform ring.
  return Array.from({ length: 6 }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: 18 + Math.random() * 28,
    size: 16 + Math.random() * 20,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    blur: 0.5 + Math.random() * 1.5,
    delay: Math.random() * 0.06,
  }));
}

/**
 * A soft gold smoke puff at every touch/click, anywhere on the site. Purely
 * decorative and non-interactive (pointer-events-none, fixed overlay) so it
 * never affects the tap/click it's celebrating. Skips itself entirely for
 * anyone who prefers reduced motion — there's no restrained version of a
 * particle burst, so the honest thing is to not show one.
 */
export default function TouchSmoke() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("a11y-reduce-motion")
    ) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      const id = idRef.current++;
      const burst: Burst = { id, x: e.clientX, y: e.clientY, particles: makeParticles() };
      setBursts((prev) => {
        const next = [...prev, burst];
        return next.length > MAX_CONCURRENT_BURSTS
          ? next.slice(next.length - MAX_CONCURRENT_BURSTS)
          : next;
      });
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, BURST_LIFETIME_MS);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div key={burst.id} style={{ position: "absolute", left: burst.x, top: burst.y }}>
            {burst.particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  // Lingers near full opacity through the first ~40% of the
                  // burst, then fades — MOTION.ease (built for entrances) is
                  // front-loaded, so using it on opacity here made the smoke
                  // vanish almost immediately instead of dissipating.
                  opacity: [1, 0.95, 0],
                  scale: 1.8,
                  x: Math.cos(p.angle) * p.distance,
                  y: Math.sin(p.angle) * p.distance - 16,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  // Per-property overrides in framer-motion don't inherit
                  // duration/delay from sibling keys or a top-level value —
                  // each needs its own, or it silently falls back to
                  // framer-motion's 0.3s default and the burst finishes
                  // (and the opacity keyframes complete) 2.5x too fast.
                  opacity: { duration: 0.75, delay: p.delay, times: [0, 0.4, 1], ease: "easeIn" },
                  scale: { duration: 0.75, delay: p.delay, ease: MOTION.ease },
                  x: { duration: 0.75, delay: p.delay, ease: MOTION.ease },
                  y: { duration: 0.75, delay: p.delay, ease: MOTION.ease },
                }}
                style={{
                  position: "absolute",
                  left: -p.size / 2,
                  top: -p.size / 2,
                  width: p.size,
                  height: p.size,
                  borderRadius: "9999px",
                  background: `radial-gradient(circle, ${p.color} 0%, ${p.color} 35%, transparent 75%)`,
                  filter: `blur(${p.blur}px)`,
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
