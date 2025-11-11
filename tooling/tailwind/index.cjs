"use strict";

const plugin = require("./plugin.cjs");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "../../apps/web/src/**/*.{ts,tsx,js,jsx}",
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}",
  ],
  prefix: "food-",
  theme: {
    extend: {
      colors: {
        primary: "#FF5A1F",
        secondary: "#FFB30E",
        accent: "#16A34A",
        muted: "#9CA3AF",
      },
      boxShadow: {
        raised: "0 20px 45px rgba(17, 24, 39, 0.12)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "food-slide-up": "slide-up 0.3s ease-out both",
      },
    },
  },
  plugins: [plugin],
};
