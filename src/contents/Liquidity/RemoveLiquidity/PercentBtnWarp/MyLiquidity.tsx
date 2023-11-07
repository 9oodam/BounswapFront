import React from "react";
import { Divstyle } from "./PercentBtnWarp.style";
import { LiquidityToken } from "../../../../Interface/Token.interface";

const MyLiquidity: React.FC<LiquidityToken> = ({ token1, token2 }) => {
  console.log("token1", token1);
  console.log("token2", token2);
  return (
    <div className={Divstyle.liquidityBox}>
      <div className={Divstyle.tokenDiv}>
        <div>{token1.amount == 0 ? `-` : `${token1.amount}`}</div>
        <div>ETH</div>
      </div>
      <div className={Divstyle.tokenDiv}>
        <div>{token2.amount == 0 ? `-` : `${token2.amount}`}</div>
        <div>USDT</div>
      </div>
    </div>
  );
};

export default MyLiquidity;
