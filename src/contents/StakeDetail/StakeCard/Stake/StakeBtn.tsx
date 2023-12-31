import React from "react";
import { BtnTokenDepositProps } from "src/Interface/Token.interface";
import { deposit } from "src/features/staking/stakingSendFeatures";
import useWeb3 from "src/hooks/web3.hook";

const StakeBtn: React.FC<BtnTokenDepositProps> = ({
  tokenName,
  tokenDepositAmount,
  action,
  setAction
}) => {
  const { user, stakingContract, web3 } = useWeb3(window.ethereum);

  const depositHandler = async () => {
    await deposit({ stakingContract, user, amount: tokenDepositAmount, web3 });
    setAction(!action);
  };

  return (
    <>
      <div
        className="w-[100%] h-[60px] bg-lightGreen rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md"
        onClick={depositHandler}
      >
        {tokenName}
      </div>
    </>
  );
};

export default StakeBtn;
