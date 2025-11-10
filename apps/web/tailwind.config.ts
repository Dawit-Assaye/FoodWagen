import type { Config } from "tailwindcss";
import baseConfig from "@foodwagen/tailwind-config";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/providers/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
