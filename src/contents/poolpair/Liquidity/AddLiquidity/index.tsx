import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

import {
  addLiquidity,
  addLiquidityBNC,
  getPairAmount,
} from "src/features/pair/poolSendFeatures";

import { Divstyle, Textstyle } from "./AddLiquidity.style";
import InputToken from "./InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import { PairItem } from "src/Interface/Token.interface";
import { getUserTokens } from "src/features/data/dataGetUserTokens";

const AddLiquidity: React.FC<{ data: PairItem }> = ({ data }) => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract, dataContract } = useWeb3(window.ethereum);

  const [token0Amount, setToken0Amount] = useState<string>("");
  const [token1Amount, setToken1Amount] = useState<string>("");
  const [isExact, setIsExact] = useState<boolean>(true);

  // 0-9까지의 정수만.
  const Ref = /^(-?)([0-9]*)(\.?)([^0-9]*)([0-9]*)([^0-9]*)/;
  const errMsg = () => {
    return alert("AddLiquidity 실패");
  };


  const getTokens = async () => {
    if (!pairContract || !dataContract || !web3 || user.account == "")
      return null;
    const data = await getUserTokens({
      pairContract,
      dataContract,
      queryClient,
      user: user,
      web3,
    });
    return data.tokensObj;
  };

  const { data: tokens, refetch } = useQuery({
    queryKey: ["tokensObj"],
    queryFn: getTokens,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!dataContract || !web3 || !user)
  });


  const tryAddLiquidity = async () => {
    if (token0Amount == "" || token1Amount == "") return;
    if (!pairContract) return;
    const amountADesired = web3?.utils.toBigInt(
      web3?.utils.toWei(token0Amount, "ether")
    );
    const amountBDesired = web3?.utils.toBigInt(
      web3?.utils.toWei(token1Amount, "ether")
    );
    if (amountADesired != undefined && amountBDesired != undefined) {
      if (data.token0Symbol == "BNC" || data.token1Symbol == "BNC") {
        console.log("addLiquidityBNC 실행");
        let tokenAddress =
          data.token0Symbol == "BNC" ? data.token1Address : data.token0Address;
        let amountTokenDesired =
          data.token0Symbol == "BNC" ? amountBDesired : amountADesired;
        let amountBNCDesired =
          data.token0Symbol == "BNC" ? amountADesired : amountBDesired;
        const result = await addLiquidityBNC(
          pairContract,
          tokenAddress,
          amountTokenDesired,
          amountBNCDesired,
          user.account
        );
        console.log("꺄르륵", result);
        if (result == "error") {
          errMsg();
        }else {
          setToken0Amount("")
          setToken1Amount("")
        }
      } else {
        console.log("addLiquidity 실행");
        const result = await addLiquidity(
          pairContract,
          data.token0Address,
          data.token1Address,
          amountADesired,
          amountBDesired,
          user.account
        );
        console.log(result);
        if (result == "error") {
          errMsg();
        }else {
          setToken0Amount("")
          setToken1Amount("")

          refetch();
        }
      }
    }
  };

  const getPairAmountData = async (
    inputToken: string,
    outputToken: string,
    inputAmount: bigint
  ) => {
    if (!pairContract) return;
    const amount = await getPairAmount(
      pairContract,
      inputToken, // 입력한 token 주소
      outputToken, // 값 반환 받을 token 주소
      inputAmount
    );
    console.log(amount);
    const numOut = web3?.utils.fromWei(amount, "ether").toString();
    if (numOut != undefined) {
      if (inputToken == data.token0Address) {
        if (isExact == false) return;
        console.log("token0에 입력");
        setToken1Amount(numOut);
      } else if (inputToken == data.token1Address) {
        if (isExact == true) return;
        console.log("token1에 입력");
        setToken0Amount(numOut);
      }
    }
  };

  useEffect(() => {
    // console.log(parseFloat(token0Amount));
    if (Number(token0Amount.replace(".", "")) == 0) {
      return;
    }

    const numIn = web3?.utils.toBigInt(
      web3?.utils.toWei(token0Amount, "ether")
    );
    console.log(numIn);
    if (numIn != undefined) {
      getPairAmountData(data.token0Address, data.token1Address, numIn);
    }
  }, [token0Amount]);

  useEffect(() => {
    // console.log(parseFloat(token1Amount));
    if (Number(token1Amount.replace(".", "")) == 0) {
      return;
    }
    const numIn = web3?.utils.toBigInt(
      web3?.utils.toWei(token1Amount, "ether")
    );
    console.log(numIn);
    if (numIn != undefined) {
      getPairAmountData(data.token1Address, data.token0Address, numIn);
    }
  }, [token1Amount]);

  useEffect(() => {
    console.log(token0Amount, token1Amount);
  }, [token0Amount, token1Amount]);

  useEffect(() => {
    console.log(isExact);
  }, [isExact]);

  // console.log(
  //   "10000000000000000000n",
  //   web3?.utils.fromWei(web3.utils.toBigInt(10000000000000000000n), "ether")
  // );
  if (!tokens) {
    refetch();
  }

  if (!tokens) {
    return <>loading</>
  }
  return (
    // <div className={`${display} flex-col items-center p-5`}>
    <div className={Divstyle.flex}>
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>{tokens[data.token0Address].tokenBalance}</span>
      </div>
      <InputToken
        tokenName={data.token0Symbol}
        value={token0Amount}
        setInputAmount={setToken0Amount}
        setExact={setIsExact}
        exact={true}
        regex={Ref}
      />
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>{tokens[data.token1Address].tokenBalance}</span>
      </div>
      <InputToken
        tokenName={data.token1Symbol}
        value={token1Amount}
        setInputAmount={setToken1Amount}
        setExact={setIsExact}
        exact={false}
        regex={Ref}
      />
      <LiquidiityBtn
        tokenName={"Add Liquidity"}
        clickFn={tryAddLiquidity}
      ></LiquidiityBtn>
    </div>
  );
};

export default AddLiquidity;
