"use client";

import { doctors } from "@/lib/site-data";
import { NO_DOCTOR_PREFERENCE } from "@/lib/booking-schema";
import { useBooking } from "./BookingProvider";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function StepDoctor() {
  const { state, setDoctor, next, back } = useBooking();

  const options = [
    { name: NO_DOCTOR_PREFERENCE, display: "No preference", sub: "First available dentist" },
    ...doctors.map((d) => ({ name: d.name, display: d.name, sub: d.title || "General Dentistry" })),
  ];

  const handleSelect = (name: string) => {
    setDoctor(name);
    next();
  };

  return (
    <div>
      <button type="button" onClick={back} className="focus-ring text-sm text-ink/50 hover:text-ink mb-4">
        ← Back
      </button>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Choose your dentist</h1>
      <p className="text-ink/55 mb-8">
        No strong preference? "No preference" gets you the earliest available slot.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((opt) => {
          const selected = state.doctorName === opt.name;
          const isNoPreference = opt.name === NO_DOCTOR_PREFERENCE;
          return (
            <button
              key={opt.name}
              type="button"
              onClick={() => handleSelect(opt.name)}
              className={`focus-ring text-left rounded-2xl border p-5 min-h-[104px] transition-all ${
                selected
                  ? "border-gold bg-gold/10 ring-2 ring-gold"
                  : "border-ink/10 bg-white/60 hover:border-gold/50 hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display text-lg ${
                    isNoPreference ? "bg-ink/10 text-ink/50" : "bg-teal/15 text-teal-dark"
                  }`}
                >
                  {isNoPreference ? "✓" : initials(opt.name)}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{opt.display}</h3>
                  <p className="mt-0.5 text-sm text-ink/55">{opt.sub}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
