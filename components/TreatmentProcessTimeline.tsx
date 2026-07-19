import Reveal from "./Reveal";

type Step = { title: string; detail: string };

export default function TreatmentProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      {/* Connecting line */}
      <div
        className="absolute left-[15px] top-2 bottom-2 w-px bg-porcelain/15"
        aria-hidden
      />

      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 90}>
          <li className="relative pl-12 pb-12 last:pb-0">
            <span
              className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-porcelain text-ink font-display text-sm"
              aria-hidden
            >
              {i + 1}
            </span>
            <h3 className="font-display text-lg md:text-xl">{step.title}</h3>
            <p className="mt-2 text-porcelain/65 text-sm md:text-base leading-relaxed max-w-md">
              {step.detail}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
