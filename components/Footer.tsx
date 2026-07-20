import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";
import ClinicOpenStatus from "./ClinicOpenStatus";
import WeeklyHours from "./WeeklyHours";
import SignatureMark from "./SignatureMark";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain/90 pb-16 md:pb-0 relative overflow-hidden">
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

      <SignatureMark
        className="absolute -right-10 -top-10 w-72 h-72 md:w-96 md:h-96 text-porcelain/[0.05] pointer-events-none"
        strokeOpacity={0.6}
      />

      <div className="px-5 md:px-10 lg:px-16 xl:px-24 pt-16 md:pt-20 relative">
        {/* The footer's one big statement — oversized display type as the
            focal point, not tucked-away fine print. Phone + live status
            sit right beneath it since that's the natural next action for
            anyone who reads "come say hello." */}
        <div className="pb-14 md:pb-16 border-b border-porcelain/10">
          <p className="text-xs uppercase tracking-wide text-porcelain/40 mb-5">
            Ready when you are
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] max-w-3xl">
            Come say{" "}
            <Magnetic pull={0.3} className="align-middle">
              <span className="font-script text-gold-light text-[1.3em] leading-none">
                hello.
              </span>
            </Magnetic>
          </h2>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Magnetic pull={0.2}>
              <a
                href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                className="focus-ring inline-flex items-center gap-3 font-display text-2xl md:text-3xl text-porcelain hover:text-gold-light transition-colors"
              >
                <Icon name="phone" className="w-6 h-6 md:w-7 md:h-7 shrink-0" />
                {clinic.phone}
              </a>
            </Magnetic>
            <ClinicOpenStatus />
          </div>
        </div>

        {/* Supporting detail — same info as before, now clearly secondary
            to the statement above. Rebuilt from three plain text columns
            into two: a signature block (logo/tagline/social), and a single
            bordered panel with a real embedded map of the actual clinic
            address, since a wall of address text was the flattest part of
            the old layout. */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 pt-12 pb-10">
          <div>
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

            <div className="flex items-center gap-3 mt-7">
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DentalNisaa on Instagram"
                className="focus-ring w-11 h-11 flex items-center justify-center border border-porcelain/15 hover:border-gold-light hover:text-gold-light hover:scale-110 transition-all"
              >
                <Icon name="instagram" className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message DentalNisaa on WhatsApp"
                className="focus-ring w-11 h-11 flex items-center justify-center border border-porcelain/15 hover:border-gold-light hover:text-gold-light hover:scale-110 transition-all"
              >
                <Icon name="chat" className="w-4 h-4" />
              </a>
              <a
                href={clinic.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions on Google Maps"
                className="focus-ring w-11 h-11 flex items-center justify-center border border-porcelain/15 hover:border-gold-light hover:text-gold-light hover:scale-110 transition-all"
              >
                <Icon name="pin" className="w-4 h-4" />
              </a>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-2 gap-y-2 mt-9">
              {[
                ["Treatments", "/treatments"],
                ["Gallery", "/gallery"],
                ["Blog", "/blog"],
                ["FAQ", "/faq"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="focus-ring text-xs uppercase tracking-wide border border-porcelain/15 px-3 py-1.5 text-porcelain/65 hover:border-gold-light hover:text-gold-light transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border border-porcelain/10">
            <div className="aspect-[16/9] grayscale-[35%] contrast-[1.05] opacity-90">
              <iframe
                title={`${clinic.name} location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${clinic.address.line1}, ${clinic.address.line2}`
                )}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-porcelain/60 leading-relaxed">
                {clinic.address.line1}
                <br />
                {clinic.address.line2}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <a
                  href={clinic.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-porcelain/20 px-4 py-2 text-sm font-semibold text-porcelain hover:border-gold-light hover:text-gold-light transition-colors"
                >
                  Get directions <span aria-hidden>→</span>
                </a>
              </div>

              <details className="group mt-6 pt-5 border-t border-porcelain/10">
                <summary className="focus-ring cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between text-xs uppercase tracking-wide text-porcelain/40">
                  Full weekly hours
                  <span aria-hidden className="transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <WeeklyHours />
              </details>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-porcelain/10 py-5 text-center text-xs text-porcelain/40 relative">
        © {new Date().getFullYear()} {clinic.name}. All rights reserved.
      </div>
    </footer>
  );
}
