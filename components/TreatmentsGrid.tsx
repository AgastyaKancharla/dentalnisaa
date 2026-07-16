import Link from "next/link";
import { treatments } from "@/lib/site-data";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function TreatmentsGrid() {
  return (
    <section id="treatments" className="bg-porcelain">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Dental Treatments in Kadarenahalli, Bengaluru
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            Everything a family's teeth ask for,
            <span className="text-gold-dark"> under one roof.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 md:gap-x-14 border-t border-ink/10">
          {treatments.map((t, i) => (
            <Reveal key={t.id} delay={(i % 6) * 40}>
              <Link
                href={`/treatments/${t.id}`}
                className="group flex items-center gap-5 py-6 border-b border-ink/10 hover:pl-2 transition-[padding] duration-300"
              >
                <span className="font-display text-sm text-ink/30 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  name={t.icon}
                  className="w-6 h-6 text-teal-dark group-hover:text-gold-dark transition-colors shrink-0"
                />
                <span className="flex-1 min-w-0">
                  <span className="block font-display text-lg text-ink group-hover:text-gold-dark transition-colors">
                    {t.name}
                  </span>
                  <span className="block text-sm text-ink/50 leading-snug mt-0.5 truncate group-hover:whitespace-normal">
                    {t.short}
                  </span>
                </span>
                <span
                  className="shrink-0 text-ink/30 group-hover:text-gold-dark group-hover:translate-x-1 transition-all"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
