"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

// A real, working accessibility control — not a decorative icon. Toggles
// two things that actually change the page: base font size and forced
// reduced motion (on top of the existing prefers-reduced-motion CSS rule
// in globals.css). Preference is remembered across visits.
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const storedText = localStorage.getItem("a11y-large-text") === "1";
    const storedMotion = localStorage.getItem("a11y-reduce-motion") === "1";
    setLargeText(storedText);
    setReduceMotion(storedMotion);
    document.documentElement.classList.toggle("a11y-large-text", storedText);
    document.documentElement.classList.toggle("a11y-reduce-motion", storedMotion);
  }, []);

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    localStorage.setItem("a11y-large-text", next ? "1" : "0");
    document.documentElement.classList.toggle("a11y-large-text", next);
  };

  const toggleReduceMotion = () => {
    const next = !reduceMotion;
    setReduceMotion(next);
    localStorage.setItem("a11y-reduce-motion", next ? "1" : "0");
    document.documentElement.classList.toggle("a11y-reduce-motion", next);
  };

  return (
    <div className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40">
      {open && (
        <div className="absolute bottom-14 right-0 w-60 bg-white border border-ink/10 shadow-xl rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">
            Accessibility
          </p>
          <button
            type="button"
            onClick={toggleLargeText}
            className="focus-ring w-full flex items-center justify-between text-sm text-ink py-2 border-b border-ink/10"
            aria-pressed={largeText}
          >
            Larger text
            <span className={`w-9 h-5 rounded-full transition-colors relative ${largeText ? "bg-gold" : "bg-ink/15"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${largeText ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </button>
          <button
            type="button"
            onClick={toggleReduceMotion}
            className="focus-ring w-full flex items-center justify-between text-sm text-ink py-2"
            aria-pressed={reduceMotion}
          >
            Reduce motion
            <span className={`w-9 h-5 rounded-full transition-colors relative ${reduceMotion ? "bg-gold" : "bg-ink/15"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${reduceMotion ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility options"
        aria-expanded={open}
        className="focus-ring w-11 h-11 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg hover:bg-gold-light transition-colors"
      >
        <Icon name="accessibility" className="w-5 h-5" />
      </button>
    </div>
  );
}
