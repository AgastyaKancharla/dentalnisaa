import Link from "next/link";
import { clinic } from "@/lib/site-data";

export default function FinalCTA() {
  return (
    <section className="bg-glass-soft">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-ink max-w-2xl mx-auto leading-tight">
          Your next appointment could be the start of{" "}
          <span className="italic text-gold-dark">30 more years</span> of
          trusted care.
        </h2>
        <p className="mt-4 text-ink/60">
          Kadarenahalli, Bengaluru · {clinic.phone}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-teal-dark transition-colors"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center rounded-full border border-ink/20 text-ink px-7 py-3.5 font-semibold hover:bg-ink/5 transition-colors"
          >
            Call the clinic
          </a>
        </div>
      </div>
    </section>
  );
}
