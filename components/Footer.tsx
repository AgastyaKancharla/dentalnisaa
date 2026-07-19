import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";
import ClinicOpenStatus from "./ClinicOpenStatus";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain/90 pb-16 md:pb-0 relative">
      {/* Wave divider — curves the page's porcelain background into the
          footer's dark ink, instead of a flat hard edge between them. */}
      <div className="absolute -top-px left-0 right-0 -translate-y-full leading-[0] overflow-hidden">
        <svg
          viewBox="0 0 1440 90"
          className="w-full h-[50px] md:h-[80px]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C240,90 480,0 720,20 C960,40 1200,90 1440,40 L1440,90 L0,90 Z"
            className="fill-ink"
          />
        </svg>
      </div>

      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-20 pb-10">
        {/* Asymmetric layout: the brand + live status anchors the space,
            Explore and Visit/Hours are narrower supporting columns —
            deliberately not four even columns under a centered logo. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Image
              src="/logo-header.png"
              alt={clinic.name}
              width={970}
              height={509}
              className="h-14 md:h-16 w-auto"
            />
            <p className="text-sm text-porcelain/55 max-w-xs mt-5">
              {clinic.tagline}.
            </p>

            <div className="mt-8 pt-6 border-t border-porcelain/10 max-w-xs">
              <ClinicOpenStatus />
            </div>

            <div className="flex items-center gap-3 mt-7">
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

          <div className="lg:col-span-3 text-sm space-y-2">
            <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Explore</p>
            <Link href="/treatments" className="block text-porcelain/70 hover:text-gold-light transition-colors">Treatments</Link>
            <Link href="/gallery" className="block text-porcelain/70 hover:text-gold-light transition-colors">Gallery</Link>
            <Link href="/blog" className="block text-porcelain/70 hover:text-gold-light transition-colors">Blog</Link>
            <Link href="/faq" className="block text-porcelain/70 hover:text-gold-light transition-colors">FAQ</Link>
          </div>

          <div className="lg:col-span-4 text-sm">
            <p className="uppercase tracking-wide text-porcelain/40 text-xs mb-3">Visit</p>
            <div className="space-y-2">
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

            {/* Full weekly hours — secondary detail now that the live
                open/closed status above answers the question most people
                actually have ("can I call right now"). */}
            <details className="group mt-6 pt-5 border-t border-porcelain/10">
              <summary className="focus-ring cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between text-xs uppercase tracking-wide text-porcelain/40">
                Full weekly hours
                <span aria-hidden className="transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-4 space-y-1.5 text-porcelain/55 text-xs">
                {clinic.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span>{h.slots}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
      <div className="border-t border-porcelain/10 py-5 text-center text-xs text-porcelain/40">
        © {new Date().getFullYear()} {clinic.name}. All rights reserved.
      </div>
    </footer>
  );
}
