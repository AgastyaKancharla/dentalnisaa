"use client";

import { usePathname } from "next/navigation";

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The booking wizard is a focused, checkout-like flow — a full marketing
  // footer and the call/WhatsApp/book sticky bar underneath it work against
  // "extremely simple, under 60 seconds," so both are hidden here only.
  if (pathname.startsWith("/book")) return null;
  return <>{children}</>;
}
