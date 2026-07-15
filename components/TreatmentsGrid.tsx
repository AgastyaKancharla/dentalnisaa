import { treatments } from "@/lib/site-data";

const icons: Record<string, string> = {
  tooth: "🦷",
  sparkle: "✨",
  align: "📐",
  implant: "🔩",
  mouth: "😬",
  root: "🩹",
  bridge: "🌉",
  family: "👨‍👩‍👧",
};

export default function TreatmentsGrid() {
  return (
    <section id="treatments" className="bg-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Care, by need
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            Everything a family's teeth ask for,
            <span className="italic text-gold-dark"> under one roof.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {treatments.map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl border border-ink/10 bg-white/60 p-6 hover:border-gold/40 hover:shadow-[0_8px_30px_-15px_rgba(22,48,46,0.3)] transition-all"
            >
              <span className="text-3xl" aria-hidden>
                {icons[t.icon] ?? "🦷"}
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{t.name}</h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                {t.short}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
