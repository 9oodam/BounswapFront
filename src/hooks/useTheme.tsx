import React, { useState } from "react";
import { DefaultTheme } from "styled-components";
import { ColorTheme } from "../Interface/Color.interface";

const lightTheme: ColorTheme = {
  color: {
    opercityBlack: "#37373740",
    deepBlack: "#454545",
    lightBlack: "#7C7C7C",
    cardWhite: "#ffffffd9",
    baseWhite: "#ffffff",
    deepGreen: "#338415",
    lightGreen: "#9CE084",
    deepYellow: "#D8D46C",
    lightYellow: "#f5f070",
  },
};
const darkTheme: ColorTheme = {
  color: {
    opercityBlack: "#ffffffd9",
    deepBlack: "#ffffff",
    lightBlack: "#c8c8c8",
    cardWhite: "#37373740",
    baseWhite: "#454545",
    deepGreen: "#34c200",
    lightGreen: "#c0fea9",
    deepYellow: "#ece753",
    lightYellow: "#fffcb2",
  },
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ColorTheme>(lightTheme);

  const toggleTheme = () => {
    // console.log("theme", theme);
    setTheme(theme == lightTheme ? darkTheme : lightTheme);
  };

  return { theme, toggleTheme };
};
