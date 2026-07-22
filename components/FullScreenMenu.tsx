"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic } from "@/lib/site-data";
import Icon from "./Icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/gallery", label: "Smile Gallery" },
  { href: "/#reviews", label: "Patient Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function FullScreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-ink text-porcelain overflow-y-auto"
        >
          <div className="px-5 md:px-10 lg:px-16 xl:px-24 py-6 flex items-center justify-between">
            <span className="font-display text-2xl">
              Dental<span className="italic text-gold-light">Nisaa</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="focus-ring inline-flex items-center justify-center w-11 h-11 rounded-full border border-porcelain/20 text-porcelain hover:bg-porcelain/10 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="px-5 md:px-10 lg:px-16 xl:px-24 pb-16 pt-6 md:pt-10 grid md:grid-cols-[1.2fr_1fr] gap-12">
            <nav>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.4, delay: 0.06 * i, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`focus-ring block py-3 md:py-4 font-display text-4xl md:text-5xl leading-tight border-b border-porcelain/10 transition-colors ${
                      isActive(link.href) ? "text-gold-light" : "hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * navLinks.length, ease: "easeOut" }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  onClick={onClose}
                  className="focus-ring inline-flex items-center rounded-full bg-gold text-ink px-7 py-3.5 font-semibold hover:bg-gold-light transition-colors"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="space-y-8 md:pt-2"
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-porcelain/20 px-5 py-3 text-sm font-semibold hover:bg-porcelain/10 transition-colors"
                >
                  <Icon name="phone" className="w-4 h-4" />
                  Call Clinic
                </a>
                <a
                  href={`https://wa.me/${clinic.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-porcelain/20 px-5 py-3 text-sm font-semibold hover:bg-porcelain/10 transition-colors"
                >
                  <Icon name="chat" className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-porcelain/40 mb-2">
                  Clinic Hours
                </p>
                <div className="space-y-1 text-sm text-porcelain/70">
                  {clinic.hours.slice(0, 2).map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 max-w-xs">
                      <span>{h.day}</span>
                      <span>{h.slots}</span>
                    </div>
                  ))}
                  <p className="text-porcelain/40 pt-1">Mon–Sat · Closed Sundays</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-porcelain/40 mb-2">
                  Address
                </p>
                <p className="text-sm text-porcelain/70 max-w-xs leading-relaxed">
                  {clinic.address.line2}
                </p>
              </div>

              {clinic.instagram && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-porcelain/40 mb-2">
                    Follow
                  </p>
                  <a
                    href={clinic.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-semibold text-porcelain/80 hover:text-gold-light transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
