import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "@/components/Icon";
import Reveal, { RevealGroup } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Contact Us — Kadarenahalli, Bengaluru",
  description: `Find address, phone, and opening hours for ${clinic.name} in Kadarenahalli, Bengaluru.`,
  alternates: { canonical: "/contact" },
};

// clinic.address.mapsUrl is a maps.google.com "search" URL — meant for
// click-through navigation (used as an href elsewhere), not for embedding.
// Google Maps' own result pages refuse to render inside an iframe, so the
// embedded map always uses a dedicated `output=embed` URL instead.
function getMapEmbedSrc() {
  const query = encodeURIComponent(
    `${clinic.name}, ${clinic.address.line1}, ${clinic.address.line2}`
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export default function ContactPage() {
  return (
    <section className="bg-porcelain min-h-[70vh]">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 pb-24 md:pt-24">
        <Reveal>
          <p className="text-sm font-semibold text-gold-dark uppercase tracking-wide mb-3">
            Contact — Kadarenahalli, Bengaluru
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-10">
            Find us,{" "}
            <span className="italic text-gold-dark">reach us.</span>
          </h1>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          <RevealGroup className="surface-panel rounded-2xl p-7 space-y-2 h-fit" stagger={0.08}>
            {/* Address and phone are whole clickable rows now, not just an
                inline link buried in the text — the icon lifts and a
                "Get directions" hint fades in so the row visibly invites
                the tap instead of just tolerating it. */}
            <Reveal>
              <a
                href={clinic.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/row focus-ring -mx-3 flex gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-teal/5"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark transition-transform duration-300 group-hover/row:scale-110">
                  <Icon name="pin" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Address</p>
                  {clinic.address.line1 && (
                    <p className="text-ink/80 group-hover/row:text-ink transition-colors">
                      {clinic.address.line1}
                    </p>
                  )}
                  <p className="text-ink/80 group-hover/row:text-ink transition-colors">
                    {clinic.address.line2}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-teal-dark opacity-0 -translate-x-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all duration-200">
                    Get directions <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            </Reveal>

            <Reveal>
              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="group/row focus-ring -mx-3 flex gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-teal/5"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark transition-transform duration-300 group-hover/row:scale-110">
                  <Icon name="phone" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-ink/80 group-hover/row:text-ink transition-colors">
                    {clinic.phone}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-teal-dark opacity-0 -translate-x-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all duration-200">
                    Tap to call <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            </Reveal>

            <Reveal>
              <div className="flex gap-4 px-3 py-2.5">
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal/10 text-teal-dark">
                  <Icon name="clock" className="w-5 h-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Hours</p>
                  <div className="space-y-0.5 -mx-2">
                    {clinic.hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between max-w-xs text-ink/70 text-sm rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-teal/5 hover:text-ink"
                      >
                        <span>{h.day}</span>
                        <span>{h.slots}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="flex flex-wrap gap-3 pt-4 px-3">
              <Magnetic pull={0.25}>
                <a
                  href={`https://wa.me/${clinic.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-6 py-3 text-sm font-semibold hover:bg-teal-dark transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </Magnetic>
              <Magnetic pull={0.25}>
                <Link
                  href="/booking"
                  className="focus-ring inline-flex items-center rounded-full bg-sand text-ink px-6 py-3 text-sm font-semibold hover:bg-sand-light transition-colors"
                >
                  Book a visit
                </Link>
              </Magnetic>
            </Reveal>
          </RevealGroup>

          <Reveal
            delay={90}
            variant="media"
            className="group relative rounded-2xl overflow-hidden border border-ink/10 aspect-[4/3] transition-colors duration-300 hover:border-gold/40"
          >
            <iframe
              src={getMapEmbedSrc()}
              title={`Map to ${clinic.name}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* The iframe itself swallows clicks, so the overlay link only
                appears (and only becomes clickable) on hover — it doesn't
                sit in front of the interactive map the rest of the time.
                Needs an explicit z-index: browsers commonly composite an
                <iframe> as its own layer that paints above sibling content
                regardless of DOM order, so without one this button is
                actually interactive on hover (verified via computed style)
                but invisible, painted underneath the map. */}
            <a
              href={clinic.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring absolute inset-x-4 bottom-4 z-10 inline-flex items-center gap-1.5 self-start rounded-full bg-ink/85 backdrop-blur text-porcelain px-4 py-2 text-sm font-semibold opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto w-fit"
            >
              Open in Google Maps <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
