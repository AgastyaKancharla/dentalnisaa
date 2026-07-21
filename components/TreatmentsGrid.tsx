import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Icon from "./Icon";
import Reveal from "./Reveal";

// A checkerboard mosaic of dark/light cards, replacing the flat numbered
// list. The alternating ink/porcelain tiles are the actual signature move
// here — most dental sites use uniform white cards, so the color-block
// rhythm alone reads as distinct even before any hover state.
export default function TreatmentsGrid({ limit }: { limit?: number }) {
  const list = limit ? treatments.slice(0, limit) : treatments;
  const cols = 3; // must match the lg:grid-cols-3 below for the checker math

  return (
    <section id="treatments" className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Dental Treatments in Kadarenahalli, Bengaluru
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            Everything a family's teeth ask for,
            <span className="text-gold-dark italic"> under one roof.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {list.map((t, i) => {
            const row = Math.floor(i / cols);
            const dark = (row + i) % 2 === 0;
            return (
              <Reveal key={t.id} delay={(i % 6) * 40} className="h-full">
                <Link
                  href={`/treatments/${t.id}`}
                  className={`group relative flex flex-col justify-between h-full min-h-[170px] sm:min-h-[220px] p-4 sm:p-7 md:p-8 transition-colors duration-300 ${
                    dark
                      ? "bg-ink text-porcelain hover:bg-[#2a2521]"
                      : "bg-porcelain text-ink hover:bg-white"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-flex w-9 h-9 sm:w-12 sm:h-12 rounded-full items-center justify-center border transition-colors duration-300 ${
                        dark
                          ? "border-porcelain/25 group-hover:bg-gold-light group-hover:border-gold-light"
                          : "border-ink/15 group-hover:bg-gold group-hover:border-gold"
                      }`}
                    >
                      <Icon
                        name={t.icon}
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                          dark
                            ? "text-gold-light group-hover:text-ink"
                            : "text-teal-dark group-hover:text-ink"
                        }`}
                      />
                    </span>
                    <h3 className="font-display text-base sm:text-xl mt-3 sm:mt-5 mb-1.5 sm:mb-2">{t.name}</h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none ${
                        dark ? "text-porcelain/55" : "text-ink/55"
                      }`}
                    >
                      {t.tagline}
                    </p>
                  </div>

                  <span
                    className={`mt-4 sm:mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${
                      dark ? "text-gold-light" : "text-gold-dark"
                    }`}
                  >
                    Learn more <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
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
