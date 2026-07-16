import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { clinic } from "@/lib/site-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#2A2723",
};

// JSON-LD structured data — helps Google understand this as a real dental
// clinic (name, hours, ratings, contact) for local search / GBP alignment.
// Update address/geo once the client confirms the relocated address.
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
      postalCode: "560078",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating,
      reviewCount: clinic.reviewCount,
    },
    openingHoursSpecification: clinic.hours
      .filter((h) => h.slots !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: "10:00",
        closes: "20:00",
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <head>
        <DentistSchema />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-porcelain focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
