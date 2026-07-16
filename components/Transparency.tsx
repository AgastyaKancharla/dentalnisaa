import ArchDivider from "./ArchDivider";

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
      {topDivider && <ArchDivider to="#2A2723" />}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Our clinic, by design
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight">
            Glass walls. No surprises.
          </h2>
          <p className="mt-5 text-porcelain/70 text-lg leading-relaxed">
            Our treatment rooms are visible from the waiting area through
            floor-to-ceiling glass — a deliberate choice, not an aesthetic
            one.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="glass-panel-dark rounded-2xl p-7"
            >
              <h3 className="font-display text-xl mb-3">{p.title}</h3>
              <p className="text-porcelain/65 leading-relaxed text-sm">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ArchDivider from="#2A2723" to="#FDFCF9" flip />
    </section>
  );
}
