import GlassPanes from "./GlassPanes";

// Replaces the old wave/arch divider (a dated 2019-era template signal) with
// a hard color edge and a small glass-pane mark sitting on the seam —
// architectural rather than organic, and tied to the site's one visual motif
// instead of a generic decorative squiggle.
export default function SectionSeam({ tone = "light" }: { tone?: "light" | "dark" }) {
  const markColor = tone === "light" ? "text-ink/25" : "text-porcelain/25";
  return (
    <div className="relative h-px w-full">
      <div className={tone === "light" ? "absolute inset-0 bg-ink/10" : "absolute inset-0 bg-porcelain/10"} />
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 relative">
        <GlassPanes className={`w-8 h-8 -translate-y-1/2 ${markColor}`} />
      </div>
    </div>
  );
}
