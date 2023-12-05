import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "src/Interface/Token.interface";
import { getPoolInfo } from "src/features/staking/stakingGetPoolInfo";
import UnstakeBtn from "./UnstakeBtn";
import useWeb3 from "src/hooks/web3.hook";

const Unstake: React.FC<Timestamp> = ({ timestamp, action, setAction }) => {
  const { stakingContract } = useWeb3(window.ethereum);
  const [endStakingTime, setEndStakingTime] = useState<string | null>(null);
  const [nowTime, setNowTime] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // pool.stakingEndTime <= block.timestamp(현재 시간) === 스테이킹 종료

  useEffect(() => {
    const getEndStakingTime = async () => {
      const poolInfoData = await getPoolInfo({ stakingContract, queryClient });
      const poolEndTime = poolInfoData?.stakingPoolEndTime;
      if (poolEndTime) {
        setEndStakingTime(poolEndTime);
        console.log("풀끝나는시간", poolEndTime);
      }
    };
    getEndStakingTime();

    const now = new Date();
    const nowTimestamp = Math.floor(now.getTime() / 1000);
    setNowTime(nowTimestamp);

    // 현재 시간과 스테이킹 종료 시간을 비교하여 deadline 결정
    if (nowTime !== null && endStakingTime !== null) {
      setDeadline(nowTime >= parseInt(endStakingTime));
      console.log("deadline", deadline);
    }
  }, [endStakingTime, nowTime, queryClient, stakingContract]);

  return (
    <div className="p-5">
      <UnstakeBtn tokenName="Unstake" unstakeDeadLine={deadline} action={action} setAction={setAction} />
      <div className=" mt-7">
        <div className="text-deepBlack font-bold">
          {deadline == false
            ? "아직 만기일이 되지 않았기 때문에, 출금을 진행하면 누적된 리워드를 받을 수 없습니다."
            : "만기일이 지났습니다. Unstake를 진행해 주십시오."}
        </div>
        <div className="text-lightBlack text-[13px] mt-5">
          {deadline == false
            ? "Since the maturity date has not yet arrived, if you proceed with the withdrawal, you will not be able to receive the accrued rewards."
            : "The maturity date has passed. Please proceed with the Unstake process."}
        </div>
      </div>
    </div>
  );
};

export default Unstake;
