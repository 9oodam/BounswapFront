/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // false = 다크모드 끔, class = className = "dark"로 다크모드 설정가능
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      mobile: { min: "0px", max: "428px" },

      pc: { min: "429px", max: "9999px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
