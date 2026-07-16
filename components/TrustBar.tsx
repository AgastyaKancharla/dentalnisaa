import { trustPoints } from "@/lib/site-data";

export default function TrustBar() {
  return (
    <section className="bg-ink text-porcelain">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustPoints.map((point, i) => (
            <div
              key={point.label}
              className={`py-10 md:py-12 ${i % 2 === 0 ? "pr-6" : "pl-6"} ${
                i < 2 ? "border-b md:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r" : ""} ${
                i % 4 !== 3 ? "md:border-r" : ""
              } border-porcelain/10`}
            >
              <p className="font-display text-2xl md:text-[2.75rem] leading-none text-porcelain">
                {point.label}
              </p>
              <p className="mt-3 text-xs md:text-sm text-porcelain/45 leading-snug uppercase tracking-wide">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
