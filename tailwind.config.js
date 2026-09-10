/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Civic Radiance Primary Palette (Deep Civic Blue & Institutional Trust)
        "primary": "#002e87",
        "primary-deep": "#001b58",
        "on-primary": "#ffffff",
        "primary-container": "#002e87",
        "on-primary-container": "#7e9bf8",
        "inverse-primary": "#b5c4ff",
        "primary-fixed": "#dbe1ff",
        "primary-fixed-dim": "#b5c4ff",
        "on-primary-fixed": "#00174d",
        "on-primary-fixed-variant": "#1e4098",

        // Secondary Palette (Fresh Aqua Cyan & Environmental Clarity)
        "secondary": "#006970",
        "on-secondary": "#ffffff",
        "secondary-container": "#96eef7",
        "on-secondary-container": "#006d75",
        "secondary-fixed": "#99f1fa",
        "secondary-fixed-dim": "#7cd4dd",
        "on-secondary-fixed": "#002022",
        "on-secondary-fixed-variant": "#004f55",

        // Tertiary Palette (Solar Amber & Recognition Highlights)
        "tertiary": "#8f4c00",
        "tertiary-deep": "#371900",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#eb851c",
        "on-tertiary-container": "#ffffff",
        "tertiary-fixed": "#ffdcc3",
        "tertiary-fixed-dim": "#ffb77d",
        "on-tertiary-fixed": "#2f1500",
        "on-tertiary-fixed-variant": "#6e3900",

        // Civic Emerald (Cleanliness & Eco-Stewardship)
        "civic-green": "#00875a",
        "civic-green-dark": "#006b47",
        "civic-green-light": "#8df7c1",

        // Surfaces & Containers (Glassmorphism & Depth)
        "surface": "#faf8ff",
        "surface-dim": "#d2d9f4",
        "surface-bright": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "surface-variant": "#dae2fd",
        "surface-tint": "#3b59b1",

        "on-surface": "#131b2e",
        "on-surface-variant": "#444652",
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
        "outline": "#747683",
        "outline-variant": "#c4c6d4",
        "background": "#faf8ff",
        "on-background": "#131b2e",

        // Error & Emergency Alerts
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        headline: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        glass: "0 12px 32px -4px rgba(0, 46, 135, 0.12), 0 4px 12px -2px rgba(131, 219, 228, 0.08)",
        "glass-hover": "0 16px 28px -6px rgba(0, 46, 135, 0.25), 0 6px 10px -2px rgba(217, 119, 6, 0.15)",
        "civic-glow": "0 0 24px rgba(0, 105, 112, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      }
    },
  },
  plugins: [],
}
