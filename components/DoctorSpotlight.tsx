import { doctors } from "@/lib/site-data";
import ArchDivider from "./ArchDivider";

export default function DoctorSpotlight() {
  const doctor = doctors[0];

  return (
    <section className="bg-ink text-porcelain relative">
      <ArchDivider to="#141414" />
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-28 pt-2 md:pt-4">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-center">
          <div className="w-full aspect-square rounded-2xl bg-porcelain/10 border border-porcelain/15 flex items-center justify-center text-porcelain/40 text-sm text-center px-6">
            {doctor.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              "Doctor photo coming soon"
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-crimson-light uppercase tracking-wide mb-3">
              Meet your dentist
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              {doctor.name}
            </h2>
            <p className="mt-1 text-porcelain/60">
              {doctor.title} · {doctor.experience}
            </p>
            <p className="mt-6 text-porcelain/75 leading-relaxed max-w-xl">
              {doctor.bio}
            </p>
          </div>
        </div>
      </div>
      <ArchDivider from="#141414" to="#FAF9F7" flip />
    </section>
  );
}
