"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { clinic } from "@/lib/site-data";
import FullScreenMenu from "./FullScreenMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-porcelain/95 backdrop-blur border-b border-ink/10 shadow-sm"
        }`}
      >
        <div
          className={`px-5 md:px-10 lg:px-16 xl:px-24 flex items-center justify-between transition-all duration-300 ${
            transparent ? "h-24 md:h-28" : "h-16 md:h-20"
          }`}
        >
          <Link href="/" className="flex items-center h-full py-1 md:py-1.5" onClick={() => setOpen(false)}>
            <Image
              src="/logo-header.png"
              alt={clinic.name}
              width={970}
              height={509}
              className={`h-full w-auto object-contain transition-all duration-300 ${
                transparent ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : ""
              }`}
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className={`focus-ring hidden md:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                transparent
                  ? "bg-porcelain/95 text-ink hover:bg-porcelain"
                  : "bg-ink text-porcelain hover:bg-teal-dark"
              }`}
            >
              Book Appointment
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`focus-ring inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border transition-colors ${
                transparent
                  ? "bg-ink border-porcelain/20 text-porcelain hover:bg-ink/85"
                  : "border-ink/15 text-ink hover:bg-ink/5"
              }`}
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
