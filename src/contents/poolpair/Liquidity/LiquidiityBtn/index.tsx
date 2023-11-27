import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle } from "./LiquidityBtn.style";

const LiquidityBtn: React.FC<InputTokenProps> = ({ tokenName, clickFn }) => {
  return <div onClick={clickFn} className={Divstyle.btn}>{tokenName}</div>;
};

export default LiquidityBtn;
