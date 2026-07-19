import Reveal from "./Reveal";
import Icon from "./Icon";

const steps = [
  { title: "Book", detail: "Online, by call, or WhatsApp — pick a time that works for you.", icon: "calendar" },
  { title: "Consultation", detail: "An honest conversation about what's bothering you and why.", icon: "chat" },
  { title: "Diagnosis", detail: "A visual and, where needed, digital X-ray review to see the full picture.", icon: "mouth" },
  { title: "Treatment", detail: "Your plan, explained in plain language before it starts.", icon: "tooth" },
  { title: "Follow-up", detail: "We check in to make sure recovery is on track.", icon: "shield" },
];

export default function AppointmentProcess() {
  return (
    <section className="bg-porcelain-dim/40">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-16">
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            What to expect
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
            From first call to <span className="text-gold-dark italic">follow-up.</span>
          </h2>
        </Reveal>

        {/* Desktop: horizontal timeline. Mobile: vertical, connected by a rail. */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px bg-ink/10"
            aria-hidden
          />
          <div className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative flex md:flex-col gap-5 md:gap-0">
                  <div className="relative shrink-0 md:mb-6">
                    <div className="w-12 h-12 rounded-full bg-ink text-porcelain flex items-center justify-center relative z-10">
                      <Icon name={step.icon} className="w-5 h-5" />
                    </div>
                    {i !== steps.length - 1 && (
                      <div className="md:hidden absolute top-12 left-1/2 -translate-x-1/2 w-px h-full bg-ink/10" aria-hidden />
                    )}
                  </div>
                  <div>
                    <span className="font-display text-sm text-ink/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-ink mt-1">{step.title}</h3>
                    <p className="mt-2 text-sm text-ink/55 leading-relaxed max-w-[220px]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
