import { clinic } from "./site-data";

export type DayInfo = {
  iso: string; // yyyy-mm-dd, used as the value/key
  date: Date;
  label: string; // "19 Jul"
  dayName: string; // "Sun"
  closed: boolean;
};

export type TimeSlot = {
  time: string; // "10:30 AM"
  period: "Morning" | "Afternoon" | "Evening";
  booked: boolean;
};

/**
 * Upcoming open days, skipping Sundays (clinic.hours confirms Sunday is
 * closed). Three weeks out gives enough real choice without implying a
 * booking horizon the clinic hasn't confirmed.
 */
export function getUpcomingDays(count = 21): DayInfo[] {
  const days: DayInfo[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; days.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const closed = d.getDay() === 0; // Sunday, per clinic.hours
    days.push({
      iso: d.toISOString().slice(0, 10),
      date: d,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
      closed,
    });
  }
  return days;
}

/**
 * Slots across the clinic's actual published hours (10am-2pm, 4pm-8pm).
 * `booked` is a deterministic pseudo-random mock — same approach as the
 * existing BookingWidget — so the flow demos realistically without a real
 * scheduling backend. Replace with a live availability check once
 * BOOKING_WEBHOOK_URL (or a future CRM/calendar integration) can report
 * real booked slots; see /docs/BOOKING_BACKEND_SETUP.md.
 */
export function getSlotsForDay(dayIso: string, doctorName: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const push = (h: number, m: number, period: TimeSlot["period"]) => {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const ampm = h >= 12 ? "PM" : "AM";
    const time = `${hour12}:${m === 0 ? "00" : m} ${ampm}`;
    const seed = `${dayIso}-${doctorName}-${time}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 97;
    slots.push({ time, period, booked: hash % 5 === 0 });
  };

  for (let h = 10; h < 12; h++) { push(h, 0, "Morning"); push(h, 30, "Morning"); }
  push(12, 0, "Morning"); push(12, 30, "Morning");
  for (let h = 13; h < 14; h++) { push(h, 0, "Afternoon"); push(h, 30, "Afternoon"); }
  for (let h = 16; h < 18; h++) { push(h, 0, "Afternoon"); push(h, 30, "Afternoon"); }
  for (let h = 18; h < 20; h++) { push(h, 0, "Evening"); push(h, 30, "Evening"); }

  return slots;
}

export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Confirms clinic.hours hasn't drifted from the Sunday-closed assumption above. */
export function isClinicOpenOn(dayOfWeek: number): boolean {
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  const entry = clinic.hours.find((h) => h.day === dayName);
  return !!entry && entry.slots !== "Closed";
}
