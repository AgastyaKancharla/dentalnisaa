import { trustPoints } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";
import Reveal from "./Reveal";

const points = [
  {
    title: "Clear diagnosis",
    detail: "We explain what we see and what it means, before treatment begins.",
  },
  {
    title: "Comfort-first care",
    detail: "Gentle techniques for nervous patients and children alike.",
  },
  {
    title: "Long-term planning",
    detail: "From check-ups to implants, we plan around lasting oral health.",
  },
];

// The rating already leads the Hero — repeating it here would be the same
// redundancy problem again. Only the non-rating facts (years, painless
// care, multi-generational) carry over.
const facts = [trustPoints[0], trustPoints[2], trustPoints[3]];

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-beige-deep text-ink relative overflow-hidden">
      {topDivider && <SectionSeam tone="light" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10">
        <div className="relative">
          <SignatureMark className="w-20 h-20 text-sage absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <Reveal>
            <p className="text-sm font-semibold text-sage-deep uppercase tracking-wide mb-3">
              Our care philosophy
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-ink">
              Clear advice.
              <br />
              Calmer visits.
            </h2>
          </Reveal>

          <Reveal delay={150} className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-ink/70 mt-7">
            <span>{facts[0].label} in Kadarenahalli</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[1].label}</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[2].label} care</span>
          </Reveal>
        </div>

        <div className="space-y-6 md:space-y-8">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="flex gap-5 border-b border-ink/10 pb-6 last:border-b-0">
              <span className="font-display text-2xl text-sage-deep shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="text-ink/65 leading-relaxed text-sm mt-1.5 max-w-sm">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <SectionSeam tone="light" />
    </section>
  );
}
