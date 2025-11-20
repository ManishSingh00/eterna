import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/store/**/*.{ts,tsx}",
    "./src/utils/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plex)", ...fontFamily.sans],
        mono: ["var(--font-dm)", ...fontFamily.mono],
      },
      colors: {
        pulse: {
          background: "#05060A",
          surface: "#0B0C13",
          surfaceSoft: "#11131D",
          border: "#1C1F2B",
          accent: "#1E9BF0",
          accentMuted: "#1B6EC8",
          success: "#32D583",
          danger: "#F97066",
          warning: "#F7B84B",
          text: "#F5F7FF",
          textMuted: "#B4B7C7",
        },
      },
      boxShadow: {
        pulse: "0 10px 30px rgba(4, 6, 17, 0.45)",
        glow: "0 0 25px rgba(30, 155, 240, 0.35)",
      },
      animation: {
        shimmer: "shimmer 1.2s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
