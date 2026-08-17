import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";

export const metadata: Metadata = {
  title: "Contact Us — Kadarenahalli, Bengaluru",
  description: `Find address, phone, and opening hours for ${clinic.name} in Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/contact" },
};

// clinic.address.mapsUrl is a maps.app.goo.gl share link — meant for
// click-through navigation (used as an href elsewhere), not for embedding.
// Google's share-link redirect pages refuse to render inside an iframe, so
// the embedded map always uses a search-based embed URL instead.
function getMapEmbedSrc() {
  const query = encodeURIComponent(
    `${clinic.name}, ${clinic.address.line1}, ${clinic.address.line2}`
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-beige-deep to-porcelain min-h-[70vh]">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-20 pb-16 md:pt-24">
        <Reveal>
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Contact — Kadarenahalli, Bengaluru
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            Find us,{" "}
            <span className="italic text-gold-dark">reach us.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-xl leading-relaxed">
            Kadarenahalli's own dental clinic — call, WhatsApp, or book
            online, and we'll take it from there.
          </p>
        </Reveal>

        <Reveal delay={90} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
          <span className="inline-flex items-center gap-2 text-sm text-ink/70">
            <Stars rating={clinic.rating} className="w-4 h-4" />
            {clinic.rating} · {clinic.reviewCount}+ reviews
          </span>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="focus-ring inline-flex items-center gap-1.5 font-semibold text-ink hover:text-gold-dark transition-colors"
          >
            Call now
            <span aria-hidden>→</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 font-semibold text-ink hover:text-gold-dark transition-colors"
          >
            WhatsApp us
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal className="surface-panel rounded-2xl p-7 space-y-6 h-fit">
            <div className="flex gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark">
                <Icon name="pin" className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Address</p>
                {clinic.address.line1 && (
                  <p className="text-ink/80">{clinic.address.line1}</p>
                )}
                <p className="text-ink/80">{clinic.address.line2}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark">
                <Icon name="phone" className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Phone</p>
                <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="text-ink/80 hover:text-gold-dark">
                  {clinic.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark">
                <Icon name="clock" className="w-5 h-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Hours</p>
                <div className="space-y-1">
                  {clinic.hours.map((h) => (
                    <div key={h.day} className="flex justify-between max-w-xs text-ink/70 text-sm">
                      <span>{h.day}</span>
                      <span>{h.slots}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/booking"
                className="focus-ring inline-flex items-center rounded-full bg-sand text-ink px-6 py-3 text-sm font-semibold hover:bg-sand-light transition-colors"
              >
                Book a visit
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90} className="rounded-2xl overflow-hidden border border-ink/10 aspect-[4/3]">
            <iframe
              src={getMapEmbedSrc()}
              title={`Map to ${clinic.name}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
