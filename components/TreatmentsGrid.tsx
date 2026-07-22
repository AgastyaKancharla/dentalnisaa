import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Reveal from "./Reveal";
import TreatmentTile from "./TreatmentTile";

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
            return <TreatmentTile key={t.id} treatment={t} dark={dark} index={i} />;
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
