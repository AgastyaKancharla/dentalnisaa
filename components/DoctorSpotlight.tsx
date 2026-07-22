import { doctors, clinic } from "@/lib/site-data";
import SectionSeam from "./SectionSeam";
import DoctorCard from "./DoctorCard";

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
                <DoctorCard
                  key={doctor.name}
                  doctor={doctor}
                  basis={basis}
                  offset={offset}
                  delay={i * 180}
                />
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
