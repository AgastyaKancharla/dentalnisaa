import { doctors, clinic } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";

// A doctor's initial letter, used as a signature monogram when there's no
// photo yet -- e.g. "Dr. Neha" -> "N". Deliberately not a generic person
// icon or gray silhouette; it borrows the same display serif used in the
// headlines so the empty state still feels art-directed rather than broken.
function monogram(name: string) {
  const cleaned = name.replace(/^Dr\.?\s*/i, "").trim();
  return cleaned.charAt(0).toUpperCase() || "?";
}

export default function DoctorSpotlight({ topDivider = true }: { topDivider?: boolean }) {
  return (
    <section className="bg-ink text-porcelain relative">
      {topDivider && <SectionSeam tone="dark" />}
      <div className={`px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28 ${topDivider ? "pt-16 md:pt-20" : "pt-16 md:pt-20"}`}>
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Meet our doctors
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            A team our patients have trusted for {clinic.yearsActive}{" "}
            years.
          </h2>
        </div>

        {doctors.length > 0 ? (
          // Asymmetric editorial pairing instead of a mirrored grid: the two
          // cards are different widths and offset vertically from each
          // other, so it reads as a profile spread rather than a personnel
          // directory. Falls back to a plain stack on mobile.
          <div className="flex flex-col sm:flex-row sm:items-start gap-10 sm:gap-8 md:gap-12">
            {doctors.map((doctor, i) => {
              const offset = i % 2 === 1 ? "sm:mt-16" : "";
              const basis = i % 2 === 0 ? "sm:flex-[1.15]" : "sm:flex-[0.85]";
              return (
                <div key={doctor.name} className={`${basis} ${offset} max-w-md`}>
                  <div className="relative w-full aspect-[4/5] border border-porcelain/15 overflow-hidden bg-white/[0.02]">
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
                  <h3 className="font-display text-2xl mt-5">{doctor.name}</h3>
                  {(doctor.title || doctor.experience) && (
                    <p className="mt-1 text-sm text-porcelain/60">
                      {[doctor.title, doctor.experience].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {doctor.bio && (
                    <p className="mt-3 text-porcelain/75 leading-relaxed text-sm">
                      {doctor.bio}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl">
            <p className="text-porcelain/75 leading-relaxed max-w-xl">
              Full team profiles coming soon. In the meantime, call or
              WhatsApp {clinic.phone} and the team will be happy to
              introduce you.
            </p>
          </div>
        )}
      </div>
      <SectionSeam tone="dark" />
    </section>
  );
}
