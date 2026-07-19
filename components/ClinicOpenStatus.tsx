"use client";

import { useEffect, useState } from "react";
import { getClinicStatus, type ClinicStatus } from "@/lib/clinic-status";

export default function ClinicOpenStatus() {
  const [status, setStatus] = useState<ClinicStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getClinicStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
          status?.open
            ? "bg-gold-light"
            : status
            ? "bg-porcelain/25"
            : "bg-porcelain/10"
        }`}
        aria-hidden
      />
      <p className="font-display text-xl md:text-2xl leading-none">
        {!status ? (
          <span className="text-porcelain/40">Checking hours…</span>
        ) : status.open ? (
          <>
            Open now
            <span className="block md:inline font-body text-sm text-porcelain/50 md:ml-2">
              closes {status.closesAt}
            </span>
          </>
        ) : (
          <>
            Closed now
            <span className="block md:inline font-body text-sm text-porcelain/50 md:ml-2">
              opens {status.opensDay} at {status.opensAt}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
