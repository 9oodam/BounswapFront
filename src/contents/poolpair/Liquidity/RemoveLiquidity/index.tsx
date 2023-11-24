import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

import { getRemoveAmount } from "src/features/pair/poolSendFeatures";

import InputToken from "../AddLiquidity/InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import PercentBtnWarp from "./PercentBtnWarp";
import { Divstyle, Textstyle, Imgstyle } from "./RemoveLiquidity.styled";
import MyLiquidity from "./PercentBtnWarp/MyLiquidity";
import Price from "./PercentBtnWarp/Price";
import { TokenPair } from "src/Interface/Token.interface";

const RemoveLiquidity:React.FC<TokenPair> = ({token0, token1}) => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract } = useWeb3(
    window.ethereum
  );

  const [percentage, setPercentage] = useState<number>(0);

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

  const getRemoveAmountData = async () => {
    if(pairContract) {
      const amount = await getRemoveAmount(
        pairContract,
        '',
        25,
        user.account
      )
      console.log(amount);
    }
  }

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
