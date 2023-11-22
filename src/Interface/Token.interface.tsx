import React from "react";

// * 토큰의 이름을 설정하는 interface
export interface InputTokenProps {
  tokenName: string;
  // onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
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

export interface TokenNameInterface {
  tokenName: string;
  tokenSymbol: string;
  tokenImg: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export interface TitleNumInterface {
  title: string;
  value: number;
}

export interface DataItem {
  tokenCA: string;
  tokenName: string;
  tokenSymbol: string;
  tokenImg: string;
  totalStaked: number;
  startTime: number;
  endTime: number;
  volume: number;
  your: number;
}

export type DataArray = DataItem[];

export interface TotalVolNTime {
  totalvolum: number;
  startTime: string;
  endTime: string;
}

export interface EarlyInfo {
  LPtoken: number;
  reword: number;
  time: string;
  symbol: string;
}

export type EarlyArray = EarlyInfo[];

export interface Timestamp {
  timestamp: number;
}

export interface MyFee {
  token: number;
  time: number;
  totalfee: number;
  dailyfee: number;
  earlyfee: number;
}

export interface testBtn {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export interface TokenItem {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: number;
  tokenVolume: number;
  balance: number;
}

export type TokenArray = TokenItem[];

export interface TokenTitle {
  tokenName: string;
  tvl: string;
  volume: string;
  volume7D: string;
}

export interface StakeTitle {
  stakeName: string;
  stake: string;
  end: string;
  yours: string;
}
