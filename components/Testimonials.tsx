import { testimonials, clinic } from "@/lib/site-data";

const googleReviewsUrl =
  clinic.address.mapsUrl ||
  `https://www.google.com/search?q=${encodeURIComponent(
    clinic.name + " " + clinic.address.line2
  )}+reviews`;

export default function Testimonials() {
  const featured = testimonials.slice(0, 6);

  return (
    <section id="reviews" className="bg-porcelain-dim/40">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              What families say
            </p>
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight text-ink">
              {clinic.rating}★ from {clinic.reviewCount}+ patients.
            </h2>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink underline underline-offset-4"
          >
            See all reviews on Google →
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <figure key={i} className="glass-panel rounded-2xl p-7">
                <span className="text-gold text-2xl leading-none" aria-hidden>
                  “
                </span>
                <blockquote className="text-ink/80 leading-relaxed mt-2">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-ink/60">
                  {t.author}
                  <span className="block font-normal text-ink/40 mt-0.5">
                    {t.context}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-ink/70">
              Read {clinic.reviewCount}+ real reviews from our patients on
              Google.
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center mt-4 rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
            >
              See our Google reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
