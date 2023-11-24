import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle } from "./SwapBtn.style";

const SwapBtn: React.FC<InputTokenProps> = ({ tokenName }) => {
  return <div className={Divstyle.btn}>{tokenName}</div>;
};
export default SwapBtn;
