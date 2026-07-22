/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // /book (multi-step wizard) was an unfinished parallel build that
      // never got linked from anywhere on the site — every real CTA
      // (Header, StickyCTA, Hero, FinalCTA, every treatment page, blog,
      // contact) already points to /booking. Redirecting rather than
      // deleting the wizard's source files: this repo has several
      // sessions actively committing in parallel right now, and removing
      // files mid-flight is the highest-risk kind of change to make
      // under those conditions. This achieves the same practical outcome
      // (nobody lands on /book again) without touching anyone else's
      // in-progress work.
      {
        source: "/book/:path*",
        destination: "/booking",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
