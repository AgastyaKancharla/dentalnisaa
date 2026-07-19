import Link from "next/link";
import { treatments, gallerySpaces } from "@/lib/site-data";
import Reveal from "./Reveal";
import Icon from "./Icon";

// Built only from facts already published elsewhere on the site (the
// digital-xray treatment page, the sterilization gallery entry) — the brief
// asked to "explain benefits instead of equipment," which also keeps this
// section honest instead of listing brand-name machines the clinic hasn't
// confirmed it owns.
export default function TechnologySection() {
  const xray = treatments.find((t) => t.id === "digital-xray");
  const sterilization = gallerySpaces.find((s) => s.name === "Sterilization & Safety");

  const cards = [
    {
      icon: "scan",
      title: "Digital, low-radiation imaging",
      detail:
        xray?.overview ??
        "Digital X-rays reveal what a visual exam can't, using significantly less radiation than traditional film.",
      href: xray ? `/treatments/${xray.id}` : "/treatments",
    },
    {
      icon: "shield",
      title: "Sterilization, every time",
      detail:
        sterilization?.description ??
        "Instrument sterilization and hygiene protocols followed for every single patient, every single time.",
      href: "/gallery",
    },
    {
      icon: "sparkle",
      title: "Instant results, clearer answers",
      detail:
        "Digital imaging displays immediately, so your dentist can explain findings and next steps in the same visit.",
      href: xray ? `/treatments/${xray.id}` : "/treatments",
    },
  ];

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

        <div className="grid md:grid-cols-3 gap-px bg-porcelain/10">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80} className="bg-ink">
              <Link
                href={card.href}
                className="focus-ring group block h-full p-8 hover:bg-porcelain/[0.04] transition-colors"
              >
                <Icon name={card.icon} className="w-8 h-8 text-gold-light" />
                <h3 className="font-display text-xl mt-6 mb-3">{card.title}</h3>
                <p className="text-sm text-porcelain/55 leading-relaxed">{card.detail}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
