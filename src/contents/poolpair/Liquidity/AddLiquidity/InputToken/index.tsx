import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle, Inputstyle } from "./InputToken.style";

const index: React.FC<InputTokenProps> = ({ tokenName, value, setTokenAmount }) => {
  const borderLeft = tokenName ? "border-l-2" : "border-l-0";
  return (
    <div className={Divstyle.box}>
      <input onChange={(e) => {setTokenAmount?.(e.target.value)}} className={Inputstyle.size} value={value}></input>
      <div className={`${Divstyle.tokenName} ${borderLeft}`}>{tokenName}</div>
    </div>
  );
};

export default index;
