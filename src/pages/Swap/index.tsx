import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

import { getAllTokens } from "src/features/data/dataGetAllTokens";
import { getPairAddress } from "src/features/pair/factorySendFeatures";
import {
  bNCForExactTokens,
  exactBNCForTokens,
  exactTokensForBNC,
  exactTokensForTokens,
  getAmountIn,
  getAmountOut,
  getOutputReserve,
  tokensForExactBNC,
  tokensForExactTokens,
} from "src/features/pair/swapSendFeatures";

import SwapContainer from "../../components/SwapContainer";
import Card from "src/components/Card";
import CustomModal from "./CustomModal";
import TokenInput from "src/contents/Swap/TokenInput";
import SwapBtn from "src/contents/poolpair/Liquidity/LiquidiityBtn/SwapBtn";
import SwapFetchingCard from "src/components/Card/SwapFetchingCard";
import SwapButton from "src/contents/Swap/SwapButton";
import SwapCard from "src/components/Card/SwapCard";
import { TokenArray, TokenItem } from "src/Interface/Token.interface";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

const Swap = () => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract, dataContract } = useWeb3(window.ethereum);

  const [InputSelectedToken, setInputSelectedToken] =
    useState<TokenItem | null>(null);
  const [OutputSelectedToken, setOutputSelectedToken] =
    useState<TokenItem | null>(null);
  const [inputValue, setInputValue] = useState(""); // A 토큰의 입력 값
  const [outputValue, setOutputValue] = useState(""); // B 토큰의 입력 값

  // console.log("selectedToken", selectedToken?.balance);

  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const tokenData = [
    {
      tokenAddress: "0x28125d2d7450F4837d030186c2076cC53af03dae",
      name: "Bounce Coin",
      symbol: "BNC",
      uri: "https://apricot-wrong-platypus-336.mypinata.cloud/ipfs/QmbinbebbvJdoEMe1hCfWoqLmSTh5kGD8h5RRd83wsd2Sd/BNC.png",
      tvl: 600000000000000000000n,
      balance: 0n,
    },
    {
      tokenAddress: "0x0967FddEc5370F42218A8b0f898BcfF45F941084",
      name: "Ether",
      symbol: "ETH",
      uri: "https://apricot-wrong-platypus-336.mypinata.cloud/ipfs/QmbinbebbvJdoEMe1hCfWoqLmSTh5kGD8h5RRd83wsd2Sd/ETH.png",
      tvl: 600000000000000000000n,
      balance: 0n,
    },
  ];
  // 선택된 토큰, 수량

  const [InputTokenAmount, setInputTokenAmount] = useState<string>("");
  const [OutputTokenAmount, setOutputTokenAmount] = useState<string>("");
  const [minToken, setMinToken] = useState<string>("");
  const [maxToken, setMaxToken] = useState<string>("");
  // input을 입력했는지, ouput을 입력했는지
  // const [isExactInput, setIsExactInput] = useState<boolean>(false);
  // const [isExactOutput, setIsExactOutput] = useState<boolean>(false);
  const [isExact, setIsExact] = useState<boolean>(true);
  // 페어 주소
  const [pairAddress, setPairAddress] = useState<string>("");

  // 1) 토큰 데이터
  const getData = async () => {
    if (!pairContract || !dataContract || !web3) return null;
    const data = await getAllTokens({
      pairContract,
      dataContract,
      queryClient,
      web3,
    });
    (data as TokenArray).splice(1, 1);
    // setTokens(data as Token[]);
    setTokens(data); // type을 Token?? TokenItem??
    console.log("getTokensTest?2?", data);
    return data;
  };
  // const { data : tokenArr, isLoading, error } = useQuery({
  //   queryKey : ["allTokens"],
  //   queryFn : getData,
  //   gcTime : 0,
  //   staleTime : 0,
  //   refetchOnWindowFocus : "always",
  //   enabled : !!dataContract && !!web3
  // });

  // 2) 페어 주소
  const getPairAddressData = async () => {
    if(!pairContract) return;
    if(!InputSelectedToken || !OutputSelectedToken) return;
    const data = await getPairAddress(pairContract, InputSelectedToken.tokenAddress, OutputSelectedToken.tokenAddress)
  
    return data;
  };
  useEffect(() => {
    const fetchPairAddress = async () => {
      const pairAddress = await getPairAddressData();
      console.log("pairAddress : ", pairAddress);
      if (pairAddress != null) setPairAddress(pairAddress);
    };
    if (InputSelectedToken && OutputSelectedToken) {
      if (InputSelectedToken.tokenAddress == OutputSelectedToken.tokenAddress)
        return;
      fetchPairAddress();
    }
  }, [InputSelectedToken, OutputSelectedToken]);

  // 3) amount 계산
  const getAmountOutData = async (inputAmount: bigint) => {
    console.log(inputAmount);
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    const { amountOut, minToken } = await getAmountOut(
      pairContract,
      pairAddress,
      inputAmount,
      InputSelectedToken?.tokenAddress,
      OutputSelectedToken?.tokenAddress
    );
    const amountOutStr = web3?.utils.fromWei(amountOut, "ether").toString();
    const minTokenStr = web3?.utils.fromWei(minToken, "ether").toString();
    if (!amountOutStr || !minTokenStr) return;
    setOutputTokenAmount(amountOutStr);
    setMinToken(minTokenStr);
  };
  useEffect(() => {
    // if(isExactOutput == true) return;
    if (isExact == false) return;
    console.log(parseFloat(InputTokenAmount));
    const inputAmount = web3?.utils.toBigInt(
      web3?.utils.toWei(InputTokenAmount, "ether")
    );
    console.log(inputAmount);
    if (inputAmount != undefined) getAmountOutData(inputAmount);
    // setIsExactInput(true);
    // setIsExactOutput(false);
  }, [InputTokenAmount]);
  const getAmountInData = async (outputAmount: bigint) => {
    console.log(outputAmount);
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    const { amountIn, maxToken } = await getAmountIn(
      pairContract,
      pairAddress,
      outputAmount,
      InputSelectedToken?.tokenAddress,
      OutputSelectedToken?.tokenAddress
    );
    const amountInStr = web3?.utils.fromWei(amountIn, "ether").toString();
    const maxTokenStr = web3?.utils.fromWei(maxToken, "ether").toString();
    if (!amountInStr || !maxTokenStr) return;
    setInputTokenAmount(amountInStr);
    setMaxToken(maxTokenStr);
  };
  useEffect(() => {
    // if(isExactInput == true) return;
    if (isExact == true) return;
    console.log(parseFloat(OutputTokenAmount));
    const outputAmount = web3?.utils.toBigInt(
      web3?.utils.toWei(OutputTokenAmount, "ether")
    );
    console.log(outputAmount);
    if (outputAmount != undefined) getAmountInData(outputAmount);
    // setIsExactInput(false);
    // setIsExactOutput(true);
  }, [OutputTokenAmount]);

  // 4) 사용자의 보유량이 충분한지 & 풀의 예치량이 충분한지 확인
  const getOutputReserveData = async () => {
    if (!pairContract) return;
    if (!OutputSelectedToken) return;
    const reserve = await getOutputReserve(
      pairContract,
      pairAddress,
      OutputSelectedToken?.tokenAddress
    );
    return reserve;
  };

  // 5) swap
  const trySwap = async () => {
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    if (!InputTokenAmount || !OutputTokenAmount) return;
    console.log("swap 시작");

    if (isExact == true) {
      const inputAmountBigInt = web3?.utils.toBigInt(
        web3?.utils.toWei(InputTokenAmount, "ether")
      );
      const minTokenBigInt = web3?.utils.toBigInt(
        web3.utils.toWei(minToken, "ether")
      );
      if (!inputAmountBigInt || !minTokenBigInt) return;
      if (InputSelectedToken.tokenSymbol == "BNC") {
        // iii) Exact bnc -> token
        const result = await exactBNCForTokens(
          pairContract,
          pairAddress,
          inputAmountBigInt,
          minTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      } else if (OutputSelectedToken.tokenSymbol == "BNC") {
        // ii) Exact token -> bnc
        const result = await exactTokensForBNC(
          pairContract,
          pairAddress,
          inputAmountBigInt,
          minTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      } else {
        // i) Exact token -> token
        const result = await exactTokensForTokens(
          pairContract,
          pairAddress,
          inputAmountBigInt,
          minTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      }
    } else if (isExact == false) {
      const outputAmountBigInt = web3?.utils.toBigInt(
        web3?.utils.toWei(OutputTokenAmount, "ether")
      );
      const maxTokenBigInt = web3?.utils.toBigInt(
        web3.utils.toWei(maxToken, "ether")
      );
      if (!outputAmountBigInt || !maxTokenBigInt) return;
      if (InputSelectedToken.tokenSymbol == "BNC") {
        // vi) bnc -> Exact token
        const result = await bNCForExactTokens(
          pairContract,
          pairAddress,
          outputAmountBigInt,
          maxTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      } else if (OutputSelectedToken.tokenSymbol == "BNC") {
        // v) token -> Exact bnc
        const result = await tokensForExactBNC(
          pairContract,
          pairAddress,
          outputAmountBigInt,
          maxTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      } else {
        // iv) token -> Exact token
        const result = await tokensForExactTokens(
          pairContract,
          pairAddress,
          outputAmountBigInt,
          maxTokenBigInt,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          user.account
        );
        console.log(result);
      }
    }
  };

  // useEffect(() => {
  //   getData();
  //   // setTokens(tokenData);
  // }, []);
  useEffect(() => {
    console.log("??");

    const fetchData = async () => {
      try {
        const data = await getData();
        if (data) {
          setTokens(data);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("tokens:", tokens);
  // }, [tokens]);

  return (
    <SwapContainer>
      <div className="flex flex-col items-center">
        <div className="w-[85%] text-baseWhite font-bold  text-left text-[35px] mt-7">
          Swap
        </div>
        <Card>
          <div className="text-lightBlack text-left">You pay</div>
          <TokenInput
            tokens={tokens}
            selectedToken={InputSelectedToken}
            setSelectedToken={(token) => setInputSelectedToken(token)}
            setInputAmount={setInputTokenAmount}
            exact={true}
            setExact={setIsExact}
            value={InputTokenAmount}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </Card>
        <Card>
          <div className="text-lightBlack text-left">You receive</div>
          <TokenInput
            tokens={tokens}
            selectedToken={OutputSelectedToken}
            setSelectedToken={(token) => setOutputSelectedToken(token)}
            inputValue={outputValue}
            setInputValue={setOutputValue}
          />
        </Card>
        <SwapFetchingCard>
          <div>fetching best price...</div>
        </SwapFetchingCard>
        <SwapBtn tokenName={"Select Token"} />
        {/* 조건 1.지갑연동 안됐을때 wallet 연결 유도 2. 토큰 두개다 골랐는데 Input or Output 입력안됐을때 "Enter an amount" 3. Input or Output 이 입력됐을때 계산실행해주기 "fetching best price 표시 -> 입력됐을때 얼마로 바꿔줄수있는지 표시 "1UNI = 3.234 WETH" 4. 내가 보유한 첫번째 TokenInput 의 balance 가 InputValue 보다 높을때는 "Insufficient WETH balance" 띄어주고 swap 막기 5.위의 조건을 다 피해가면 그때 "Swap"가능 */}
        <div onClick={trySwap}>swap</div>
      </div>
    </SwapContainer>
  );
};

export default Swap;
