import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "#FAF9F7",
          dim: "#F2F0EC",
        },
        ink: {
          DEFAULT: "#141414",
          soft: "#2B2B2B",
        },
        crimson: {
          DEFAULT: "#E51F3B",
          light: "#EC5468",
          dark: "#B8172F",
        },
        blush: {
          DEFAULT: "#F4C6CD",
          soft: "#FBE8EC",
        },
        sage: {
          DEFAULT: "#4B7C6F",
          dark: "#345650",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-public-sans)", "system-ui", "sans-serif"],
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
