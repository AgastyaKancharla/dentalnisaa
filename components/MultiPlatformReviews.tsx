"use client";

import { clinic } from "@/lib/site-data";
import AnimatedCounter from "./AnimatedCounter";
import Tilt3D from "./Tilt3D";
import { GoogleGIcon } from "./Icon";
import { useInView } from "@/lib/useInView";

// Not just a static line of text -- each platform is its own tilting card
// (reusing the same Tilt3D built for the Technology section) that links
// out to the real review page, and the total counts up rather than sitting
// there as a flat number. Every number here traces back to
// clinic.reviewPlatforms in site-data.ts -- nothing invented.
const brandAccent: Record<string, string> = {
  Google: "text-porcelain",
  Practo: "text-[#39B54A]",
  Justdial: "text-[#EE5A24]",
};

function PlatformMark({ name }: { name: string }) {
  if (name === "Google") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <GoogleGIcon className="w-4 h-4" />
        <span className="font-semibold">Google</span>
      </span>
    );
  }
  return <span className={`font-semibold ${brandAccent[name] ?? "text-porcelain"}`}>{name}</span>;
}

export default function MultiPlatformReviews() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const total = clinic.reviewPlatforms.reduce((sum, p) => sum + p.count, 0);
  const platformCount = clinic.reviewPlatforms.length;

  return (
    <div ref={ref} className="mb-16 md:mb-20">
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 600ms ease-out, transform 600ms ease-out",
        }}
      >
        <p className="text-sm text-porcelain/50">
          Not just one review site —{" "}
          <span className="text-porcelain font-semibold">
            <AnimatedCounter value={total} suffix="+" /> real reviews
          </span>{" "}
          across {platformCount} platforms
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        {clinic.reviewPlatforms.map((platform, i) => (
          <div
            key={platform.name}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 600ms ease-out, transform 600ms ease-out",
              transitionDelay: `${150 + i * 120}ms`,
            }}
          >
            <Tilt3D maxDeg={8}>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group block border border-porcelain/10 hover:border-gold-light/40 p-5 transition-colors"
              >
                <PlatformMark name={platform.name} />
                <p className="font-display text-3xl mt-3">
                  {platform.rating.toFixed(1)}
                  <span className="text-gold-light">★</span>
                </p>
                <p className="text-xs text-porcelain/45 mt-1">
                  <AnimatedCounter value={platform.count} suffix="+ reviews" />
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-porcelain/40 group-hover:text-gold-light transition-colors">
                  View reviews <span aria-hidden>→</span>
                </span>
              </a>
            </Tilt3D>
          </div>
        ))}
      </div>
    </div>
  );
}
