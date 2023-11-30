import React, { useEffect, useState } from "react";
import Tap from "./Tap";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";
import { PairItem } from "src/Interface/Token.interface";

const AddRemoveLiquidity:React.FC<{data: PairItem, refetch:()=>{}}> = ({data, refetch}) => {
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
    <div className="flex flex-col items-center pc:w-full mobile:w-[85%] mobile:mt-5">
      <div className="flex flex-row justify-evenly pc:w-[90%] mobile:w-full min-w-[340px] ">
        <Tap
          id="Add"
          onClick={Tapclick}
          backgroundColor={addColor}
          textColor={addTextColor}
          textweight={addTextWeight}
        >
          Add Liquidity
        </Tap>
        <Tap
          id="Remove"
          onClick={Tapclick}
          backgroundColor={removeColor}
          textColor={removeTextColor}
          textweight={removeTextWeight}
        >
          Remove Liquidity
        </Tap>
      </div>
      <div className="min-w-[340px] pc:w-[85%] mobile:w-full pc:p-5 bg-cardWhite rounded-xl: rounded-bodyBackRadius">
        {click == "Add" ? <AddLiquidity data={data} refetch={refetch} /> : <RemoveLiquidity data={data} refetch={refetch}/>}
        <div></div>
      </div>
    </div>
  );
};

export default AddRemoveLiquidity;
