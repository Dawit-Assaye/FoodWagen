"use strict";

const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ addComponents }) {
    addComponents({
      ".food-card": {
        "@apply food-bg-white food-rounded-3xl food-shadow-raised food-transition food-duration-150 food-ease-out": {},
        transitionProperty: "transform, box-shadow, opacity",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)"
        }
      }
    });
  },
  {
    theme: {
      extend: {
        transitionTimingFunction: {
          "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      }
    }
  }
);

