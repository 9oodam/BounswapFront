import React, { useState } from "react";
import { InputTokenProps } from "src/Interface/Token.interface";

const SelectToken: React.FC<InputTokenProps> = ({ tokenName }) => {
  return (
    <div className="w-full h-56px top-0 left-0">
      <div className="w-[36px] h-[36px]">
        <img src={tokenName} alt="" />
      </div>
    </div>
  );
};

export default SelectToken;
