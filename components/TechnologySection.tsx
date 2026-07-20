import Link from "next/link";
import { treatments, gallerySpaces } from "@/lib/site-data";
import Reveal from "./Reveal";
import Icon from "./Icon";

// Only two real, distinct facts exist here (digital imaging, sterilization
// protocol) -- the earlier version split digital imaging into two cards
// ("low-radiation imaging" + "instant results") just to fill a 3-up grid,
// which read as padded, generic AI-copy. Two honest cards, asymmetric
// sizing (matches the DoctorSpotlight pairing elsewhere on the site)
// instead of forcing a third.
export default function TechnologySection() {
  const xray = treatments.find((t) => t.id === "digital-xray");
  const sterilization = gallerySpaces.find((s) => s.name === "Sterilization & Safety");

  return (
    <section className="bg-ink text-porcelain">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Modern dentistry
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight">
            Precision you can see,
            <span className="italic text-gold-light"> safety you can trust.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-10 md:gap-8">
          <Reveal className="md:flex-[1.4]">
            <Link
              href={xray ? `/treatments/${xray.id}` : "/treatments"}
              className="focus-ring group block h-full border border-porcelain/10 p-8 md:p-10 hover:border-gold-light/40 transition-colors"
            >
              <Icon name="scan" className="w-9 h-9 text-gold-light" />
              <h3 className="font-display text-2xl md:text-3xl mt-6 mb-4 leading-snug">
                You're looking at the same screen we are.
              </h3>
              <p className="text-porcelain/60 leading-relaxed max-w-md">
                Digital X-rays show up the moment they're taken — no waiting
                for film, no vague description after the fact. If something
                needs a closer look, your dentist points at the actual
                image while explaining it, in the same visit, using{" "}
                {xray?.overview
                  ? "meaningfully less radiation than traditional film"
                  : "a meaningfully lower dose than traditional film"}
                .
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">
                How digital X-rays work <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={100} className="md:flex-[1]">
            <Link
              href="/gallery"
              className="focus-ring group block h-full border border-porcelain/10 p-8 md:p-10 hover:border-gold-light/40 transition-colors"
            >
              <Icon name="shield" className="w-9 h-9 text-gold-light" />
              <h3 className="font-display text-2xl mt-6 mb-4 leading-snug">
                New gloves. New tray. Every time.
              </h3>
              <p className="text-porcelain/60 leading-relaxed">
                {sterilization?.description ??
                  "Every instrument that touches your mouth goes through the same sterilization cycle, whether you're the first appointment of the morning or the last of the day."}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">
                See the sterilization room <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
