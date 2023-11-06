import React from "react";
import CoinImg from "../CoinImg/CoinImg";

const PairCoinBox = () => {
  return (
    <div className="w-[240px] h-[100px] rounded-coinBox bg-[rgba(255,255,255,0.85)] p-3 flex items-center">
      <CoinImg></CoinImg>
    </div>
  );
};

export default PairCoinBox;
