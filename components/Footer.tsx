import Link from "next/link";
import { clinic } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain/90">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl mb-3">
            Dental<span className="text-crimson-light italic">Nisaa</span>
          </div>
          <p className="text-sm text-porcelain/60 max-w-xs">
            {clinic.tagline}.
          </p>
        </div>

        <div className="text-sm space-y-2">
          <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Visit</p>
          {clinic.address.line1 && <p>{clinic.address.line1}</p>}
          <p>{clinic.address.line2}</p>
          <p className="pt-2">
            <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="hover:text-crimson-light">
              {clinic.phone}
            </a>
          </p>
        </div>

        <div className="text-sm space-y-2">
          <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Hours</p>
          {clinic.hours.map((h) => (
            <div key={h.day} className="flex justify-between gap-4 text-porcelain/70">
              <span>{h.day}</span>
              <span>{h.slots}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-porcelain/10 py-5 text-center text-xs text-porcelain/40">
        © {new Date().getFullYear()} {clinic.name}. All rights reserved.
      </div>
    </footer>
  );
}
