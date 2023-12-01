import React from "react";

// * 토큰의 이름을 설정하는 interface
export interface InputTokenProps {
  tokenName?: string;
  value?: string;
  exact?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInputAmount?: (value: string) => void;
  setExact?: (bool: boolean) => void;
  clickFn?: () => void;
  regex?: RegExp;
}
// LPToken Deposit 시 Input에 사용하는 interface
export interface InputTokenDepositProps {
  tokenName: string;
  setInputValue: (value: string) => void;
}
// LPToken Deposit 시 Btn에 사용하는 interface
export interface BtnTokenDepositProps {
  tokenName: string;
  tokenDepositAmount: string;
}
// LPToken wirhdraw 시 사용하는 interface
export interface WithdrawProps {
  tokenName: string;
  unstakeDeadLine: boolean;
}

export interface SelectTokenProps {
  tokenName: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
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
    amount: string;
    symbol: string;
  };
  token2: {
    amount: string;
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
  value: number | string;
}

export interface TotalVolNTime {
  totalvolum: string;
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
  tokenName: string;
  tokenSymbol: string;
  tokenUri: string;
  tokenTvl: number;
  tokenVolume: number;
  tokenVolume7D: number;
  tokenBalance: number;
  tokenPriceArr: number[];
}
export interface TokenContract {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
}
export type TokenArray = TokenItem[];

export interface PairItem {
  pairAddress: string;
  token0Address: string;
  token1Address: string;
  token0Uri: string;
  token1Uri: string;
  token0Symbol: string;
  token1Symbol: string;
  pairTvl: number;
  pairVolume: number;
  pairLiquidity: number;
  pairBalance: number;
  pairLiquidityArr: number[];
}
export interface PairContract {
  pairAddress: string;
  token0: string;
  token1: string;
  token0Uri: string;
  token1Uri: string;
  token0Symbol: string;
  token1Symbol: string;
  tvl: bigint;
  balance: bigint;
}

export type PairArray = PairItem[];

export interface StakeItem {
  tokenCA: string;
  stakeName: string;
  stakeSymbol: string;
  stakeImg: string;
  totalStaked: number;
  startTime: number;
  endTime: number;
  StakeVolume: number;
  your: number;
}

export type DataArray = StakeItem[];

export interface TokenTitle {
  tokenName: string;
  tokenTvl: string;
  tokenVolume: string;
  tokenVolume7D: string;
}

export interface PairTitle {
  PairName: string;
  PairTvl: string;
  PairVolume: string;
  PairVolume7D: string;
}

export interface StakeTitle {
  stakeName: string;
  stake: string;
  end: string;
  yours: string;
}

export interface testBtn {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}
export type SearchTokenArr = SearchTokenInfo[];

export interface SearchTokenInfo {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenUri: string;
  tokenUri0: string;
  tokenUri1: string;
  isPair: boolean;
}

export interface UnclaimedFeeData {
  token0FeeAmount: number;
  token1FeeAmount: number;
}

export interface UserLiquidity {
  token0Liquidity: string;
  token1Liquidity: string;
  token0Percent: string | number;
  token1Percent: string | number;
}

export interface DepositeChart {
  token0Symbol: string;
  token1Symbol: string;
  token0percent: string | number;
  token1percent: string | number;
}
