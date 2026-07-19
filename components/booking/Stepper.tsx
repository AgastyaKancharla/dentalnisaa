"use client";

import { motion } from "framer-motion";
import { BOOKING_STEPS, STEP_LABELS } from "@/lib/booking-schema";
import { useBooking } from "./BookingProvider";

export default function Stepper() {
  const { stepIndex, goToStep, canLeaveStep } = useBooking();

  return (
    <nav aria-label="Booking progress" className="w-full">
      {/* Compact mobile version: "Step 2 of 6 — Doctor" + a slim progress bar */}
      <div className="sm:hidden mb-6">
        <p className="text-sm font-semibold text-ink/60">
          Step {stepIndex + 1} of {BOOKING_STEPS.length} — {STEP_LABELS[BOOKING_STEPS[stepIndex]]}
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={false}
            animate={{ width: `${((stepIndex + 1) / BOOKING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Full stepper on tablet/desktop */}
      <ol className="hidden sm:flex items-center w-full mb-10">
        {BOOKING_STEPS.map((step, i) => {
          const isActive = i === stepIndex;
          const isComplete = i < stepIndex;
          const isReachable = isComplete || isActive || (i > 0 && canLeaveStep(BOOKING_STEPS[i - 1]));

          return (
            <li key={step} className="flex-1 flex items-center last:flex-none">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && goToStep(step)}
                className={`focus-ring flex items-center gap-2.5 text-left group ${
                  isReachable ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                    isComplete
                      ? "bg-gold border-gold text-ink"
                      : isActive
                      ? "border-ink bg-ink text-porcelain"
                      : "border-ink/15 text-ink/30"
                  }`}
                >
                  {isComplete ? "✓" : i + 1}
                </span>
                <span
                  className={`hidden md:inline text-sm font-medium transition-colors ${
                    isActive ? "text-ink" : isComplete ? "text-ink/70" : "text-ink/30"
                  }`}
                >
                  {STEP_LABELS[step]}
                </span>
              </button>
              {i < BOOKING_STEPS.length - 1 && (
                <span
                  className={`flex-1 h-px mx-3 transition-colors ${
                    isComplete ? "bg-gold" : "bg-ink/10"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
