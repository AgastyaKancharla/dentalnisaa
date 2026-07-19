import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Editorial "index" redesign: oversized watermark numerals, a real per-
// treatment tagline instead of the generic short description (both already
// exist in site-data, tagline was just unused), and a colored icon chip
// that fills on hover. No fabricated "Most Popular" hierarchy — the data
// has no popularity field, so every row stays equal weight by design.
export default function TreatmentsGrid({ limit }: { limit?: number }) {
  const list = limit ? treatments.slice(0, limit) : treatments;

  return (
    <section id="treatments" className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Dental Treatments in Kadarenahalli, Bengaluru
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              Everything a family's teeth ask for,
              <span className="text-gold-dark italic"> under one roof.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 md:gap-x-10 border-t border-ink/10">
          {list.map((t, i) => (
            <Reveal key={t.id} delay={(i % 6) * 40}>
              <Link
                href={`/treatments/${t.id}`}
                className="group relative flex items-center gap-5 py-7 border-b border-ink/10 overflow-hidden"
              >
                {/* Oversized watermark numeral — sits behind the content,
                    grows and warms on hover for a bit of theatre. */}
                <span
                  aria-hidden
                  className="pointer-events-none select-none absolute -left-1 top-1/2 -translate-y-1/2 font-display text-[4.5rem] leading-none text-ink/[0.04] group-hover:text-gold/10 transition-colors duration-500"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon chip — outline by default, fills solid on hover. */}
                <span className="relative z-10 shrink-0 w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                  <Icon
                    name={t.icon}
                    className="w-5 h-5 text-teal-dark group-hover:text-ink transition-colors duration-300"
                  />
                </span>

                <span className="relative z-10 flex-1 min-w-0">
                  <span className="block font-display text-lg text-ink group-hover:text-gold-dark transition-colors">
                    {t.name}
                  </span>
                  <span className="block text-sm text-ink/50 leading-snug mt-0.5 truncate group-hover:whitespace-normal">
                    {t.tagline ?? t.short}
                  </span>
                </span>

                <span
                  className="relative z-10 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-ink/30 group-hover:text-porcelain group-hover:bg-ink group-hover:translate-x-1 transition-all duration-300"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {limit && treatments.length > limit && (
          <Reveal className="mt-10">
            <Link
              href="/treatments"
              className="focus-ring inline-flex items-center gap-2 font-semibold text-ink hover:text-gold-dark transition-colors"
            >
              View all {treatments.length} treatments
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
