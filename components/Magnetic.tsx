"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Magnetic({
  children,
  pull = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  /** Fraction of cursor offset the element travels toward — higher = stronger pull. */
  pull?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * pull,
      y: (e.clientY - rect.top - rect.height / 2) * pull,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
