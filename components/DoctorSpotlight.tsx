import { doctors, clinic } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";
import Reveal, { RevealGroup } from "./Reveal";
import Icon from "./Icon";

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
    <section className="bg-porcelain text-ink relative">
      {topDivider && <SectionSeam tone="light" />}
      <div className={`px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28 ${topDivider ? "pt-16 md:pt-20" : "pt-16 md:pt-20"}`}>
        {/* Same eyebrow → heading cascade every other section opens with. */}
        <RevealGroup className="max-w-2xl mb-14 md:mb-20">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-[0.14em] mb-4">
              Meet our doctors
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.03]">
              A team our patients have trusted for{" "}
              <span className="italic text-gold-dark font-normal">{clinic.yearsActive} years.</span>
            </h2>
          </Reveal>
        </RevealGroup>

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
                // Media variant: the portrait settles into its frame rather
                // than sliding, matching how photographs enter everywhere else.
                <Reveal
                  key={doctor.name}
                  variant="media"
                  delay={i * 90}
                  className={`${basis} ${offset} max-w-md`}
                >
                  {/* Plain (non-motion) wrapper for hover interactions: framer-motion
                      already drives this element's transform for the scroll-in
                      settle, so hover lift lives one level down where a Tailwind
                      hover:transform class won't fight it. */}
                  <div className="group">
                    <div className="relative w-full aspect-[4/5] rounded-2xl border border-ink/10 overflow-hidden bg-gold/10 transition-colors duration-300 group-hover:border-gold/40">
                      {doctor.photo ? (
                        <div className="relative w-full h-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={doctor.photo}
                            alt={doctor.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-porcelain/90 backdrop-blur flex items-center justify-center border border-gold/30 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                            <Icon name="tooth" className="w-4 h-4 text-gold-dark" />
                          </span>
                        </div>
                      ) : (
                        <>
                          <span
                            aria-hidden
                            className="absolute inset-0 flex items-center justify-center font-display leading-none text-gold-dark/20 select-none"
                            style={{ fontSize: "min(40vw, 11rem)" }}
                          >
                            {monogram(doctor.name)}
                          </span>
                          <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-ink/60">
                            Photo coming soon
                          </span>
                        </>
                      )}
                    </div>
                    <div className="transition-transform duration-300 group-hover:-translate-y-1">
                      <h3 className="font-display text-3xl mt-6">{doctor.name}</h3>
                      {(doctor.title || doctor.experience) && (
                        <p className="mt-1.5 text-sm text-ink/70">
                          {[doctor.title, doctor.experience].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {doctor.credentials && doctor.credentials.length > 0 && (
                        // Listed rather than run together into the title line:
                        // these are the specific, checkable things a patient
                        // scans for, and a comma-separated string buries them.
                        // Each cascades in on its own beat once the card is in
                        // view, instead of the whole list appearing as one block.
                        <RevealGroup className="mt-4" stagger={0.06}>
                          <ul className="space-y-1.5">
                            {doctor.credentials.map((credential) => (
                              <li key={credential}>
                                <Reveal variant="text">
                                  <div className="group/cred flex items-start gap-2.5 text-sm text-ink/80 leading-snug transition-transform duration-200 hover:translate-x-1">
                                    <span
                                      className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-gold shrink-0 transition-transform duration-200 group-hover/cred:scale-125"
                                      aria-hidden
                                    />
                                    {credential}
                                  </div>
                                </Reveal>
                              </li>
                            ))}
                          </ul>
                        </RevealGroup>
                      )}
                      {doctor.bioLede && (
                        // A short, scannable hook ahead of the fuller bio —
                        // set apart in size/weight so the paragraph below it
                        // doesn't read as one undifferentiated block of text.
                        <p className="mt-4 font-display text-lg leading-snug text-ink">
                          {doctor.bioLede}
                        </p>
                      )}
                      {doctor.bio && (
                        <p className="mt-2.5 text-ink/70 leading-relaxed text-sm">
                          {doctor.bio}
                        </p>
                      )}
                      {doctor.quote && (
                        <p className="mt-4 font-display italic text-gold-dark text-xl leading-snug transition-colors duration-300 hover:text-gold">
                          "{doctor.quote}"
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl">
            <p className="text-ink/70 leading-relaxed max-w-xl">
              Full team profiles coming soon. In the meantime, call or
              WhatsApp {clinic.phone} and the team will be happy to
              introduce you.
            </p>
          </div>
        )}
      </div>
      <SectionSeam tone="light" />
    </section>
  );
}
