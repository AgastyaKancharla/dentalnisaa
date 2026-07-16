"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { clinic } from "@/lib/site-data";

const navLinks = [
  { href: "/treatments", label: "Treatments" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-porcelain/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full py-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="DentalNisaa Oral Care"
            width={160}
            height={160}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-ink/80">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center text-sm font-semibold text-ink/80 hover:text-ink"
          >
            {clinic.phone}
          </a>
          <Link
            href="/booking"
            className="focus-ring hidden sm:inline-flex items-center rounded-full bg-ink text-porcelain px-5 py-2.5 text-sm font-semibold hover:bg-teal-dark transition-colors"
          >
            Book a visit
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/10 bg-porcelain">
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-ink/80 font-medium hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 inline-flex items-center justify-center rounded-full bg-ink text-porcelain px-5 py-3 text-sm font-semibold"
            >
              Book a visit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
