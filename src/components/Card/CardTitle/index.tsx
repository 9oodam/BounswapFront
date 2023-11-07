import React from "react";
import { Textstyle } from "./CardTitle.style";

interface CardTitleProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return <h1 className={Textstyle.cardTitle}>{children}</h1>;
};

export default CardTitle;
