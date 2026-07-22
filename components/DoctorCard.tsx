"use client";

import { useInView } from "@/lib/useInView";

// This section's animation signature: the photo/monogram frame reveals
// via a clip-path wipe from the center outward, like a spotlight curtain
// opening -- fitting for "Doctor Spotlight" specifically, and distinct
// from every other section's entrance treatment.
function monogram(name: string) {
  const cleaned = name.replace(/^Dr\.?\s*/i, "").trim();
  return cleaned.charAt(0).toUpperCase() || "?";
}

export default function DoctorCard({
  doctor,
  basis,
  offset,
  delay,
}: {
  doctor: {
    name: string;
    photo?: string | null;
    title?: string | null;
    experience?: string | null;
    bio?: string | null;
  };
  basis: string;
  offset: string;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={`${basis} ${offset} max-w-md`}>
      <div
        className="relative w-full aspect-[4/5] border border-porcelain/15 overflow-hidden bg-white/[0.02]"
        style={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)",
          transition: "clip-path 900ms cubic-bezier(0.65, 0, 0.35, 1)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {doctor.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display leading-none text-porcelain/[0.09] select-none"
              style={{ fontSize: "min(40vw, 11rem)" }}
            >
              {monogram(doctor.name)}
            </span>
            <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-porcelain/30">
              Photo coming soon
            </span>
          </>
        )}
      </div>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 500ms ease-out, transform 500ms ease-out",
          transitionDelay: `${delay + 400}ms`,
        }}
      >
        <h3 className="font-display text-2xl mt-5">{doctor.name}</h3>
        {(doctor.title || doctor.experience) && (
          <p className="mt-1 text-sm text-porcelain/60">
            {[doctor.title, doctor.experience].filter(Boolean).join(" · ")}
          </p>
        )}
        {doctor.bio && (
          <p className="mt-3 text-porcelain/75 leading-relaxed text-sm">{doctor.bio}</p>
        )}
      </div>
    </div>
  );
}
