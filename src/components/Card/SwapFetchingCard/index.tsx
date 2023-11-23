import React from "react";
import { ReactNodeProps } from "src/Interface/ReactNode.interface";
import { Divstyle } from "./SwapFetchingCard.style";

const SwapFetchingCard: React.FC<ReactNodeProps> = ({ children }) => {
  return <div className={Divstyle.cardBox}>{children}</div>;
};

export default SwapFetchingCard;
