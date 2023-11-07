import React from "react";

// * 토큰의 이름을 설정하는 interface
export interface InputTokenProps {
  tokenName: string;
}

// * 소유하고 있는 토큰의 정보를 설정하는 interface => Deposite
// export interface TokenBalance {
//   tokenAmount: number;
//   tokenSymbol: string;
//   dollar: number;
// }

//* Remove Liquidity의 %를 매개변수로 받는 interface
export interface RemovePercent {
  percent: number;
}

// * 페어에 대해 소유하고 있는 토큰의 양과 심볼을 받는다.
export interface LiquidityToken {
  token1: {
    amount: number;
    symbol: string;
  };
  token2: {
    amount: number;
    symbol: string;
  };
}
