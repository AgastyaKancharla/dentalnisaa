import Reveal from "./Reveal";
import Icon from "./Icon";

const values = [
  { icon: "family", title: "Patient First", detail: "Every decision starts with what's right for the person in the chair, not the schedule." },
  { icon: "chat", title: "Transparency", detail: "Clear answers before treatment starts — what we see, what can wait, and why." },
  { icon: "scan", title: "Advanced Technology", detail: "Digital, low-radiation imaging and modern techniques used where they genuinely help." },
  { icon: "shield", title: "Comfort", detail: "A calm, unhurried visit — gentle techniques that put nervous patients and children at ease." },
  { icon: "align", title: "Ethical Dentistry", detail: "We recommend what you need, explain why, and never treatment you don't." },
];

export default function OurValues() {
  return (
    <section className="bg-ink text-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            What guides us
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight">
            Our values.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8 sm:gap-8 md:gap-10">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <Icon name={v.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-gold-light" />
              <h3 className="font-display text-base sm:text-xl mt-3 sm:mt-5 mb-1.5 sm:mb-2">{v.title}</h3>
              <p className="text-xs sm:text-sm text-porcelain/55 leading-relaxed max-w-xs">
                {v.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
