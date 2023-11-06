import React from "react";

// * 토큰의 이름을 설정하는 type
export type InputTokenProps = {
  tokenName: string;
};

// * 소유하고 있는 토큰의 정보를 설정하는 type => Deposite
export type TokenBalance = {
  tokenAmount: number;
  tokenSymbol: string;
  dollar: number;
};
