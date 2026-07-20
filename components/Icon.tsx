type IconProps = {
  name: string;
  className?: string;
};

// Minimal single-stroke line icons — matches the premium, understated
// beige, white, and sage aesthetic. All use currentColor so they inherit
// whatever text color class is applied.
const paths: Record<string, JSX.Element> = {
  tooth: (
    <path d="M12 3c-2 0-3 1.2-4 1.2S6.3 3 4.8 3C3 3 2 4.6 2 6.8c0 2.6 1 4 1.4 6.4.4 2.3.7 5.8 2.2 5.8 1.3 0 1.2-3.4 2-5 .4-.8.8-1.2 1.4-1.2s1 .4 1.4 1.2c.8 1.6.7 5 2 5 1.5 0 1.8-3.5 2.2-5.8.4-2.4 1.4-3.8 1.4-6.4C21 4.6 20 3 18.2 3c-1.5 0-2.2 1.2-3.2 1.2S14 3 12 3z" />
  ),
  sparkle: (
    <>
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
    </>
  ),
  align: (
    <>
      <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
    </>
  ),
  implant: (
    <>
      <path d="M12 3v6" strokeLinecap="round" />
      <path d="M8 4.5h8" strokeLinecap="round" />
      <path d="M9 9c0 3-1.5 3.5-1.5 6.5S9 21 12 21s4.5-2.5 4.5-5.5S15 12 15 9" />
    </>
  ),
  mouth: (
    <>
      <path d="M4 12c2-3 5-4 8-4s6 1 8 4c-2 3-5 4-8 4s-6-1-8-4z" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" strokeLinecap="round" strokeWidth="2.4" />
    </>
  ),
  root: (
    <>
      <path d="M9 3h6l1 5-2 2 1 4-2.5 7-2.5-7 1-4-2-2 1-5z" />
    </>
  ),
  bridge: (
    <>
      <path d="M3 17V9c2-2 4-3 9-3s7 1 9 3v8" />
      <path d="M6 17v-5M12 17v-6M18 17v-5" strokeLinecap="round" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="2.4" />
      <circle cx="16" cy="7" r="2.4" />
      <circle cx="12" cy="13" r="1.8" />
      <path d="M3.5 20c0-3 2-5 4.5-5s4.5 2 4.5 5M11.5 20c0-2.4 1.6-4 3.5-4s3.5 1.6 3.5 4" />
    </>
  ),
  shield: (
    <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" />
    </>
  ),
  chat: (
    <path d="M4 5h16v11H8l-4 4V5z" />
  ),
  phone: (
    <path d="M6.5 3.5c.6 0 1.1.4 1.3.9l1.1 2.7c.2.5 0 1-.3 1.4L7.2 10c1 2.3 2.8 4.1 5.1 5.1l1.5-1.4c.4-.3.9-.4 1.4-.3l2.7 1.1c.5.2.9.7.9 1.3v2.3c0 1-.8 1.7-1.8 1.6-9-1-14-6.1-15-15C1 3.8 1.7 3 2.7 3h2.3z" />
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </>
  ),
  scan: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M9 4v16" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  droplet: (
    <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" />
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="5" r="1.8" fill="currentColor" stroke="none" />
      <path d="M4 8.5c2.6.9 5.3 1.3 8 1.3s5.4-.4 8-1.3" strokeLinecap="round" />
      <path d="M12 9.8V21M12 14l-3.5 7M12 14l3.5 7" strokeLinecap="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.4 7-11.5a7 7 0 10-14 0C5 14.6 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" strokeLinecap="round" />
    </>
  ),
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />,
};

// Google's real four-color "G" mark, kept separate from the single-stroke
// set above since it's a fixed-color brand mark, not a currentColor icon —
// used only next to genuine Google review data, never as decoration.
export function GoogleGIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9h11.9c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.9 6.5-9.6 6.5-16.6z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.2-3 .7-4.3v-5.7H4.5C3 16.9 2 20.3 2 24s1 7.1 2.5 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6 1.1 8.3 3.2l6.2-6.2C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

export default function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const path = paths[name] ?? paths.tooth;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
