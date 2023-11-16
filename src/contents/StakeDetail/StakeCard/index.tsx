import React, { useState } from "react";
import Tap from "src/contents/poolpair/Liquidity/Tap";

const StakeCard = () => {
  const [click, setClick] = useState("stake");

  const Tapclick = (e: React.MouseEvent<HTMLDivElement>) => {
    // *  e.target을 HTMLDivElement 타입으로 캐스팅
    // 나는 이 e.target이 HTMLDivElement 타입의 객체라는 것을 확신하고 있으니, HTMLDivElement 타입의 모든 속성과 메서드를 사용할 수 있도록 해줘"라는 의미
    const target = e.target as HTMLDivElement;
    setClick(target.id);
  };
  return (
    <div>
      <div>
        <Tap
          backgroundColor=""
          id=""
          onClick={Tapclick}
          textColor=""
          textweight=""
        >
          Stake
        </Tap>
      </div>
    </div>
  );
};

export default StakeCard;
