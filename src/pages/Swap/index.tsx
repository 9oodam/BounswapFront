import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

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
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import LoadingIndicator from "src/components/LoadingIndicator";

const Swap = () => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract, dataContract } = useWeb3(window.ethereum);

  const [InputSelectedToken, setInputSelectedToken] =
    useState<TokenItem | null>(null);
  const [OutputSelectedToken, setOutputSelectedToken] =
    useState<TokenItem | null>(null);
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  // 선택된 토큰, 수량
  const [InputTokenAmount, setInputTokenAmount] = useState<string>("");
  const [OutputTokenAmount, setOutputTokenAmount] = useState<string>("");
  const [minToken, setMinToken] = useState<string>("");
  const [maxToken, setMaxToken] = useState<string>("");
  // input을 입력했는지, ouput을 입력했는지
  const [isExact, setIsExact] = useState<boolean>(true);
  // 페어 주소
  const [pairAddress, setPairAddress] = useState<string>("");
  // 버튼 텍스트
  const [btnText, setBtnText] = useState<string>("Select a token");

  // 1) 토큰 데이터 가져오기
  const getData = async () => {
    if (!pairContract || !dataContract || !web3) return null;
    const { swapTokens } = await getUserTokens({
      pairContract,
      dataContract,
      user: user,
      queryClient,
      web3,
    });
    return swapTokens;
  };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["swapTokens"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!pairContract && !!dataContract && !!web3,
  });

  // 2) 페어 주소
  const getPairAddressData = async () => {
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    const data = await getPairAddress(
      pairContract,
      InputSelectedToken.tokenAddress,
      OutputSelectedToken.tokenAddress
    );
    return data;
  };
  useEffect(() => {
    if (InputSelectedToken == OutputSelectedToken) {
      setOutputSelectedToken(null);
    }
    const fetchPairAddress = async () => {
      const pairAddress = await getPairAddressData();
      console.log("pairAddress : ", pairAddress);
      if (pairAddress != null) setPairAddress(pairAddress);
    };
    if (InputSelectedToken && OutputSelectedToken) {
      if (InputSelectedToken.tokenAddress == OutputSelectedToken.tokenAddress)
        return;
      fetchPairAddress();
      setBtnText("Enter an amount");
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
    const amountOutStr = Number(
      web3?.utils.fromWei(amountOut, "ether")
    ).toFixed(5);
    const minTokenStr = Number(web3?.utils.fromWei(minToken, "ether")).toFixed(
      5
    );
    if (!amountOutStr || !minTokenStr) return;
    setOutputTokenAmount(amountOutStr);
    setMinToken(minTokenStr);
    setMaxToken("");
    setBtnText("Swap");
  };
  useEffect(() => {
    if (isExact == false) return;
    console.log(parseFloat(InputTokenAmount));
    const inputAmount = web3?.utils.toBigInt(
      web3?.utils.toWei(InputTokenAmount, "ether")
    );
    console.log(inputAmount);
    if (inputAmount != undefined) getAmountOutData(inputAmount);
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
    const amountInStr = Number(web3?.utils.fromWei(amountIn, "ether")).toFixed(
      5
    );
    const maxTokenStr = Number(web3?.utils.fromWei(maxToken, "ether")).toFixed(
      5
    );
    if (!amountInStr || !maxTokenStr) return;
    setInputTokenAmount(amountInStr);
    setMaxToken(maxTokenStr);
    setMinToken("");
    setBtnText("Swap");
  };
  useEffect(() => {
    if (isExact == true) return;
    console.log(parseFloat(OutputTokenAmount));
    const outputAmount = web3?.utils.toBigInt(
      web3?.utils.toWei(OutputTokenAmount, "ether")
    );
    console.log(outputAmount);
    if (outputAmount != undefined) getAmountInData(outputAmount);
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
    console.log("swap 시작");
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    if (!InputTokenAmount || !OutputTokenAmount) return;

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

    // 초기화
    setInputSelectedToken(null);
    setOutputSelectedToken(null);
    setInputTokenAmount("");
    setOutputTokenAmount("");
    setMinToken("");
    setMaxToken("");
    setBtnText("Select a token");
  };

  if (!data) return <LoadingIndicator />;

  return (
    <SwapContainer>
      <div className="flex flex-col items-center">
        <div className="w-[85%] text-baseWhite font-bold  text-left text-[35px] mt-7">
          Swap
        </div>
        <Card>
          <div className="text-lightBlack text-left">You pay</div>
          <TokenInput
            tokens={data}
            selectedToken={InputSelectedToken}
            setSelectedToken={(token) => setInputSelectedToken(token)}
            setInputAmount={setInputTokenAmount}
            exact={true}
            setExact={setIsExact}
            value={InputTokenAmount}
          />
        </Card>
        <Card>
          <div className="text-lightBlack text-left">You receive</div>
          <TokenInput
            tokens={data}
            selectedToken={OutputSelectedToken}
            setSelectedToken={(token) => setOutputSelectedToken(token)}
            setInputAmount={setOutputTokenAmount}
            exact={false}
            setExact={setIsExact}
            value={OutputTokenAmount}
          />
        </Card>
        {minToken && (
          <SwapFetchingCard>
            <div>minToken : {minToken}</div>
          </SwapFetchingCard>
        )}
        {maxToken && (
          <SwapFetchingCard>
            <div>maxToken : {maxToken}</div>
          </SwapFetchingCard>
        )}
        <SwapBtn tokenName={btnText} onClick={trySwap} />
        {/* 조건 1.지갑연동 안됐을때 wallet 연결 유도 2. 토큰 두개다 골랐는데 Input or Output 입력안됐을때 "Enter an amount" 3. Input or Output 이 입력됐을때 계산실행해주기 "fetching best price 표시 -> 입력됐을때 얼마로 바꿔줄수있는지 표시 "1UNI = 3.234 WETH" 4. 내가 보유한 첫번째 TokenInput 의 balance 가 InputValue 보다 높을때는 "Insufficient WETH balance" 띄어주고 swap 막기 5.위의 조건을 다 피해가면 그때 "Swap"가능 */}
      </div>
    </SwapContainer>
  );
};

export default Swap;
