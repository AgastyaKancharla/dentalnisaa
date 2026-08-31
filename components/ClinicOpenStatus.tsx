"use client";

import { useEffect, useState } from "react";
import { getClinicStatus, type ClinicStatus } from "@/lib/clinic-status";

// The footer sits on dark gold, the Hero's status line sits inside a light
// frosted panel, the header is a slim always-on strip — same live data,
// three grounds. `tone` swaps only the colour and scale tokens so neither
// copy nor the timing logic is duplicated.
type Tone = "dark" | "light" | "header";

const TONES: Record<
  Tone,
  {
    open: string;
    closed: string;
    loading: string;
    text: string;
    muted: string;
    gap: string;
    timeClass: string;
    timeText: string;
  }
> = {
  dark: {
    open: "bg-gold-light",
    closed: "bg-porcelain/25",
    loading: "bg-porcelain/10",
    text: "font-display text-xl md:text-2xl leading-none text-porcelain",
    muted: "text-porcelain/70",
    gap: "gap-3",
    timeClass: "block md:inline",
    timeText: "text-sm",
  },
  light: {
    open: "bg-sage-deep",
    closed: "bg-ink/25",
    loading: "bg-ink/10",
    text: "font-semibold text-sm leading-none text-ink",
    muted: "text-ink/50",
    gap: "gap-2",
    timeClass: "block md:inline",
    timeText: "text-sm",
  },
  // Universal green/red status dot (not a brand token) — the header is the
  // one place this needs to read "open vs. closed" at a glance, like any
  // other live-status indicator. Copy stays to a single compact line (no
  // "now"/"today" filler) so it never competes for space in the slim strip.
  header: {
    open: "bg-green-500",
    closed: "bg-red-500",
    loading: "bg-ink/15",
    text: "font-semibold text-xs sm:text-sm leading-none text-ink whitespace-nowrap",
    muted: "text-ink/50",
    gap: "gap-2",
    timeClass: "",
    timeText: "text-[0.7rem] sm:text-xs",
  },
};

// "today" is implied and dropped; "tomorrow" and weekday names are kept
// (abbreviated to 3 letters) since those actually change what to expect.
function dayPrefix(day: string): string {
  if (day === "today") return "";
  if (day === "tomorrow") return "Tomorrow ";
  return `${day.slice(0, 3)} `;
}

export default function ClinicOpenStatus({ tone = "dark" }: { tone?: Tone }) {
  const [status, setStatus] = useState<ClinicStatus | null>(null);
  const t = TONES[tone];

  useEffect(() => {
    const update = () => setStatus(getClinicStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = !status ? t.loading : status.open ? t.open : t.closed;

  if (tone === "header") {
    return (
      <div className={`flex items-center ${t.gap}`}>
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} aria-hidden />
        {!status ? (
          <p className={t.text}>
            <span className={t.muted}>Checking hours…</span>
          </p>
        ) : (
          <div className="leading-tight">
            <p className={t.text}>{status.open ? "Open" : "Closed"}</p>
            <p className={`font-body ${t.timeText} ${t.muted}`}>
              {status.open
                ? `Closes ${status.closesAt}`
                : `Opens ${dayPrefix(status.opensDay)}${status.opensAt}`}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${t.gap}`}>
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} aria-hidden />
      <p className={t.text}>
        {!status ? (
          <span className={t.muted}>Checking hours…</span>
        ) : status.open ? (
          <>
            Open now
            <span
              className={`${t.timeClass} font-body ${t.timeText} sm:ml-2 ${t.muted}`}
            >
              closes {status.closesAt}
            </span>
          </>
        ) : (
          <>
            Closed now
            <span
              className={`${t.timeClass} font-body ${t.timeText} sm:ml-2 ${t.muted}`}
            >
              opens {status.opensDay} at {status.opensAt}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
