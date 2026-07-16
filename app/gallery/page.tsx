import type { Metadata } from "next";
import { clinic, gallerySpaces } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery — Clinic Tour",
  description: `Take a look inside ${clinic.name} in Kadarenahalli, Bengaluru — including our glass-walled treatment rooms, visible from the waiting lounge.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-6">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Gallery
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              A look inside,
              <span className="italic text-gold-dark"> before you arrive.</span>
            </h1>
            <p className="mt-5 text-ink/60 max-w-xl">
              Built around light, glass, and openness — here's a walk through
              the clinic's spaces.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallerySpaces.map((space, i) => (
              <Reveal key={space.name} delay={i * 60}>
                <div className="rounded-2xl overflow-hidden border border-ink/10 bg-white/60 h-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-glass/50 via-porcelain-dim to-glass/20 flex items-center justify-center">
                    {space.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover"
                      />
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
