import { testimonials, clinic } from "@/lib/site-data";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-crimson-dark uppercase tracking-wide mb-3">
              What families say
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              {clinic.rating}★ from {clinic.reviewCount}+ patients.
            </h2>
          </div>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl bg-white/70 border border-ink/10 p-7"
              >
                <span className="text-crimson text-2xl leading-none" aria-hidden>
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
        ) : (
          <div className="rounded-2xl bg-white/70 border border-ink/10 p-8 text-center">
            <p className="text-ink/70">
              Read {clinic.reviewCount}+ real reviews from our patients on
              Google.
            </p>
            <a
              href={
                clinic.address.mapsUrl ||
                `https://www.google.com/search?q=${encodeURIComponent(
                  clinic.name + " " + clinic.address.line2
                )}+reviews`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center mt-4 rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-sage-dark transition-colors"
            >
              See our Google reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
