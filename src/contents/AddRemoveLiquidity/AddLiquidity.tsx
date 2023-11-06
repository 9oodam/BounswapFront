import React from "react";
import Balance from "./Balance";
import InputToken from "./InputBox";
import { LiquidiityBtn } from "./LiquidiityBtn";
import {Display} from "../../Interface/ReactNode.interface"

const AddLiquidity:React.FC<Display> = ({display}) => {
  return (
    <div className={`${display} flex-col items-center p-5`}>
      <Balance></Balance>
      <InputToken tokenName={"EHT"} />
      <Balance></Balance>
      <InputToken tokenName={"USDT"} />
      <LiquidiityBtn tokenName={"Add Liquidity"}></LiquidiityBtn>
    </div>
  );
};

export default AddLiquidity;
