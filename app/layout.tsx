import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans, Parisienne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import TouchSmoke from "@/components/TouchSmoke";
import ConditionalChrome from "@/components/ConditionalChrome";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { clinic } from "@/lib/site-data";
import { parseSlots, formatMinutesAsIsoTime } from "@/lib/clinic-status";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // 300 for the huge hero display size (Fraunces gets noticeably more
  // characterful — softer curves, ink-trap-like details — at low
  // weight/very large size than at the 500/600 this page used everywhere
  // before), up through 600 for section heads and 700 for the rare
  // moment that needs real display weight.
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
});

// Single weight, used only for the one signature word in the Hero — kept
// deliberately narrow in scope so it doesn't become a second body/display
// font and doesn't add real weight to the font payload.
const parisienne = Parisienne({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

const title = "DentalNisaa Oral Care | Dentist in Kadarenahalli, Bengaluru";
const description =
  "Family dental clinic in Kadarenahalli, Bengaluru since 1995. 4.8★ from 195+ reviews. Root canal, implants, braces & more. Book online or on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.website),
  title: { default: title, template: `%s | ${clinic.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: clinic.website,
    siteName: clinic.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F402C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// JSON-LD structured data — helps Google understand this as a real dental
// clinic (name, hours, ratings, contact) for local search / GBP alignment.
function DentistSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    image: `${clinic.website}/logo.png`,
    url: clinic.website,
    telephone: clinic.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.line1 || undefined,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      // Derived from line2 ("Bengaluru, Karnataka 560078") rather than
      // hardcoded a second time — a prior version duplicated the pincode
      // here and it silently drifted out of sync with lib/site-data.ts.
      postalCode: clinic.address.line2.match(/\d{6}/)?.[0],
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating,
      reviewCount: clinic.reviewCount,
    },
    openingHoursSpecification: clinic.hours
      .filter((h) => h.slots !== "Closed")
      .flatMap((h) =>
        parseSlots(h.slots).map((range) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: formatMinutesAsIsoTime(range.start),
          closes: formatMinutesAsIsoTime(range.end),
        }))
      ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Applies the returning visitor's saved accessibility preferences before the
// page paints. Without this, AccessibilityWidget's own useEffect only runs
// post-hydration, so every page briefly loads at the default font size and
// then visibly jumps to 112.5% a tick later for anyone who'd turned on
// "Larger text" on a previous visit.
const a11yFlashPreventionScript = `(function(){try{var r=document.documentElement;if(localStorage.getItem("a11y-large-text")==="1")r.classList.add("a11y-large-text");if(localStorage.getItem("a11y-reduce-motion")==="1")r.classList.add("a11y-reduce-motion");}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} ${parisienne.variable}`}>
      <head>
        <DentistSchema />
        <script dangerouslySetInnerHTML={{ __html: a11yFlashPreventionScript }} />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-porcelain focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-20 md:pt-24">{children}</main>
        <ConditionalChrome>
          <Footer />
          <StickyCTA />
        </ConditionalChrome>
        <AccessibilityWidget />
        <TouchSmoke />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
