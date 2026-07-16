import Link from "next/link";
import { clinic } from "@/lib/site-data";
import ArchDivider from "./ArchDivider";

export default function Hero() {
  return (
    <section className="relative bg-porcelain">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
        <div className="animate-fadeUp">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-teal-dark bg-teal/10 rounded-full px-4 py-1.5 mb-6">
            <span aria-hidden>★ {clinic.rating}</span>
            <span className="text-ink/30">·</span>
            <span>{clinic.reviewCount}+ Google reviews</span>
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.08] md:text-6xl md:leading-[1.05] text-ink">
            The Bengaluru dentist
            <br />
            your family <span className="italic text-gold-dark">grows up with.</span>
          </h1>

          <p className="mt-6 text-lg text-ink/70 max-w-lg">
            For {clinic.yearsActive} years, DentalNisaa has cared for
            grandparents, parents and children in Kadarenahalli —
            painless treatment, honest advice, and treatment rooms built on
            trust: fully visible through glass, right from our waiting
            lounge.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
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
              className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative animate-fadeUp">
          <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-glass/60 via-porcelain-dim to-glass/30 border border-white/60 overflow-hidden flex items-center justify-center">
            <p className="text-ink/35 text-sm text-center px-10">
              Clinic photo coming soon — our glass-walled treatment rooms,
              as seen from the waiting lounge.
            </p>
          </div>
          <div className="glass-panel absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 hidden sm:block">
            <p className="text-xs uppercase tracking-wide text-ink/50 font-semibold">
              Since {clinic.foundedYear}
            </p>
            <p className="font-display text-xl text-ink mt-0.5">
              {clinic.yearsActive} years in Bengaluru
            </p>
          </div>
        </div>
      </div>
      <ArchDivider to="#2A2723" />
    </section>
  );
}
