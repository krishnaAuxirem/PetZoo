import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#F97316",
          "orange-dark": "#EA6C0A",
          "orange-light": "#FFF7ED",
          blue: "#0EA5E9",
          "blue-dark": "#0284C7",
          "blue-light": "#E0F2FE",
          green: "#22C55E",
          "green-dark": "#16A34A",
        },
        light: {
          bg: "#F8FAFC",
          sidebar: "#1E293B",
          card: "#FFFFFF",
          text: "#0F172A",
          border: "#E2E8F0",
          muted: "#64748B",
          hover: "#FFF7ED",
        },
        dark: {
          bg: "#0F172A",
          sidebar: "#020617",
          card: "#111827",
          orange: "#FB923C",
          blue: "#38BDF8",
          green: "#34D399",
          heading: "#F8FAFC",
          body: "#CBD5E1",
          border: "#1E293B",
          muted: "#94A3B8",
          hover: "#1E293B",
        },
      },
      animation: {
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "scroll-up": "scrollUp 20s linear infinite",
        "counter": "counter 2s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #F97316 0%, #0EA5E9 100%)",
        "dark-hero": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        "orange-gradient": "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
        "blue-gradient": "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.15)",
        orange: "0 4px 20px rgba(249,115,22,0.4)",
        blue: "0 4px 20px rgba(14,165,233,0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
