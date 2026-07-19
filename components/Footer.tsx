import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain/90 pb-16 md:pb-0">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl mb-3">
            Dental<span className="text-gold-light italic">Nisaa</span>
          </div>
          <p className="text-sm text-porcelain/60 max-w-xs">
            {clinic.tagline}.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href={clinic.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DentalNisaa on Instagram"
              className="focus-ring w-9 h-9 flex items-center justify-center border border-porcelain/15 hover:border-gold-light hover:text-gold-light transition-colors"
            >
              <Icon name="instagram" className="w-4 h-4" />
            </a>
            <a
              href={clinic.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions on Google Maps"
              className="focus-ring w-9 h-9 flex items-center justify-center border border-porcelain/15 hover:border-gold-light hover:text-gold-light transition-colors"
            >
              <Icon name="pin" className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-sm space-y-2">
          <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Explore</p>
          <Link href="/treatments" className="block text-porcelain/70 hover:text-gold-light transition-colors">Treatments</Link>
          <Link href="/gallery" className="block text-porcelain/70 hover:text-gold-light transition-colors">Gallery</Link>
          <Link href="/blog" className="block text-porcelain/70 hover:text-gold-light transition-colors">Blog</Link>
          <Link href="/faq" className="block text-porcelain/70 hover:text-gold-light transition-colors">FAQ</Link>
        </div>

        <div className="text-sm space-y-2">
          <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Visit</p>
          {clinic.address.line1 && <p>{clinic.address.line1}</p>}
          <p>{clinic.address.line2}</p>
          <a
            href={clinic.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-block text-gold-light hover:text-porcelain transition-colors pt-1"
          >
            Get directions →
          </a>
          <p className="pt-2">
            <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="hover:text-gold-light">
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
