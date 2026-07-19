import SignatureMark from "./SignatureMark";

// A crisp editorial divider with a small custom mark, used to keep section
// transitions deliberate without falling back to template wave dividers.
export default function SectionSeam({ tone = "light" }: { tone?: "light" | "dark" }) {
  const markColor = tone === "light" ? "text-ink/25" : "text-porcelain/25";
  return (
    <div className="relative h-px w-full">
      <div className={tone === "light" ? "absolute inset-0 bg-ink/10" : "absolute inset-0 bg-porcelain/10"} />
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 relative">
        <SignatureMark className={`w-8 h-8 -translate-y-1/2 ${markColor}`} />
      </div>
    </div>
  );
}
