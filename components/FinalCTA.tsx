import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Reveal, { RevealGroup } from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="bg-ink-soft text-porcelain relative overflow-hidden">
      <RevealGroup className="relative px-5 md:px-10 lg:px-16 xl:px-24 py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display font-light text-4xl md:text-6xl max-w-2xl mx-auto leading-[1.05]">
            Your next appointment could be the start of{" "}
            <span className="italic text-gold-light font-normal">30 more years</span> of
            trusted care.
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-5 text-porcelain/85">
            Kadarenahalli, Bengaluru · {clinic.phone}
          </p>
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center rounded-full bg-gold text-ink-soft px-8 py-4 font-semibold hover:bg-gold-light transition-colors"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center rounded-full border border-porcelain/35 text-porcelain px-8 py-4 font-semibold hover:bg-porcelain/10 transition-colors"
          >
            Call the clinic
          </a>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
