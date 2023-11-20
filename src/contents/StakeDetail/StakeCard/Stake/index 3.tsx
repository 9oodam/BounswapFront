import React from "react";
import InputAmount from "./InputAmount";
import StakeBtn from "./StakeBtn";

const Stake = () => {
  return (
    <div className="p-5">
      <div className="w-full text-left text-deepBlack">enter Amount</div>
      <InputAmount tokenName="JGD" />
      <StakeBtn tokenName="Stake" />
    </div>
  );
};

export default Stake;
