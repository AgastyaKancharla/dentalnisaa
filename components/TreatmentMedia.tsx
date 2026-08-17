import type { Treatment } from "@/lib/site-data";
import { isStockImage } from "@/lib/site-data";
import Icon from "./Icon";
import SignatureMark from "./SignatureMark";

// Category → tone mapping for the placeholder art. Kept to the site's
// existing three surfaces (ink, teal/brown, gold/sage) rather than
// inventing new colors — every category still resolves to a token already
// in tailwind.config.ts. Exported so other components (e.g. the Treatments
// index hero's category mosaic) can reuse the exact same palette instead
// of redefining it.
export const TONES: Record<string, { bg: string; fg: string; pane: string }> = {
  "Preventive Care": { bg: "bg-mist-soft", fg: "text-teal-dark", pane: "text-teal/30" },
  "Cosmetic Dentistry": { bg: "bg-gold/15", fg: "text-gold-dark", pane: "text-gold/40" },
  Orthodontics: { bg: "bg-ink/[0.06]", fg: "text-ink", pane: "text-ink/25" },
  "Restorative & Implants": { bg: "bg-teal/10", fg: "text-teal-dark", pane: "text-teal/30" },
  "Oral Surgery": { bg: "bg-ink/[0.08]", fg: "text-ink/80", pane: "text-ink/25" },
  "Family & Pediatric": { bg: "bg-gold/15", fg: "text-gold-dark", pane: "text-gold/40" },
  "Emergency Care": { bg: "bg-ink text-porcelain", fg: "text-porcelain", pane: "text-porcelain/25" },
  "Advanced Technology": { bg: "bg-mist", fg: "text-ink", pane: "text-ink/25" },
};

type Props = {
  treatment: Pick<Treatment, "name" | "icon" | "category" | "image" | "duration">;
  variant?: "card" | "hero";
  className?: string;
};

export default function TreatmentMedia({ treatment, variant = "card", className = "" }: Props) {
  const tone = TONES[treatment.category] ?? TONES["Preventive Care"];
  const aspect = variant === "hero" ? "aspect-[16/11] md:aspect-[16/9]" : "aspect-[4/3]";
  const iconSize = variant === "hero" ? "w-20 h-20 md:w-28 md:h-28" : "w-11 h-11";

  if (treatment.image) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={treatment.image}
          alt={treatment.name}
          className={`absolute inset-0 w-full h-full object-cover ${
            variant === "card" ? "transition-transform duration-500 group-hover:scale-105" : ""
          }`}
          loading={variant === "hero" ? "eager" : "lazy"}
        />
        {/* Same disclosure pattern as the Gallery — but only on stock
            imagery. Photographs actually taken at the clinic carry no
            badge: labelling the clinic's own rooms "representative" would
            disown the real thing. */}
        {isStockImage(treatment.image) && (
          <span className="absolute top-3 right-3 bg-ink/60 text-porcelain text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur">
            Representative photo
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${tone.bg} ${aspect} ${className}`}
    >
      <SignatureMark
        className={`absolute pointer-events-none ${
          variant === "hero"
            ? "-right-10 -bottom-14 w-64 h-64 md:w-72 md:h-72"
            : "-right-4 -bottom-4 w-28 h-28"
        } ${tone.pane} ${
          variant === "card" ? "transition-transform duration-500 group-hover:scale-110" : ""
        }`}
      />
      {/* A soft radial lift behind the icon so it reads as lit rather than
          flat-pasted on the tone fill — matters most on the hero variant,
          which is the only fallback rendered at full size with nothing
          else on the page to give it depth. */}
      {variant === "hero" && (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.white/40),transparent_70%)]"
          aria-hidden
        />
      )}
      <Icon
        name={treatment.icon}
        className={`${iconSize} ${tone.fg} relative ${
          variant === "card" ? "transition-transform duration-500 group-hover:scale-110" : ""
        }`}
      />
      {variant === "hero" && treatment.duration && (
        <div className="absolute bottom-4 left-4 surface-panel rounded-full px-4 py-2 text-xs font-semibold text-ink/80">
          {treatment.duration}
        </div>
      )}
    </div>
  );
}
