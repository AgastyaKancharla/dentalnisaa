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

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold text-teal-dark uppercase tracking-wide mb-2">
          {treatment.category}
        </p>

        <Link href={`/treatments/${treatment.id}`} className="focus-ring">
          <h3 className="font-display text-xl leading-snug text-ink group-hover:text-gold-dark transition-colors">
            {treatment.name}
          </h3>
        </Link>

        <p className="mt-2.5 text-sm text-ink/60 leading-relaxed flex-1">
          {treatment.short}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            href={`/treatments/${treatment.id}`}
            className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-gold-dark transition-colors"
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
            className="focus-ring shrink-0 inline-flex items-center rounded-full bg-ink text-porcelain px-4 py-2 text-xs font-semibold hover:bg-teal-dark transition-colors"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
