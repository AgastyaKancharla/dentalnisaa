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
          DEFAULT: "#FBF8F3",
          dim: "#F3EEE5",
        },
        ink: {
          DEFAULT: "#16302E",
          soft: "#2A4744",
        },
        brass: {
          DEFAULT: "#A8794F",
          light: "#C79F73",
          dark: "#7D5A38",
        },
        blush: {
          DEFAULT: "#E7B7A3",
          soft: "#F1D6C9",
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
