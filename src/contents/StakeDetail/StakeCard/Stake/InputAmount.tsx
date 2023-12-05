import React, { useEffect, useState } from "react";
import { InputTokenDepositProps } from "src/Interface/Token.interface";

const InputAmount: React.FC<InputTokenDepositProps> = ({
  tokenName,
  setInputValue,
}) => {

  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => {
    setInputValue(inputAmount);
  }, [inputAmount]);

  return (
    <div className="w-[100%] h-[50px] bg-[rgba(255,255,255,0.85)] rounded-bodyBackRadius flex justify-center items-center shadow-md mb-6 mt-6">
      <input
        className="w-[80%] h-[40px] text-x"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
      ></input>
      <div className="$w-[60px] h-[34px] text-lg text-[#9C9C9C] pl-2 border-l-2">
        {tokenName}
      </div>
    </div>
  );
};

export default InputAmount;
