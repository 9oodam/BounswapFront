import React from "react";
import Balance from "../AddLiquidity/Balance";
import InputToken from "../AddLiquidity/InputBox";
import { LiquidiityBtn } from "../LiquidiityBtn";
import RemoveSubText from "./RemoveSubText";
import InputBox from "../AddLiquidity/InputBox";

const RemoveLiquidity = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <RemoveSubText></RemoveSubText>
      <InputToken tokenName={""} />
      <div>percent btn</div>
      <div>arrow</div>
      <div>amount box</div>
      <div>
        <div>price</div>
        <div>button</div>
      </div>
      <LiquidiityBtn tokenName={"Add Liquidity"}></LiquidiityBtn>
    </div>
  );
};

export default RemoveLiquidity;
