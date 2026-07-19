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
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
