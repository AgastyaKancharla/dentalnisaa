import Script from "next/script";

// Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set in Vercel's
// environment variables — see docs/ANALYTICS_SETUP.md for how to get one.
// Same pattern as BOOKING_WEBHOOK_URL: the site works identically whether
// or not this is configured, so there's nothing to break by adding it now.
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
