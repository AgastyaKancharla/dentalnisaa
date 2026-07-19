import { clinic, testimonials } from "@/lib/site-data";
import { appointmentSteps } from "./AppointmentProcess";
import Icon from "./Icon";

export default function BookingSidebar() {
  const quote = testimonials[0];

  return (
    <aside className="space-y-6">
      {/* Trust strip */}
      <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
        <div className="flex items-center gap-2 text-gold-dark" aria-hidden>
          <span className="tracking-tight">★★★★★</span>
        </div>
        <p className="mt-2 font-display text-2xl text-ink">
          {clinic.rating} <span className="text-base font-body font-normal text-ink/50">/ 5</span>
        </p>
        <p className="text-sm text-ink/55">
          {clinic.reviewCount}+ Google reviews · {clinic.yearsActive} years in Kadarenahalli
        </p>
      </div>

      {/* Clinic info + mini map */}
      <div className="rounded-2xl border border-ink/10 bg-white/60 overflow-hidden">
        <div className="aspect-[16/9]">
          <iframe
            src={
              clinic.address.mapsUrl ||
              `https://www.google.com/maps?q=${encodeURIComponent(clinic.name + ", " + clinic.address.line2)}&output=embed`
            }
            title={`Map to ${clinic.name}`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-3">
            <Icon name="pin" className="w-4 h-4 shrink-0 mt-0.5 text-teal-dark" />
            <div className="text-sm text-ink/70">
              {clinic.address.line1 && <p>{clinic.address.line1}</p>}
              <p>{clinic.address.line2}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="clock" className="w-4 h-4 shrink-0 mt-0.5 text-teal-dark" />
            <div className="text-sm text-ink/70 space-y-0.5">
              {clinic.hours.slice(0, 2).map((h) => (
                <div key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span>{h.slots}</span>
                </div>
              ))}
              <p className="text-ink/40">Mon–Sat · Closed Sundays</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="phone" className="w-4 h-4 shrink-0 mt-0.5 text-teal-dark" />
            <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="focus-ring text-sm text-ink/70 hover:text-ink">
              {clinic.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Condensed "what happens next" */}
      <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
        <p className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-4">After you book</p>
        <ol className="space-y-4">
          {appointmentSteps.slice(0, 3).map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-ink text-porcelain text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{step.title}</p>
                <p className="text-xs text-ink/55 leading-relaxed">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* One real patient quote */}
      {quote && (
        <div className="rounded-2xl bg-ink text-porcelain p-6">
          <p className="font-display text-lg leading-snug">"{quote.quote}"</p>
          <p className="mt-3 text-sm text-porcelain/60">
            {quote.author} · {quote.context}
          </p>
        </div>
      )}
    </aside>
  );
}
