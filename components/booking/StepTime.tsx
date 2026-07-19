"use client";

import { getSlotsForDay, formatDateLong } from "@/lib/booking-availability";
import { useBooking } from "./BookingProvider";

const PERIODS = ["Morning", "Afternoon", "Evening"] as const;

export default function StepTime() {
  const { state, setSlot, next, back } = useBooking();
  if (!state.date || !state.doctorName) return null;

  const slots = getSlotsForDay(state.date, state.doctorName);

  const handleSelect = (time: string) => {
    setSlot(time);
    next();
  };

  return (
    <div>
      <button type="button" onClick={back} className="focus-ring text-sm text-ink/50 hover:text-ink mb-4">
        ← Back
      </button>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Pick a time</h1>
      <p className="text-ink/55 mb-8">{formatDateLong(state.date)}</p>

      <div className="space-y-8">
        {PERIODS.map((period) => {
          const periodSlots = slots.filter((s) => s.period === period);
          if (periodSlots.length === 0) return null;
          return (
            <div key={period}>
              <p className="text-sm font-semibold text-ink/50 uppercase tracking-wide mb-3">{period}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {periodSlots.map((slot) => {
                  const selected = state.slot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.booked}
                      onClick={() => handleSelect(slot.time)}
                      aria-pressed={selected}
                      className={`focus-ring rounded-xl px-3 py-3.5 text-sm font-medium border transition-colors min-h-[48px] ${
                        slot.booked
                          ? "bg-ink/5 text-ink/25 border-ink/5 cursor-not-allowed line-through"
                          : selected
                          ? "bg-gold text-ink border-gold"
                          : "bg-white/70 text-ink/75 border-ink/10 hover:border-gold/50"
                      }`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-ink/40">
        Slot availability shown here is illustrative — the clinic will confirm your exact time by
        call or WhatsApp shortly after booking.
      </p>
    </div>
  );
}
