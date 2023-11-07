import React, { useEffect, useState } from "react";
import InputToken from "../AddLiquidity/InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import PercentBtnWarp from "./PercentBtnWarp";
import { Divstyle, Textstyle, Imgstyle } from "./RemoveLiquidity.styled";
import MyLiquidity from "./PercentBtnWarp/MyLiquidity";
import Price from "./PercentBtnWarp/Price";

const RemoveLiquidity = () => {
  const [tokens, setTokens] = useState({
    token1: {
      amount: 0,
      symbol: "",
    },
    token2: {
      amount: 0,
      symbol: "",
    },
  });
  // ! 현재 페어 심볼과 내가 가진 페어의 양을 테스트하는 함수
  const Test = () => {
    setTokens({
      token1: {
        amount: 0,
        symbol: "ETH",
      },
      token2: {
        amount: 20,
        symbol: "USDT",
      },
    });
  };

  useEffect(() => {
    Test();
  }, []);

  console.log("tokens", tokens);
  return (
    <div className={`${Divstyle.flexCol}`}>
      <div className={Textstyle.subText}>Percentage to withdraw:</div>
      <InputToken tokenName={""} />
      <PercentBtnWarp />
      <img src="/images/downArrow.png" alt="arrow" className={Imgstyle.arrow} />
      <MyLiquidity token1={tokens.token1} token2={tokens.token2} />
      <Price />
      <LiquidiityBtn tokenName={"Remove Liquidity"} />
    </div>
  );
};

export default RemoveLiquidity;
