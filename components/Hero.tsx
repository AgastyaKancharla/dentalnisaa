import Link from "next/link";
import { clinic } from "@/lib/site-data";
import SignatureMark from "./SignatureMark";
import SectionSeam from "./SectionSeam";

export default function Hero() {
  return (
    <section className="relative isolate bg-porcelain overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(124,148,131,0.16),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(138,106,78,0.14),transparent_30%)]" />
      <div className="absolute left-0 right-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/60 to-transparent" />

      <div className="grid lg:grid-cols-[0.92fr_1.08fr] lg:min-h-[720px]">
        <div className="flex items-center px-5 md:pl-10 lg:pl-16 xl:pl-24 md:pr-10 py-16 md:py-24 animate-fadeUp">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex flex-wrap items-center gap-2 rounded-full border border-ink/10 bg-white/55 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark shadow-sm">
              <span>Dentist in Kadarenahalli, Bengaluru</span>
              <span className="h-1 w-1 rounded-full bg-gold-dark/50" />
              <span>Since {clinic.foundedYear}</span>
            </div>

            <h1 className="font-display text-[3.35rem] leading-[0.9] md:text-[5.6rem] md:leading-[0.86] text-ink tracking-[-0.055em]">
              Bengaluru
              <span className="block italic text-gold-dark">smiles,</span>
              cared for
              <span className="block">since 1995.</span>
            </h1>

            <p className="mt-7 max-w-xl text-ink/68 text-lg leading-relaxed">
              DentalNisaa Oral Care brings family dentistry, root canal
              treatment, dental implants, braces, whitening, and emergency
              dental care together in Kadarenahalli — with calm appointments,
              clear guidance, and a team trusted across generations.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold shadow-[0_18px_45px_rgba(33,30,26,0.18)] hover:bg-teal-dark transition-colors"
              >
                Book a dental appointment
              </Link>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full border border-ink/15 bg-white/45 px-6 py-3.5 font-semibold text-ink hover:border-gold-dark/40 hover:text-gold-dark transition-colors"
              >
                Chat on WhatsApp
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-ink/10">
              <div className="py-5 pr-4">
                <p className="font-display text-3xl text-ink">{clinic.rating}★</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
                  {clinic.reviewCount}+ Google reviews
                </p>
              </div>
              <div className="border-l border-ink/10 py-5 px-4">
                <p className="font-display text-3xl text-ink">{clinic.yearsActive}+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
                  Years of care
                </p>
              </div>
              <div className="border-l border-ink/10 py-5 pl-4">
                <p className="font-display text-3xl text-ink">25</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
                  Dental treatments
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[430px] lg:min-h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?fm=jpg&q=80&w=1200&auto=format&fit=crop"
            alt="Modern dental chair at a family dental clinic in Bengaluru"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-porcelain via-porcelain/18 to-transparent lg:from-porcelain/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-5 right-5 md:bottom-10 md:left-10 md:right-auto md:w-[360px] rounded-[2rem] border border-white/35 bg-porcelain/88 p-6 shadow-2xl backdrop-blur">
            <SignatureMark className="absolute -top-7 right-7 h-14 w-14 text-gold-dark" strokeOpacity={0.5} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Signature care plan
            </p>
            <p className="mt-3 font-display text-2xl leading-tight text-ink">
              Prevention-first dentistry for families who want fewer surprises.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink/60">
              <span className="rounded-full bg-white/70 px-3 py-1.5">Root canal</span>
              <span className="rounded-full bg-white/70 px-3 py-1.5">Implants</span>
              <span className="rounded-full bg-white/70 px-3 py-1.5">Braces</span>
              <span className="rounded-full bg-white/70 px-3 py-1.5">Whitening</span>
            </div>
          </div>
        </div>
      </div>
      <SectionSeam />
    </section>
  );
}
