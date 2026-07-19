import SectionSeam from "./SectionSeam";
import SignatureMark from "./SignatureMark";

const points = [
  {
    title: "Clear diagnosis",
    detail:
      "We explain what we see, what can wait, and what should be treated now, so every appointment starts with clarity.",
  },
  {
    title: "Comfort-first care",
    detail:
      "Gentle techniques, unhurried conversations, and practical aftercare help nervous patients and children feel more at ease.",
  },
  {
    title: "Long-term planning",
    detail:
      "From routine check-ups to implants, braces, and full-mouth rehabilitation, we plan around lasting oral health.",
  },
];

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-ink text-porcelain relative">
      {topDivider && <SectionSeam tone="dark" />}
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20">
        <div className="relative">
          <SignatureMark className="w-20 h-20 text-gold-dark absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Our care philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Clear advice.
            <br />
            Calmer visits.
          </h2>
          <p className="mt-6 text-porcelain/60 leading-relaxed max-w-sm">
            Dental care feels easier when you understand the plan, the reason,
            and the next step before treatment begins.
          </p>
        </div>

        <div>
          {points.map((p, i) => (
            <div
              key={p.title}
              className={`flex gap-6 md:gap-10 py-7 ${
                i !== 0 ? "border-t border-porcelain/10" : ""
              }`}
            >
              <span className="font-display text-lg text-gold-light/70 shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-porcelain/60 leading-relaxed text-sm max-w-md">
                  {p.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
