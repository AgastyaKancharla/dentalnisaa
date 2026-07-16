import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function TreatmentsGrid() {
  return (
    <section id="treatments" className="bg-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Care, by need
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            Everything a family's teeth ask for,
            <span className="italic text-gold-dark"> under one roof.</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {treatments.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <Link
                href={`/treatments/${t.id}`}
                className="group block h-full rounded-2xl border border-ink/10 bg-white/60 p-6 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_-15px_rgba(22,48,46,0.3)] transition-all"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-teal/10 text-teal-dark group-hover:bg-gold/15 group-hover:text-gold-dark transition-colors">
                  <Icon name={t.icon} className="w-5 h-5" />
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{t.name}</h3>
                <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                  {t.short}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
