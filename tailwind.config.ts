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
          DEFAULT: "#FDFCF9",
          dim: "#EFE7D8",
        },
        ink: {
          DEFAULT: "#2A2723",
          soft: "#3E3A34",
        },
        gold: {
          DEFAULT: "#B8935A",
          light: "#D4B483",
          dark: "#8F6F3F",
        },
        glass: {
          DEFAULT: "#D9E6E2",
          soft: "#EDF3F1",
        },
        teal: {
          DEFAULT: "#6E8F87",
          dark: "#4C6961",
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
