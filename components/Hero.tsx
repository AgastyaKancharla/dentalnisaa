import Link from "next/link";
import { clinic } from "@/lib/site-data";
import GlassPanes from "./GlassPanes";
import SectionSeam from "./SectionSeam";

export default function Hero() {
  return (
    <section className="relative bg-porcelain overflow-hidden">
      <div className="grid md:grid-cols-2 md:min-h-[640px]">
        <div className="flex items-center px-5 md:pl-10 lg:pl-16 xl:pl-24 md:pr-10 py-16 md:py-20 animate-fadeUp">
          <div className="max-w-lg">
            <p className="text-xs font-semibold text-gold-dark uppercase tracking-[0.2em] mb-5">
              Dentist in Kadarenahalli, Bengaluru — since {clinic.foundedYear}
            </p>

            <h1 className="font-display text-[3.1rem] leading-[0.98] md:text-[4.5rem] md:leading-[0.95] text-ink tracking-tight">
              Grow up
              <br />
              with your
              <br />
              dentist.
            </h1>

            <p className="mt-7 text-ink/65 text-[17px] leading-relaxed">
              For {clinic.yearsActive} years, DentalNisaa has cared for
              grandparents, parents and children in Kadarenahalli — painless
              treatment, honest advice, and treatment rooms built on trust:
              fully visible through glass, right from our waiting lounge.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/booking"
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-teal-dark transition-colors"
              >
                Book your visit
              </Link>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 font-semibold text-ink hover:text-gold-dark transition-colors"
              >
                Chat on WhatsApp
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-5 border-t border-ink/10 pt-6">
              <span className="font-display text-3xl text-ink">{clinic.rating}★</span>
              <span className="text-sm text-ink/50 leading-tight max-w-[9rem]">
                from {clinic.reviewCount}+ Google reviews
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-[340px] md:h-auto">
          {/* TEMPORARY stock photo (free Unsplash license, no attribution
              required) standing in for a real clinic photo — swap the src
              below for an actual photo of the glass treatment rooms as
              soon as one is available. */}
          <img
            src="https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?fm=jpg&q=80&w=1200&auto=format&fit=crop"
            alt="Bright, glass-walled dental treatment room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute top-5 right-5 bg-ink/60 text-porcelain text-[11px] font-medium tracking-wide px-3 py-1 rounded-full backdrop-blur">
            Representative photo
          </span>

          <div className="absolute bottom-0 left-0 bg-porcelain px-6 py-5 border-t border-r border-ink/10 md:max-w-[220px]">
            <GlassPanes className="w-10 h-10 text-gold-dark absolute -top-5 left-6" strokeOpacity={0.5} />
            <p className="text-xs uppercase tracking-wide text-ink/50 font-semibold mt-3">
              Since {clinic.foundedYear}
            </p>
            <p className="font-display text-2xl text-ink mt-0.5">
              {clinic.yearsActive} years
            </p>
          </div>
        </div>
      </div>
      <SectionSeam />
    </section>
  );
}
