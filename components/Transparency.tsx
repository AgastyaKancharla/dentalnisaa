import SectionSeam from "./SectionSeam";
import GlassPanes from "./GlassPanes";

const points = [
  {
    title: "Nothing hidden",
    detail:
      "Every treatment room has a glass wall facing our waiting lounge — you can see the care happening, not just wait for it.",
  },
  {
    title: "Built on trust",
    detail:
      "It's a small design choice with a real reason: patients — especially children — feel calmer when the unknown becomes visible.",
  },
  {
    title: "Still fully private",
    detail:
      "Glass by design, not by accident — sound-insulated rooms and considerate staff keep every conversation confidential.",
  },
];

export default function Transparency({ topDivider = false }: { topDivider?: boolean }) {
  return (
    <section className="bg-ink text-porcelain relative">
      {topDivider && <SectionSeam tone="dark" />}
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20">
        <div className="relative">
          <GlassPanes className="w-20 h-20 text-gold-dark absolute -top-6 -left-2 hidden md:block" strokeOpacity={0.4} />
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Our clinic, by design
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Glass walls.
            <br />
            No surprises.
          </h2>
          <p className="mt-6 text-porcelain/60 leading-relaxed max-w-sm">
            Our treatment rooms are visible from the waiting area through
            floor-to-ceiling glass — a deliberate choice, not an aesthetic
            one.
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
