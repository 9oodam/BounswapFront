import React from "react";
import { ReactNodeProps } from "src/Interface/ReactNode.interface";
import { Divstyle } from "./SwapCard.style";

const SwapCard: React.FC<ReactNodeProps> = ({ children }) => {
  return <div className={Divstyle.cardBox}>{children}</div>;
};

export default SwapCard;
