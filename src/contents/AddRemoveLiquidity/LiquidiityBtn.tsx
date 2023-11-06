import React from "react";
import { InputTokenProps } from "../../Interface/Token.interface";

export const LiquidiityBtn: React.FC<InputTokenProps> = ({ tokenName }) => {
  return (
    <div className="w-[440px] h-[60px] bg-[#9CE084] rounded-coinLogo m-4 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer">
      {tokenName}
    </div>
  );
};
