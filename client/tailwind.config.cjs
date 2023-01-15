/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary_grey: "#444",
      secondary: "#44D7B6",
      secondary_tint: "#36ac92",
      background: "#F4F4F4",
      white: "#fff",
    },
    extend: {
      keyframes: {
        enter: {
          "0%": { transform: "translateX(-1%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        shake: {
          "0%": { transform: "translateX(-2%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
