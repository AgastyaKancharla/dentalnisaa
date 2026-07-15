import type { Metadata } from "next";
import { clinic } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Find address, phone, and opening hours for ${clinic.name} in Kumaraswamy Layout, Bengaluru.`,
  alternates: { canonical: "/contact" },
};

// Until the client confirms an exact Google Maps pin (clinic.address.mapsUrl),
// fall back to a search-based embed using the clinic name + known area. This
// is still a working, functional map today — swap for the confirmed pin
// once available for pinpoint accuracy.
function getMapEmbedSrc() {
  if (clinic.address.mapsUrl) return clinic.address.mapsUrl;
  const query = encodeURIComponent(`${clinic.name}, ${clinic.address.line2}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export default function ContactPage() {
  return (
    <section className="bg-porcelain min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24">
        <p className="text-sm font-semibold text-crimson-dark uppercase tracking-wide mb-3">
          Contact
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-10">
          Find us,{" "}
          <span className="italic text-crimson-dark">reach us.</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Address</p>
              {clinic.address.line1 && (
                <p className="text-ink/80">{clinic.address.line1}</p>
              )}
              <p className="text-ink/80">{clinic.address.line2}</p>
            </div>
            <div>
              <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Phone</p>
              <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="text-ink/80 hover:text-crimson-dark">
                {clinic.phone}
              </a>
            </div>
            <div>
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
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center rounded-full bg-ink text-porcelain px-7 py-3.5 font-semibold hover:bg-sage-dark transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-ink/10 aspect-[4/3]">
            <iframe
              src={getMapEmbedSrc()}
              title={`Map to ${clinic.name}`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
