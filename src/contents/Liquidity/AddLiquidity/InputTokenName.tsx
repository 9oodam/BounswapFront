import React from "react";
import { InputTokenProps} from "src/Interface/Token.interface";

const InputTokenName: React.FC<InputTokenProps> = ({ tokenName }) => {
  console.log("tokenName",tokenName)
  // const paddingLeft = tokenName != "" ? "pl-2" : "pl-0";
  const borderLeft = tokenName ? "border-l-2" : "border-l-0";
  return (
    <div
      className={`w-[60px] h-[34px] text-lg text-[#9C9C9C] pl-2 ${borderLeft}`}
    >
      {tokenName}
    </div>
  );
};

export default InputTokenName;
