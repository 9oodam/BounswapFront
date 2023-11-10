import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle } from "./LiquidityBtn.style";

const index: React.FC<InputTokenProps> = ({ tokenName }) => {
  return <div className={Divstyle.btn}>{tokenName}</div>;
};

export default index;
