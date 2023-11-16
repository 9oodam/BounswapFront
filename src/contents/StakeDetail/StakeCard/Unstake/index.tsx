import React, { useEffect, useState } from "react";
import InputAmount from "../Stake/InputAmount";
import StakeBtn from "../Stake/StakeBtn";
import { useQueryClient } from "react-query";
import { DataArray, Timestamp } from "src/Interface/Token.interface";
import { getTime } from "src/features/getTime";

const Unstake: React.FC<Timestamp> = ({ timestamp }) => {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [nowTime, setNowTime] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (timestamp) {
      setEndTime(timestamp);
    }
    const now = new Date();
    const nowTimestamp = Math.floor(now.getTime() / 1000);
    setNowTime(nowTimestamp);
    // setNowTime(1705555500);

    if (nowTime && endTime) {
      if (nowTime < endTime) {
        setDeadline(false);
      } else if (nowTime >= endTime) {
        setDeadline(true);
      }
    }
  }, [endTime, nowTime]);

  return (
    <div className="p-5">
      {/* <div className="w-full text-left text-deepBlack">enter Amount</div> */}
      <StakeBtn tokenName="Unstake" />
      <div className=" mt-7">
        <div className="text-deepBlack font-bold">
          {deadline == false
            ? "만기 이전에 Unstake하는 경우, 누적된 리워드가 손실될 수 있습니다."
            : "만기일이 지났습니다. Unstake를 진행해 주십시오."}
        </div>
        <div className="text-lightBlack text-[13px] mt-5">
          {deadline == false
            ? "Unstaking before maturity may result in forfeiture of accrued rewards."
            : "The maturity date has passed. Please proceed with the Unstake process."}
        </div>
      </div>
    </div>
  );
};

export default Unstake;
