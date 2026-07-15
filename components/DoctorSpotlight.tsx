import { doctors, clinic } from "@/lib/site-data";
import ArchDivider from "./ArchDivider";

export default function DoctorSpotlight() {
  return (
    <section className="bg-ink text-porcelain relative">
      <ArchDivider to="#2A2723" />
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-28 pt-2 md:pt-4">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-gold-light uppercase tracking-wide mb-3">
            Meet our doctors
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            A team our patients have trusted for {clinic.yearsActive}{" "}
            years.
          </h2>
        </div>

        {doctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.name}>
                <div className="w-full aspect-square rounded-2xl bg-porcelain/10 border border-porcelain/15 flex items-center justify-center text-porcelain/40 text-sm text-center px-6 mb-5">
                  {doctor.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    "Photo coming soon"
                  )}
                </div>
                <h3 className="font-display text-xl">{doctor.name}</h3>
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
            ))}
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
      <ArchDivider from="#2A2723" to="#FDFCF9" flip />
    </section>
  );
}
