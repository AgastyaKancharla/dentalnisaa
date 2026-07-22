"use client";

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  // Previously hid Footer/StickyCTA on /book (an unfinished, unlinked
  // booking wizard). That route now permanently redirects to /booking
  // (see next.config.js), so there's nothing left to special-case here.
  // Kept as a pass-through wrapper rather than removed from layout.tsx,
  // in case a future focused/checkout-style flow needs this again.
  return <>{children}</>;
}
