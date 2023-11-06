import React from "react";
import { TokenBalance } from "../../Interface/Token.interface";

const BalanceText: React.FC<TokenBalance> = ({
  dollar,
  tokenAmount,
  tokenSymbol,
}) => {
  return (
    <div className="w-[100px] h-[60px]">
      <div className="flex justify-evenly items-center">
        {/* 금액 */}
        <div className="text-2xl ">{tokenAmount}</div>
        {/* 심볼 */}
        <div>{tokenSymbol}</div>
      </div>
      {/* 현재시세 */}
      <div className="flex ml-4">$ {dollar}</div>
    </div>
  );
};

export default BalanceText;
