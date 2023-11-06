import React from "react";
import BalanceText from "./BalanceText";
import CoinImg from "src/components/CoinImg";

const PairCoinBox = ({
  amount,
  symbol,
  dollar,
}: {
  amount: number;
  symbol: string;
  dollar: number;
}) => {
  return (
    <div className="w-[240px] h-[100px] rounded-coinBox bg-[rgba(255,255,255,0.85)] p-3 flex items-center justify-evenly">
      <CoinImg></CoinImg>
      <BalanceText
        tokenAmount={amount}
        tokenSymbol={symbol}
        dollar={dollar}
      ></BalanceText>
    </div>
  );
};

export default PairCoinBox;
