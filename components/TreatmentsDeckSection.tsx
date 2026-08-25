import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Reveal from "./Reveal";
import TreatmentDeck from "./TreatmentDeck";

export default function TreatmentsDeckSection({ limit }: { limit?: number }) {
  const list = limit ? treatments.slice(0, limit) : treatments;

  return (
    <section id="treatments" className="bg-porcelain overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-[0.14em] mb-4">
            Dental Treatments in Kadarenahalli, Bengaluru
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.03] text-ink">
            Everything a family's teeth ask for,
            <span className="text-gold-dark italic font-normal"> under one roof.</span>
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <TreatmentDeck treatments={list} />
        </Reveal>

        {limit && treatments.length > limit && (
          <Reveal className="mt-12 text-center">
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
