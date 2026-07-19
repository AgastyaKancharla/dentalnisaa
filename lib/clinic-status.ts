import { clinic } from "./site-data";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Range = { start: number; end: number }; // minutes since midnight

function parseTimeToken(token: string, fallbackPeriod?: "am" | "pm"): number | null {
  const match = token.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const period = (match[3]?.toLowerCase() as "am" | "pm" | undefined) ?? fallbackPeriod;
  if (!period) return null;
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

/**
 * Parses a slots string like "10:30 am–2 pm, 4:30–8 pm" into minute ranges.
 * The second range's start ("4:30") often omits am/pm since it's implied by
 * its own end ("8 pm") — this borrows that period rather than requiring
 * every token to be fully written out.
 */
function parseSlots(slots: string): Range[] {
  if (!slots || slots.toLowerCase() === "closed") return [];
  return slots
    .split(",")
    .map((part) => {
      const [startRaw, endRaw] = part.split(/[–-]/).map((s) => s.trim());
      if (!startRaw || !endRaw) return null;
      const endMatch = endRaw.match(/(am|pm)/i);
      const endPeriod = endMatch ? (endMatch[1].toLowerCase() as "am" | "pm") : undefined;
      const end = parseTimeToken(endRaw);
      const start = parseTimeToken(startRaw, endPeriod);
      if (start === null || end === null) return null;
      return { start, end };
    })
    .filter((r): r is Range => r !== null);
}

function formatMinutes(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const hour12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const ampm = h24 >= 12 ? "PM" : "AM";
  return m === 0 ? `${hour12} ${ampm}` : `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export type ClinicStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: string };

/**
 * Always evaluated in the clinic's own timezone (Asia/Kolkata), not the
 * visitor's device clock — correct behavior for "is the clinic open right
 * now" regardless of where the page is being viewed from.
 */
export function getClinicStatus(referenceDate: Date = new Date()): ClinicStatus {
  const istNow = new Date(
    referenceDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const nowMinutes = istNow.getHours() * 60 + istNow.getMinutes();

  for (let offset = 0; offset < 8; offset++) {
    const d = new Date(istNow);
    d.setDate(istNow.getDate() + offset);
    const dayName = DAY_NAMES[d.getDay()];
    const entry = clinic.hours.find((h) => h.day === dayName);
    const ranges = entry ? parseSlots(entry.slots) : [];

    if (offset === 0) {
      const current = ranges.find((r) => nowMinutes >= r.start && nowMinutes < r.end);
      if (current) return { open: true, closesAt: formatMinutes(current.end) };

      const later = ranges.find((r) => r.start > nowMinutes);
      if (later) {
        return { open: false, opensAt: formatMinutes(later.start), opensDay: "today" };
      }
      continue; // no ranges left today — check the following days
    }

    if (ranges.length > 0) {
      const label = offset === 1 ? "tomorrow" : dayName;
      return { open: false, opensAt: formatMinutes(ranges[0].start), opensDay: label };
    }
  }

  // All 8 days closed would mean the clinic never opens — shouldn't happen
  // given clinic.hours, but keep a sane fallback rather than throwing.
  return { open: false, opensAt: "10:30 AM", opensDay: "Monday" };
}
