"use client";

import { getUpcomingDays } from "@/lib/booking-availability";
import { useBooking } from "./BookingProvider";

export default function StepDate() {
  const { state, setDate, next, back } = useBooking();
  const days = getUpcomingDays(21);

  // Chunk into weeks (7 columns) so the grid reads like a real calendar,
  // even though we're only showing a rolling 3-week window rather than a
  // full month picker — the clinic doesn't take bookings further out yet.
  const weeks: (typeof days)[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const handleSelect = (iso: string) => {
    setDate(iso);
    next();
  };

  return (
    <div>
      <button type="button" onClick={back} className="focus-ring text-sm text-ink/50 hover:text-ink mb-4">
        ← Back
      </button>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Pick a date</h1>
      <p className="text-ink/55 mb-8">Closed Sundays — those dates aren't selectable.</p>

      <div className="rounded-2xl border border-ink/10 bg-white/60 p-4 md:p-6">
        <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-semibold text-ink/40 uppercase">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1.5 mb-1.5">
            {/* Pad the first week so days align under the correct weekday column */}
            {wi === 0 &&
              Array.from({ length: week[0].date.getDay() }).map((_, i) => <span key={`pad-${i}`} />)}
            {week.map((day) => {
              const selected = state.date === day.iso;
              return (
                <button
                  key={day.iso}
                  type="button"
                  disabled={day.closed}
                  onClick={() => handleSelect(day.iso)}
                  aria-label={`${day.dayName} ${day.label}${day.closed ? ", closed" : ""}`}
                  aria-pressed={selected}
                  className={`focus-ring aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-colors ${
                    day.closed
                      ? "text-ink/20 cursor-not-allowed"
                      : selected
                      ? "bg-ink text-porcelain font-semibold"
                      : "text-ink hover:bg-gold/15 border border-transparent hover:border-gold/40 font-medium"
                  }`}
                >
                  <span className="text-[10px] opacity-60 leading-none">
                    {day.date.toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                  <span className="mt-0.5">{day.date.getDate()}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-ink/40">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-ink/5 border border-ink/10 inline-block" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-ink/5 inline-block opacity-40" /> Closed (Sunday)
        </span>
      </div>
    </div>
  );
}
