import { trustPoints, treatments } from "@/lib/site-data";
import AnimatedCounter from "./AnimatedCounter";
import Reveal from "./Reveal";

// Reuses the same trustPoints data model as the homepage TrustBar (just a
// light-theme card layout instead of the dark strip) plus one real count
// pulled directly from the treatments array — no invented totals.
export default function TrustStats() {
  const stats = [
    ...trustPoints.slice(0, 2), // years active, rating — both animated
    {
      value: treatments.length,
      suffix: "+",
      label: `${treatments.length}+`,
      detail: "Treatments offered",
    },
    trustPoints[3], // multi-generational — non-numeric, kept as-is
  ];

  return (
    <section className="bg-porcelain-dim/40">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Why patients trust us
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            Numbers that took <span className="italic text-gold-dark">30 years</span> to earn.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="bg-porcelain-dim/40">
              <div className="p-8 h-full">
                <p className="font-display text-3xl md:text-4xl text-ink">
                  {typeof stat.value === "number" ? (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  ) : (
                    stat.label
                  )}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-ink/50">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
