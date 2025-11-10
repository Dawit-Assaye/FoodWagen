"use strict";

const reactConfig = require("./react");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...reactConfig,
  extends: [...(reactConfig.extends ?? []), "plugin:@next/next/core-web-vitals"],
  rules: {
    ...reactConfig.rules,
    "@next/next/no-html-link-for-pages": "off"
  }
};


