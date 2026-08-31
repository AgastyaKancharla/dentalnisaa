import type { Metadata } from "next";
import { clinic, gallerySpaces } from "@/lib/site-data";
import Reveal from "@/components/Reveal";
import GalleryShowcase from "@/components/GalleryShowcase";

export const metadata: Metadata = {
  title: "Clinic Gallery — Kadarenahalli, Bengaluru",
  description: `Take a look inside ${clinic.name} in Kadarenahalli, Bengaluru — from reception to consultation and treatment spaces.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-10 md:pb-14">
          <Reveal>
            <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
              Gallery — Kadarenahalli, Bengaluru
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              A look inside,
              <span className="italic text-gold-dark"> before you arrive.</span>
            </h1>
            <p className="mt-5 text-ink/60 max-w-xl">
              {gallerySpaces.length} spaces, from check-in to treatment and
              follow-up — a calmer look at the clinic before your first visit.
              Tap any photo to see it larger.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-20 md:pb-28">
          <GalleryShowcase />
        </div>
      </section>
    </>
  );
}
