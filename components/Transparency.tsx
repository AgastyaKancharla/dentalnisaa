import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";

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

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-beige-deep text-ink relative">
      {topDivider && <SectionSeam tone="light" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-10">
        <div className="relative">
          <SignatureMark className="w-20 h-20 text-sage absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <p className="text-sm font-semibold text-sage-deep uppercase tracking-wide mb-3">
            Our care philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-ink">
            Clear advice.
            <br />
            Calmer visits.
          </h2>
        </div>

        {/* All three shown at once, one sentence each — short enough now
            that hiding two behind a tap/hover interaction wasn't earning
            its complexity anymore. */}
        <div className="grid sm:grid-cols-3 gap-5">
          {points.map((p, i) => (
            <div key={p.title} className="border border-ink/10 bg-sage-pale/30 p-6">
              <span className="font-display text-lg text-sage-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-ink mt-1">{p.title}</h3>
              <p className="text-ink/65 leading-relaxed text-sm mt-2">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <SectionSeam tone="light" />
    </section>
  );
}
