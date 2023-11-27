import React from "react";
import { Divstyle } from "./PercentBtnWarp.style";
import { LiquidityToken } from "../../../../../Interface/Token.interface";

const MyLiquidity: React.FC<LiquidityToken> = ({ token1, token2 }) => {
  return (
    <div className={Divstyle.liquidityBox}>
      <div className={Divstyle.tokenDiv}>
        <div>{!token1.amount ? `-` : `${token1.amount}`}</div>
        <div>{token1.symbol}</div>
      </div>
      <div className={Divstyle.tokenDiv}>
        <div>{!token2.amount ? `-` : `${token2.amount}`}</div>
        <div>{token2.symbol}</div>
      </div>
    </div>
  );
};

export default MyLiquidity;
