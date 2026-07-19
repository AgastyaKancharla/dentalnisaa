"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/site-data";
import { getClinicLocalDayName } from "@/lib/clinic-status";

export default function WeeklyHours() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(getClinicLocalDayName());
  }, []);

  return (
    <div className="mt-4 space-y-1.5 text-xs">
      {clinic.hours.map((h) => {
        const isToday = h.day === today;
        return (
          <div
            key={h.day}
            className={`flex justify-between gap-4 ${
              isToday ? "text-porcelain font-semibold" : "text-porcelain/50"
            }`}
          >
            <span>
              {h.day}
              {isToday && <span className="text-gold-light font-normal"> · today</span>}
            </span>
            <span>{h.slots}</span>
          </div>
        );
      })}
    </div>
  );
}
