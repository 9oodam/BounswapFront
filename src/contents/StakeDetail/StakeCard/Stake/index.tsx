import React, { useEffect, useState } from "react";
import InputAmount from "./InputAmount";
import StakeBtn from "./StakeBtn";
import { Timestamp } from "src/Interface/Token.interface";

const Stake: React.FC<Timestamp> = ({ timestamp, action, setAction }) => {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [nowTime, setNowTime] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<boolean>(false);
  const [depositValue, setDepositValue] = useState<string>("");

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

  useEffect(() => {
    console.log(depositValue);
  }, [depositValue]);

  return (
    <div className="p-5">
      <div className="w-full text-left text-deepBlack">Enter an Amount</div>
      <InputAmount tokenName="STK" setInputValue={setDepositValue} />
      {deadline == false ? (
        <StakeBtn tokenName="Stake" tokenDepositAmount={depositValue} action={action} setAction={setAction} />
      ) : (
        <div className="w-[100%] h-[60px] bg-lightBlack rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center shadow-md">
          만료된 stake pool 입니다.
        </div>
      )}
    </div>
  );
};

export default Stake;
