import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle, Inputstyle } from "./InputToken.style";

const index: React.FC<InputTokenProps> = ({ tokenName }) => {
  const borderLeft = tokenName ? "border-l-2" : "border-l-0";
  return (
    <div className={Divstyle.box}>
      <input className={Inputstyle.size}></input>
      <div className={`${Divstyle.tokenName} ${borderLeft}`}>{tokenName}</div>
    </div>
  );
};

export default index;
