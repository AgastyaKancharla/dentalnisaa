import type { Treatment } from "@/lib/site-data";
import Icon from "./Icon";
import SignatureMark from "./SignatureMark";

// Category → tone mapping for the placeholder art. Kept to the site's
// existing three surfaces (ink, teal/brown, gold/sage) rather than
// inventing new colors — every category still resolves to a token already
// in tailwind.config.ts.
const TONES: Record<string, { bg: string; fg: string; pane: string }> = {
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
  treatment: Pick<Treatment, "name" | "icon" | "category" | "image">;
  variant?: "card" | "hero";
  className?: string;
};

export default function TreatmentMedia({ treatment, variant = "card", className = "" }: Props) {
  const tone = TONES[treatment.category] ?? TONES["Preventive Care"];
  const aspect = variant === "hero" ? "aspect-[16/11] md:aspect-[16/9]" : "aspect-[4/3]";
  const iconSize = variant === "hero" ? "w-16 h-16 md:w-20 md:h-20" : "w-11 h-11";

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
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${tone.bg} ${aspect} ${className}`}
    >
      <SignatureMark
        className={`absolute -right-4 -bottom-4 w-28 h-28 ${tone.pane} ${
          variant === "card" ? "transition-transform duration-500 group-hover:scale-110" : ""
        }`}
      />
      <Icon
        name={treatment.icon}
        className={`${iconSize} ${tone.fg} relative ${
          variant === "card" ? "transition-transform duration-500 group-hover:scale-110" : ""
        }`}
      />
    </div>
  );
}
