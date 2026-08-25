"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { clinic } from "@/lib/site-data";
import FullScreenMenu from "./FullScreenMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Plain, always-solid strip — logo left, Book Appointment (desktop)
          + hamburger right. No transparent-over-hero state: that required
          an outline hack on the logo to stay visible against photos, which
          looked worse than just having a normal solid header bar. */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-ink/10 shadow-sm"
      >
        <div className="px-5 md:px-10 lg:px-16 xl:px-24 h-20 md:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center h-full py-1.5 md:py-2" onClick={() => setOpen(false)}>
            <Image
              src="/logo-header.png"
              alt={clinic.name}
              width={1154}
              height={545}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="focus-ring hidden md:inline-flex items-center rounded-full bg-ink text-porcelain px-5 py-2.5 text-sm font-semibold hover:bg-teal-dark transition-colors"
            >
              Book Appointment
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="focus-ring inline-flex items-center justify-center w-11 h-11 rounded-full border border-ink/15 text-ink hover:bg-ink/5 transition-colors"
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
