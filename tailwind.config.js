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
        headerBack:
          "linear-gradient(90deg, rgba(162,231,158,0.8) 0%, rgba(224,250,150,0.8) 100%);",
        AppFooterBack:
          "linear-gradient(90deg, rgba(213,246,151,1) 0%, rgba(245,255,148,1) 100%)",
        D_AppFooterBack:
        "linear-gradient(90deg, rgba(0, 0, 0, 100) 0%, rgba(0, 0, 0, 100) 100%)",
        "green-yellow":
          "linear-gradient(125deg, #B2FF96 38.14%, #FFFB88 77.5%);",
        "red-pink": "linear-gradient(125deg, #FF96B2 38.14%, #FF88FB 77.5%)",
        "gradient-3": "linear-gradient(125deg, #96B2FF 38.14%, #889FFB 77.5%)",
        "gradient-4": "linear-gradient(125deg, #96FFB2 38.14%, #88FFFB 77.5%)",
      }),

      colors: {
        opercityBlack: "#37373740",
        opercityAppFooter: "#373737cc",
        deepBlack: "#454545",
        lightBlack: "#7C7C7C",
        cardWhite: "#ffffffd9",
        baseWhite: "#ffffff",
        deepGreen: "#338415",
        lightGreen: "#75e090",
        deepYellow: "#D8D46C",
        lightYellow: "#f5f070",

        D_opercityBlack: "rgba(0, 0, 0, 0)", // swap contrainer
        D_deepBlack: "#ffffff",
        D_lightBlack: "#c8c8c8",
        D_cardWhite: "#373737cc", // input
        D_baseWhite: "#454545",
        D_deepGreen: "#34c200cc",
        D_lightGreen: "#c0fea9",
        D_deepYellow: "#ece753",
        D_lightYellow: "#000000",
        // D_opercityBlack: "#37373740",
        // D_deepBlack: "#ffffff",
        // D_lightBlack: "#c8c8c8",
        // D_cardWhite: "#37373740",
        // D_baseWhite: "#454545",
        // D_deepGreen: "#34c200",
        // D_lightGreen: "#c0fea9",
        // D_deepYellow: "#ece753",
        // D_lightYellow: "#fffcb2",
      },

      borderRadius: {
        bodyBackRadius: "20px",
        coinLogo: "2em",
        coinBox: "15px",
      },

      height: {
        custom: "calc(100% - 16px)",
      },
      aspectRatio: {
        "1/1": "1 / 1",
      },
    },
    screens: {
      mobile: { min: "0px", max: "1259px" },

      pc: { min: "1260px", max: "9999px" },

      stakDash: { max: "850px" },

      header: { min: "1260px", max: "1500px" },

      mobileSiedbar: { min: "0px", max: "700px" },
      pcSiedbar: { min: "701px", max: "9999px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
