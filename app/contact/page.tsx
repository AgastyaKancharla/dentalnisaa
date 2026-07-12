import { clinic } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <section className="bg-porcelain min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-24 md:pt-24">
        <p className="text-sm font-semibold text-brass-dark uppercase tracking-wide mb-3">
          Contact
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-10">
          Find us,{" "}
          <span className="italic text-brass-dark">reach us.</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Address</p>
              <p className="text-ink/80">{clinic.address.line1}</p>
              <p className="text-ink/80">{clinic.address.line2}</p>
            </div>
            <div>
              <p className="text-sm text-ink/50 uppercase tracking-wide mb-1">Phone</p>
              <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="text-ink/80 hover:text-brass-dark">
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

          <div className="rounded-2xl bg-ink/5 border border-ink/10 aspect-[4/3] flex items-center justify-center text-ink/40 text-sm text-center px-6">
            Map embed — pending confirmed address
          </div>
        </div>
      </div>
    </section>
  );
}
