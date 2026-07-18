import type { Metadata } from "next";
import { clinic, gallerySpaces } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Clinic Gallery — Kadarenahalli, Bengaluru",
  description: `Take a look inside ${clinic.name} in Kadarenahalli, Bengaluru — from reception to consultation and treatment spaces.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-6">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Gallery — Kadarenahalli, Bengaluru
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              A look inside,
              <span className="italic text-gold-dark"> before you arrive.</span>
            </h1>
            <p className="mt-5 text-ink/60 max-w-xl">
              A calmer look at the clinic before you arrive — from check-in to
              treatment and follow-up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallerySpaces.map((space, i) => (
              <Reveal key={space.name} delay={i * 60}>
                <div className="rounded-2xl overflow-hidden border border-ink/10 bg-white/60 h-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gold/15 via-porcelain-dim to-teal/10 flex items-center justify-center relative">
                    {space.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={space.image}
                          alt={space.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 bg-ink/60 text-porcelain text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full backdrop-blur">
                          Representative photo
                        </span>
                      </>
                    ) : (
                      <p className="text-ink/30 text-xs text-center px-6">
                        Photo coming soon
                      </p>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg text-ink">{space.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
