import Link from "next/link";
import type { Treatment } from "@/lib/site-data";
import TreatmentMedia from "./TreatmentMedia";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-ink/10 bg-white/60 overflow-hidden hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
      <Link
        href={`/treatments/${treatment.id}`}
        className="focus-ring block"
        aria-label={treatment.name}
      >
        <TreatmentMedia treatment={treatment} variant="card" />
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <p className="text-[10px] sm:text-[11px] font-semibold text-teal-dark uppercase tracking-wide mb-1.5 sm:mb-2">
          {treatment.category}
        </p>

        <Link href={`/treatments/${treatment.id}`} className="focus-ring">
          <h3 className="font-display text-base sm:text-xl leading-snug text-ink group-hover:text-gold-dark transition-colors">
            {treatment.name}
          </h3>
        </Link>

        <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-ink/60 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-none">
          {treatment.short}
        </p>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <Link
            href={`/treatments/${treatment.id}`}
            className="focus-ring inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink group-hover:text-gold-dark transition-colors"
          >
            Learn more
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href={`/booking?treatment=${treatment.id}`}
            className="focus-ring shrink-0 inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-teal-dark transition-colors"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
