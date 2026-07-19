import Reveal from "./Reveal";
import Icon from "./Icon";

const items = [
  {
    icon: "tooth",
    label: "Our Mission",
    detail:
      "To make dental care feel personal and unhurried — honest advice, gentle treatment, and a clinic that treats every patient like a returning face, not a queue number.",
  },
  {
    icon: "sparkle",
    label: "Our Vision",
    detail:
      "To keep being the clinic families in Kadarenahalli grow up with — one generation trusting us enough to bring the next.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="h-full border border-ink/10 bg-white/70 p-8 md:p-10 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
                <Icon name={item.icon} className="w-9 h-9 text-gold-dark" />
                <h3 className="font-display text-2xl text-ink mt-6 mb-3">
                  {item.label}
                </h3>
                <p className="text-ink/60 leading-relaxed">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
