"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  /** Numeric value to count up to. */
  value: number;
  /** Text before/after the number, e.g. prefix="", suffix="+" */
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Decimal places to keep, e.g. 1 for a 4.8 rating. Defaults to 0. */
  decimals?: number;
  /** Group thousands, e.g. 1131 -> "1,131". Off by default so existing
   *  small counters (years, treatment counts) render exactly as before. */
  grouped?: boolean;
  className?: string;
};

// Same IntersectionObserver pattern as Reveal.tsx — counts up once the
// element scrolls into view, using requestAnimationFrame instead of a
// library so it costs nothing on the bundle.
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  decimals = 0,
  grouped = false,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const round = (n: number) => {
      const factor = 10 ** decimals;
      return Math.round(n * factor) / factor;
    };

    if (typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(round(value * eased));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  const shown = grouped
    ? display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
