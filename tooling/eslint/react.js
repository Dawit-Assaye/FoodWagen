"use strict";

const baseConfig = require("./index");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ...baseConfig.parserOptions,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [...new Set([...(baseConfig.plugins ?? []), "react", "react-hooks", "@typescript-eslint"])],
  extends: [
    ...(baseConfig.extends ?? []),
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    ...baseConfig.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }
    ]
  }
};


