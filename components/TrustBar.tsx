import { trustPoints } from "@/lib/site-data";
import ArchDivider from "./ArchDivider";

export default function TrustBar() {
  return (
    <section className="bg-ink text-porcelain">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {trustPoints.map((point) => (
            <div key={point.label} className="text-center md:text-left">
              <p className="font-display text-3xl md:text-4xl text-brass-light italic">
                {point.label}
              </p>
              <p className="mt-2 text-sm text-porcelain/60 leading-snug">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ArchDivider from="#16302E" to="#FBF8F3" flip />
    </section>
  );
}
