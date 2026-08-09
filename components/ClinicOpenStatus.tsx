"use client";

import { useEffect, useState } from "react";
import { getClinicStatus, type ClinicStatus } from "@/lib/clinic-status";

// The footer sits on dark gold, the Hero's status line sits inside a light
// frosted panel — same live data, two grounds. `tone` swaps only the colour
// and scale tokens so neither copy nor the timing logic is duplicated.
type Tone = "dark" | "light";

const TONES: Record<
  Tone,
  {
    open: string;
    closed: string;
    loading: string;
    text: string;
    muted: string;
    gap: string;
  }
> = {
  dark: {
    open: "bg-gold-light",
    closed: "bg-porcelain/25",
    loading: "bg-porcelain/10",
    text: "font-display text-xl md:text-2xl leading-none",
    muted: "text-porcelain/50",
    gap: "gap-3",
  },
  light: {
    open: "bg-sage-deep",
    closed: "bg-ink/25",
    loading: "bg-ink/10",
    text: "font-semibold text-sm leading-none text-ink",
    muted: "text-ink/50",
    gap: "gap-2",
  },
};

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
              className={`block md:inline font-body text-sm md:ml-2 ${t.muted}`}
            >
              closes {status.closesAt}
            </span>
          </>
        ) : (
          <>
            Closed now
            <span
              className={`block md:inline font-body text-sm md:ml-2 ${t.muted}`}
            >
              opens {status.opensDay} at {status.opensAt}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
