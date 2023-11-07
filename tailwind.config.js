/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  },
  // false = 다크모드 끔, class = className = "dark"로 다크모드 설정가능
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "green-yellow":
          "linear-gradient(125deg, #B2FF96 38.14%, #FFFB88 77.5%);",
        "gradient-2": "linear-gradient(125deg, #FF96B2 38.14%, #FF88FB 77.5%)",
        "gradient-3": "linear-gradient(125deg, #96B2FF 38.14%, #889FFB 77.5%)",
        "gradient-4": "linear-gradient(125deg, #96FFB2 38.14%, #88FFFB 77.5%)",
      }),

      colors: {
        "green-yellow-base": "#FDFDFD",
        "green-yellow-accent": "#338415",
        "custom-accent": "#9CE084",
      },

      borderRadius: {
        bodyBackRadius: "20px",
        coinLogo: "2em",
        coinBox: "15px",
      },
    },
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
