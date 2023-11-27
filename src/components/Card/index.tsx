import React from "react";
import { ReactNodeProps } from "../../Interface/ReactNode.interface";
import { Divstyle } from "./Card.style";

const Card: React.FC<ReactNodeProps> = ({ children }) => {
  return <div className={Divstyle.cardBox}>{children}</div>;
};

export default Card;
