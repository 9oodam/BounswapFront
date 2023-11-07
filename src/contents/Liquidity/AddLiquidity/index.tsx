import React from "react";
import InputToken from "./InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import { Divstyle, Textstyle } from "./AddLiquidity.style";

// const AddLiquidity:React.FC<Display> = ({display}) => {
const AddLiquidity = () => {
  return (
    // <div className={`${display} flex-col items-center p-5`}>
    <div className={Divstyle.flex}>
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={"EHT"} />
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={"USDT"} />
      <LiquidiityBtn tokenName={"Add Liquidity"}></LiquidiityBtn>
    </div>
  );
};

export default AddLiquidity;
