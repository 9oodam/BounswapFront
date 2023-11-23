import React from "react";
import { SelectTokenProps } from "src/Interface/Token.interface";
import { Divstyle } from "./SwapBtn.style";

const SwapBtn: React.FC<SelectTokenProps> = ({ tokenName }) => {
  return <div className={Divstyle.btn}>{tokenName}</div>;
};
export default SwapBtn;
