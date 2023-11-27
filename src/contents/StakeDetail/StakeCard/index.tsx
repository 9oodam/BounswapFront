import React, { useState, useEffect } from "react";
import Tap from "src/contents/poolpair/Liquidity/Tap";
import Stake from "./Stake";
import Unstake from "./Unstake";
import { Timestamp } from "src/Interface/Token.interface";

const StakeCard: React.FC<Timestamp> = ({ timestamp }) => {
  const [stakeColor, setStakeColor] = useState("bg-[rgba(255,255,255,0.85)]");
  const [unstakeColor, setUnStakeColor] = useState("bg-[#A9AAA6]");
  const [stakeTextColor, setStakeTextColor] = useState("text-[#338415]");
  const [unstakeTextColor, setUnStakeTextColor] = useState("text-[#000000]");
  const [stakeTextWeight, setStakeTextWeight] = useState("font-bold");
  const [unstakeTextWeight, setUnStakeTextWeight] = useState("font-normal");

  const [click, setClick] = useState("stake");

  useEffect(() => {
    if (click == "stake") {
      setStakeColor("bg-[rgba(255,255,255,0.85)]");
      setUnStakeColor("bg-[#A9AAA6]");
      setStakeTextColor("text-[#338415]");
      setUnStakeTextColor("text-[#000000]");
      setStakeTextWeight("font-bold");
      setUnStakeTextWeight("font-normal");
    } else if (click == "unstake") {
      setStakeColor("bg-[#A9AAA6]");
      setUnStakeColor("bg-[rgba(255,255,255,0.85)]");
      setStakeTextColor("text-[#000000]");
      setUnStakeTextColor("text-[#338415]");
      setStakeTextWeight("font-normal");
      setUnStakeTextWeight("font-bold");
    }
  }, [click]);
  const Tapclick = (e: React.MouseEvent<HTMLDivElement>) => {
    // *  e.target을 HTMLDivElement 타입으로 캐스팅
    // 나는 이 e.target이 HTMLDivElement 타입의 객체라는 것을 확신하고 있으니, HTMLDivElement 타입의 모든 속성과 메서드를 사용할 수 있도록 해줘"라는 의미
    const target = e.target as HTMLDivElement;
    setClick(target.id);
  };
  return (
    // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것!
    <div className=" pc:w-full mobile:w-[85%] flex flex-col items-center m-5 pc:h-[550px]">
      <div className="flex flex-row justify-evenly pc:w-[85%] mobile:w-full min-w-[340px] ">
        <Tap
          backgroundColor={stakeColor}
          id="stake"
          onClick={Tapclick}
          textColor={stakeTextColor}
          textweight={stakeTextWeight}
        >
          Stake
        </Tap>
        <Tap
          backgroundColor={unstakeColor}
          id="unstake"
          onClick={Tapclick}
          textColor={unstakeTextColor}
          textweight={unstakeTextWeight}
        >
          Unstake
        </Tap>
      </div>
      <div className="min-w-[340px] pc:w-[85%] mobile:w-full pc:p-5 bg-cardWhite rounded-xl: rounded-bodyBackRadius pc:h-[470px]">
        {click == "stake" ? <Stake timestamp={timestamp} /> : <Unstake timestamp={timestamp} />}
      </div>
    </div>
  );
};

export default StakeCard;
