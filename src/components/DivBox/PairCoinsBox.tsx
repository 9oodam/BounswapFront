import React from "react";
import PairCoinBox from "./PairCoinBox";

const PairCoinsBox = () => {
  return (
    <div className="flex w-full justify-between items-center flex-row mt-4 mb-4">
      <PairCoinBox></PairCoinBox>
      <div className="text-2xl font-bold">+</div>
      <PairCoinBox></PairCoinBox>
    </div>
  );
};

export default PairCoinsBox;
