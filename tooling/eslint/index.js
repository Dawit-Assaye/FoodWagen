"use strict";

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: false,
  ignores: ["dist/**", "node_modules/**", ".next/**"],
  env: {
    es2022: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["import"],
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  rules: {
    "import/no-unresolved": "off",
    "no-console": [
      "warn",
      {
        allow: ["error", "warn"]
      }
    ],
    "no-undef": "off"
  }
};


