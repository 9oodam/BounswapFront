import React, { useState } from "react";
import { BtnTokenDepositProps } from "src/Interface/Token.interface";
import { deposit } from "src/features/staking/stakingSendFeatures";
import useWeb3 from "src/hooks/web3.hook";

const StakeBtn: React.FC<BtnTokenDepositProps> = ({
  tokenName,
  tokenDepositAmount,
}) => {
  const { user, stakingContract, web3 } = useWeb3(window.ethereum);

  const depositHandler = async () => {
    
    await deposit({ stakingContract, user, amount: tokenDepositAmount, web3 });
  };

  return (
    <>
      <div
        className="w-[100%] h-[60px] bg-lightGreen rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md"
        onClick={depositHandler}
      >
        {tokenName}
      </div>
    </>
  );
};

export default StakeBtn;
