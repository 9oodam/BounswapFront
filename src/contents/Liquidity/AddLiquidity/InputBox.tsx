import React from "react";

import InputToken from "./InputToken";
import InputTokenName from "./InputTokenName";
import { InputTokenProps } from "src/Interface/Token.interface";

const InputBox: React.FC<InputTokenProps> = ({ tokenName }) => (
  <div className="w-[440px] h-[50px] bg-[rgba(255,255,255,0.85)] rounded-bodyBackRadius flex justify-center items-center shadow-md mb-6">
    <InputToken></InputToken>
    <InputTokenName tokenName={tokenName}></InputTokenName>
  </div>
);

export default InputBox;
