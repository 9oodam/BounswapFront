import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";

const StakeBtn: React.FC<InputTokenProps> = ({ tokenName }) => {
  return (
    <div className="w-[100%] h-[60px] bg-[#9CE084] rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md">
      {tokenName}
    </div>
  );
};

export default StakeBtn;
