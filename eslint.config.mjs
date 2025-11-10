import { createRequire } from "module";

const require = createRequire(import.meta.url);
const nextConfig = require("@foodwagen/eslint-config/next");

export default [
  {
    ignores: ["**/*.config.{js,ts,cjs,mjs}", "**/dist/**", "**/.next/**"]
  },
  {
    ...nextConfig,
    files: ["apps/web/**/*.{ts,tsx,js,jsx}", "packages/**/*.{ts,tsx,js,jsx}"]
  }
];

