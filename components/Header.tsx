"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";

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
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-porcelain/95 backdrop-blur border-b border-ink/10">
      <div className="px-5 md:px-10 lg:px-16 xl:px-24 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold/15 text-gold-dark group-hover:bg-gold/25 transition-colors">
            <Icon name="tooth" className="w-[18px] h-[18px]" />
          </span>
          <span className="font-display text-2xl leading-none text-ink">
            Dental<span className="italic text-gold-dark">Nisaa</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href)
                  ? "text-gold-dark font-semibold"
                  : "text-ink/80 hover:text-ink"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="hidden md:inline-flex items-center text-sm font-semibold text-ink/80 hover:text-ink"
          >
            {clinic.phone}
          </a>
          <Link
            href="/booking"
            className="focus-ring hidden md:inline-flex items-center rounded-full bg-ink text-porcelain px-5 py-2.5 text-sm font-semibold hover:bg-teal-dark transition-colors"
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
          <nav className="px-5 md:px-10 lg:px-16 xl:px-24 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 font-medium transition-colors ${
                  isActive(link.href) ? "text-gold-dark font-semibold" : "text-ink/80 hover:text-ink"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
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
