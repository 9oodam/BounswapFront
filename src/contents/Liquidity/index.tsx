import React, { useEffect, useState } from "react";
import LiquidityTap from "./LiquidityTap";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const AddRemoveLiquidity = () => {
  const [addColor, setAddColor] = useState("bg-[rgba(255,255,255,0.85)]");
  const [removeColor, setRemoveColor] = useState("bg-[#A9AAA6]");
  const [addTextColor, setAddTextColor] = useState("text-[#338415]");
  const [removeTextColor, setRemoveTextColor] = useState("text-[#000000]");
  const [addTextWeight, setAddTextWeight] = useState("font-bold");
  const [removeTextWeight, setRemoveTextWeight] = useState("font-normal");
  const [click, setClick] = useState("Add");

  useEffect(() => {
    if (click == "Add") {
      setAddColor("bg-[rgba(255,255,255,0.85)]");
      setRemoveColor("bg-[#A9AAA6]");
      setAddTextColor("text-[#338415]");
      setRemoveTextColor("text-[#000000]");
      setAddTextWeight("font-bold");
      setRemoveTextWeight("font-normal");
    } else if (click == "Remove") {
      setAddColor("bg-[#A9AAA6]");
      setRemoveColor("bg-[rgba(255,255,255,0.85)]");
      setAddTextColor("text-[#000000]");
      setRemoveTextColor("text-[#338415]");
      setAddTextWeight("font-normal");
      setRemoveTextWeight("font-bold");
    }
  }, [click]);

  const Tapclick = (e: React.MouseEvent<HTMLDivElement>) => {
    // *  e.target을 HTMLDivElement 타입으로 캐스팅
    // 나는 이 e.target이 HTMLDivElement 타입의 객체라는 것을 확신하고 있으니, HTMLDivElement 타입의 모든 속성과 메서드를 사용할 수 있도록 해줘"라는 의미
    const target = e.target as HTMLDivElement;
    setClick(target.id);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row pc:m-5 pc:mb-0 justify-evenly">
        <LiquidityTap
          id="Add"
          onClick={Tapclick}
          backgroundColor={addColor}
          textColor={addTextColor}
          textweight={addTextWeight}
        >
          Add Liquidity
        </LiquidityTap>
        <LiquidityTap
          id="Remove"
          onClick={Tapclick}
          backgroundColor={removeColor}
          textColor={removeTextColor}
          textweight={removeTextWeight}
        >
          Remove Liquidity
        </LiquidityTap>
      </div>
      <div className="mobile:w-[340px] pc:w-[600px] pc:p-5 pc:m-7 pc:mt-0 bg-[rgba(255,255,255,0.85)] rounded-xl: rounded-bodyBackRadius">
        {click == "Add" ? <AddLiquidity /> : <RemoveLiquidity />}
        <div></div>
      </div>
    </div>
  );
};

export default AddRemoveLiquidity;
