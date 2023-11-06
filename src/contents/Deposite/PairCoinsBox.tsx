import React from "react";
import PairCoinBox from "./PairCoinBox";

const PairCoinImg = () => {
  return (
    <div className="flex w-full justify-between items-center flex-row mt-4 mb-4">
      <PairCoinBox amount={0} symbol="ETH" dollar={0}></PairCoinBox>
      <div className="text-2xl font-bold">+</div>
      <PairCoinBox amount={0} symbol="USDT" dollar={0}></PairCoinBox>
    </div>
  );
};

export default PairCoinImg;
