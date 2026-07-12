import { testimonials, clinic } from "@/lib/site-data";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-brass-dark uppercase tracking-wide mb-3">
              What families say
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              {clinic.rating}★ from {clinic.reviewCount}+ patients.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white/70 border border-ink/10 p-7"
            >
              <span className="text-brass text-2xl leading-none" aria-hidden>
                “
              </span>
              <blockquote className="text-ink/80 leading-relaxed mt-2">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-ink/50">
                {t.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
