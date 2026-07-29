import Image from "next/image";
import { trustPoints } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";

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
    <section className="bg-beige-deep text-ink relative">
      {topDivider && <SectionSeam tone="light" />}
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1744723856265-866d19b9cf1a?fm=jpg&q=80&w=1400&auto=format&fit=crop"
            alt="A dentist at DentalNisaa providing comfort-first care to a patient"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute top-4 right-4 bg-ink/60 text-porcelain text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur">
            Representative photo
          </span>
        </div>

        <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20 flex flex-col justify-center">
          <p className="text-sm font-semibold text-sage-deep uppercase tracking-wide mb-3">
            Our care philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-ink mb-8">
            Clear advice.
            <br />
            Calmer visits.
          </h2>

          {/* The three non-rating trust facts, compact -- one line each,
              no separate section needed for them anymore. */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/70 mb-10 pb-8 border-b border-ink/10">
            <span>{facts[0].label} in Kadarenahalli</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[1].label}</span>
            <span className="text-ink/25" aria-hidden>·</span>
            <span>{facts[2].label} care</span>
          </div>

          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span className="font-display text-lg text-sage-deep shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  <p className="text-ink/65 leading-relaxed text-sm mt-1">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionSeam tone="light" />
    </section>
  );
}
