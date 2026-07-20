import Link from "next/link";
import { treatments, gallerySpaces } from "@/lib/site-data";
import Reveal from "./Reveal";
import Icon from "./Icon";

type Step = { icon: string; label: string };

function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center text-center w-20 sm:w-24">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold-light/30 bg-gold-light/[0.06] flex items-center justify-center">
              <Icon name={step.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-gold-light" />
            </div>
            <p className="mt-3 text-xs sm:text-sm text-porcelain/70 leading-snug">
              {step.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="w-6 sm:w-10 h-px bg-porcelain/15 shrink-0 -mt-6" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

// Rebuilt around what actually happens, step by step, instead of a
// paragraph describing it -- the process itself is the visual, not an
// icon-plus-caption card. Two real, distinct processes; no third one
// invented to fill a grid.
export default function TechnologySection() {
  const xray = treatments.find((t) => t.id === "digital-xray");
  const sterilization = gallerySpaces.find((s) => s.name === "Sterilization & Safety");

  return (
    <section className="bg-ink text-porcelain overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <Reveal className="max-w-xl mb-16 md:mb-20">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Modern dentistry
          </p>
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-tight">
            Precision you can see,
            <span className="italic text-gold-light"> safety you can trust.</span>
          </h2>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {/* Digital imaging, told as the moments it actually happens in */}
          <Reveal>
            <div className="grid md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-10 pb-8 border-b border-porcelain/10">
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-2">
                  From scan to answer, one visit.
                </h3>
                <p className="text-porcelain/55 max-w-md text-sm leading-relaxed">
                  {xray?.overview ??
                    "Digital X-rays use meaningfully less radiation than traditional film."}
                </p>
              </div>
              <Link
                href={xray ? `/treatments/${xray.id}` : "/treatments"}
                className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-porcelain transition-colors shrink-0"
              >
                How digital X-rays work <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="pt-10 overflow-x-auto">
              <StepFlow
                steps={[
                  { icon: "scan", label: "Scan taken" },
                  { icon: "monitor", label: "On screen instantly" },
                  { icon: "chat", label: "Explained together" },
                ]}
              />
            </div>
          </Reveal>

          {/* Sterilization, told as the real cycle every instrument goes through */}
          <Reveal delay={100}>
            <div className="grid md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-10 pb-8 border-b border-porcelain/10">
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-2">
                  Every instrument, the same cycle.
                </h3>
                <p className="text-porcelain/55 max-w-md text-sm leading-relaxed">
                  {sterilization?.description ??
                    "Every instrument that touches your mouth goes through the same sterilization cycle, whether you're the first appointment of the morning or the last of the day."}
                </p>
              </div>
              <Link
                href="/gallery"
                className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-porcelain transition-colors shrink-0"
              >
                See the sterilization room <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="pt-10 overflow-x-auto">
              <StepFlow
                steps={[
                  { icon: "droplet", label: "Cleaned" },
                  { icon: "shield", label: "Sterilized" },
                  { icon: "lock", label: "Sealed until use" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
