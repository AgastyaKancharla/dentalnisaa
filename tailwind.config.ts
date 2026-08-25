import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rebrand, Aug 2026 — colors sampled directly from the client's own
        // logo file (public/logo.png): the dark green and gold are exact
        // pixel reads off the artwork (see contrast2.py in that PR), not
        // hand-typed approximations. Every existing token *name* is kept so
        // every page that already reads bg-ink, text-gold, bg-sand etc.
        // picks up the new identity automatically; only the hex values
        // changed. Every text/background pairing is checked against WCAG AA
        // (4.5:1 body, 3:1 large-text-or-icon).
        porcelain: {
          DEFAULT: "#FFFFFF", // white — primary light surface
          dim: "#F1E4C8", // light tan cream, gold-shaded — alternate section fill
        },
        ink: {
          DEFAULT: "#0F402C", // logo green — primary text color AND primary dark surface
          soft: "#082416", // near-black green — deepest dark surface (footer-weight sections)
        },
        gold: {
          DEFAULT: "#D1A057", // logo gold — buttons, large display type, icons, dividers.
          // 2.4:1 on white: reserve for large/bold text (18px+/14px-bold)
          // and non-text UI, never small body copy on a light surface.
          light: "#DDB273", // gold on dark green — 6:1, safe for running text on ink
          dark: "#835D28", // deep gold-brown — 5.9:1 on white / 4.8:1 on cream, the
          // only gold safe for small text (eyebrows, links) on a light surface
        },
        mist: {
          DEFAULT: "#E4D6B0", // soft tan-gold divider tint
          soft: "#F6EEDC", // lightest cream, alternate section fill
        },
        teal: {
          DEFAULT: "#3E6B52", // mid forest green — secondary dark accent
          dark: "#0C3524", // deep forest — hover state for dark-green buttons
        },
        sand: {
          DEFAULT: "#C79A5B", // tan-gold — secondary button fill
          light: "#DDBB84",
          dark: "#8A6530",
        },
        beige: {
          deep: "#F3E6C9", // light tan cream section fill (matches porcelain.dim)
        },
        sage: {
          DEFAULT: "#D1A057", // alias to gold — stars, dividers, numerals
          pale: "#F1E4C8", // light cream card fill
          deep: "#835D28", // deep gold — highlighted accent text, AA-safe on light bg
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
