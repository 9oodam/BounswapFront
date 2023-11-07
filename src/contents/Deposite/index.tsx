import React from "react";
import CoinBox from "./CoinBox";
import { Divstyle, Textstyle } from "./Deposite.style";

const index = () => {
  return (
    <div className={Divstyle.flex}>
      <CoinBox amount={0} symbol="ETH" dollar={0}></CoinBox>
      <div className={Textstyle.plus}>+</div>
      <CoinBox amount={0} symbol="USDT" dollar={0}></CoinBox>
    </div>
  );
};

export default index;
