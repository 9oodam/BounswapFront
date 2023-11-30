import React from "react";
import { WithdrawProps } from "src/Interface/Token.interface";
import {
  emergencyWithdraw,
  maturedWithdraw,
  setStakingEndDays,
  addStakingPool,
} from "src/features/staking/stakingSendFeatures";
import useWeb3 from "src/hooks/web3.hook";

const UnstakeBtn: React.FC<WithdrawProps> = ({
  tokenName,
  unstakeDeadLine,
}) => {
  const { user, stakingContract } = useWeb3(window.ethereum);

  const WithdrawHandler = async () => {
    if (unstakeDeadLine === false) {
      await emergencyWithdraw({ stakingContract, user });
    }
    if (unstakeDeadLine === true) {
      await maturedWithdraw({ stakingContract, user });
    }
  };

  const setStakingEndDay = async () => {
    await setStakingEndDays({ stakingContract, user });
  };

  const addStaking = async () => {
    await addStakingPool({ stakingContract, user});
  }

  return (
    <>
      <div
        className="w-[100%] h-[60px] bg-lightGreen rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md"
        onClick={WithdrawHandler}
      >
        {tokenName}
      </div>
      <div onClick={addStaking}>스테이킹 풀 생성(테스트 끝나고 지워야함)</div>
      <div onClick={setStakingEndDay}>스테이킹 날짜 줄이기(테스트 끝나고 지워야함)</div>
    </>
  );
};

export default UnstakeBtn;
