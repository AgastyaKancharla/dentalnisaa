import Link from "next/link";
import { clinic } from "@/lib/site-data";
import ArchDivider from "./ArchDivider";

export default function Hero() {
  return (
    <section className="relative bg-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-2xl animate-fadeUp">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-sage-dark bg-sage/10 rounded-full px-4 py-1.5 mb-6">
            <span aria-hidden>★ {clinic.rating}</span>
            <span className="text-ink/30">·</span>
            <span>{clinic.reviewCount}+ Google reviews</span>
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.08] md:text-6xl md:leading-[1.05] text-ink">
            The dentist your family
            <br />
            <span className="italic text-brass-dark">grows up with.</span>
          </h1>

          <p className="mt-6 text-lg text-ink/70 max-w-lg">
            For {clinic.yearsActive} years, DentalNisaa has cared for
            grandparents, parents and children in Kumaraswamy Layout —
            painless treatment, honest advice, and a clinic that remembers
            your name.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/booking"
              className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-sage-dark transition-colors"
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
      </div>
      <ArchDivider to="#16302E" />
    </section>
  );
}
