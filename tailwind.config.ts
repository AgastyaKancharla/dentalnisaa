import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Real brand colors from the client's onboarding form: sage green,
        // beige, brown, black. Neutral token names keep the visual system focused on sage, beige,
        // brown, and black without tying components to a retired story.
        porcelain: {
          DEFAULT: "#FAF6EE", // beige base
          dim: "#EDE4D2", // deeper beige for section fills
        },
        ink: {
          DEFAULT: "#211E1A", // near-black
          soft: "#37322B", // brown-black for secondary dark surfaces
        },
        gold: {
          DEFAULT: "#7C9483", // sage green (primary accent)
          light: "#A8BCA3",
          dark: "#546B57",
        },
        mist: {
          DEFAULT: "#E1DCC8", // pale sage-beige tint
          soft: "#F1EEE1",
        },
        teal: {
          DEFAULT: "#8A6A4E", // brown (secondary accent)
          dark: "#5E4531",
        },
        // A deeper, more saturated warm beige/tan than porcelain (which is
        // intentionally pale, for backgrounds). This is beige's turn to
        // carry real visual weight — used as the solid-fill color for
        // secondary buttons sitewide, paired next to sage-green primary
        // buttons, so beige reads as an equally deliberate accent choice
        // rather than just "the page background."
        sand: {
          DEFAULT: "#C9A66B",
          light: "#DCC495",
          dark: "#93753F",
        },
        // Added for the TrustBar / Transparency re-theme: these two sections
        // were dark (bg-ink), which read as a jarring flip against the
        // beige/cream base everywhere else. Converted to warm beige with
        // sage accents instead, per exact hex values agreed on.
        beige: {
          deep: "#F4EFE6", // section background, warmer/deeper than porcelain
        },
        sage: {
          DEFAULT: "#8CA68A", // accent — stars, numerals, dividers
          pale: "#DCE3D8", // card fills
          deep: "#5C6B5A", // body text on beige needing more contrast, hovers
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        arch: "999px 999px 0 0",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        orbDriftA: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(40px, -30px) scale(1.05)" },
        },
        orbDriftB: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-35px, 25px) scale(1.04)" },
        },
        orbPulse: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(15px, -10px) scale(1.08)" },
        },
        particleDriftA: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(15px, -20px)" },
          "50%": { transform: "translate(-10px, -35px)" },
          "75%": { transform: "translate(20px, -15px)" },
        },
        particleDriftB: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(-20px, -25px)" },
          "66%": { transform: "translate(10px, -30px)" },
        },
        particleDriftC: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-15px, 20px)" },
        },
        toothFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        heroSpin: "heroSpin 25s linear infinite",
        orbDriftA: "orbDriftA 24s ease-in-out infinite",
        orbDriftB: "orbDriftB 29s ease-in-out infinite",
        orbPulse: "orbPulse 20s ease-in-out infinite",
        particleDriftA: "particleDriftA 22s ease-in-out infinite",
        particleDriftB: "particleDriftB 27s ease-in-out infinite",
        particleDriftC: "particleDriftC 19s ease-in-out infinite",
        toothFloat: "toothFloat 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
