import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWeb3 from "src/hooks/web3.hook";

import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";
import { Divstyle } from "src/components/Pairname/Pairname.style";
import SwapContainer from "src/components/SwapContainer";
import SwapCard from "src/components/Card/SwapCard";
import TokenInput from "src/contents/Swap/TokenInput";
import SwapButton from "src/contents/Swap/SwapButton";
import InitialPoolPair from "src/contents/PoolCreate/InitialPoolPair";
import { TokenItem } from "src/Interface/Token.interface";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { getPairAddress } from "src/features/pair/factorySendFeatures";
import { getAmountOut } from "src/features/pair/swapSendFeatures";
import { poolGetSharePercent } from "src/features/pair/pairpoolGetUserLiquidity";
import {
  addLiquidity,
  addLiquidityBNC,
  getPairAmount,
} from "src/features/pair/poolSendFeatures";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";
import LoadingIndicator from "src/components/LoadingIndicator";


const PoolCreate = () => {
  const navigate = useNavigate();
  const backArrow = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { user, web3, pairContract, dataContract } = useWeb3(window.ethereum);

  const [InputSelectedToken, setInputSelectedToken] =
    useState<TokenItem | null>(null);
  const [OutputSelectedToken, setOutputSelectedToken] =
    useState<TokenItem | null>(null);
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  // 선택된 토큰, 수량
  const [InputTokenAmount, setInputTokenAmount] = useState<string>("");
  const [OutputTokenAmount, setOutputTokenAmount] = useState<string>("");
  // input을 입력했는지, ouput을 입력했는지
  const [isExact, setIsExact] = useState<boolean>(true);
  // 페어 주소
  const [pairAddress, setPairAddress] = useState<string>("");
  // 버튼 텍스트
  const [btnText, setBtnText] = useState<string>("Select a token");
  // 하단 정보
  const [token0Match, setToken0Match] = useState<string>("");
  const [token1Match, setToken1Match] = useState<string>("");
  const [sharePercent, setSharePercent] = useState<string>("");

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

  // 3) 1:1
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
    const numOut = web3?.utils.fromWei(amount, "ether").toString();
    if (numOut != undefined) {
      if (inputToken == InputSelectedToken?.tokenAddress) {
        if (isExact == false) return;
        setOutputTokenAmount(numOut);
      } else if (inputToken == OutputSelectedToken?.tokenAddress) {
        if (isExact == true) return;
        setInputTokenAmount(numOut);
      }
    }
    setBtnText("Add Liquidity");
  };
  useEffect(() => {
    if (!InputSelectedToken || !OutputSelectedToken) return;
    if (Number(InputTokenAmount.replace(".", "")) == 0) {
      return;
    }
    const numIn = web3?.utils.toBigInt(
      web3?.utils.toWei(InputTokenAmount, "ether")
    );
    if (numIn != undefined) {
      getPairAmountData(
        InputSelectedToken?.tokenAddress,
        OutputSelectedToken.tokenAddress,
        numIn
      );
    }
  }, [InputTokenAmount]);
  useEffect(() => {
    if (!InputSelectedToken || !OutputSelectedToken) return;
    if (Number(OutputTokenAmount.replace(".", "")) == 0) {
      return;
    }
    const numIn = web3?.utils.toBigInt(
      web3?.utils.toWei(OutputTokenAmount, "ether")
    );
    if (numIn != undefined) {
      getPairAmountData(
        OutputSelectedToken.tokenAddress,
        InputSelectedToken.tokenAddress,
        numIn
      );
    }
  }, [OutputTokenAmount]);
  useEffect(() => {
    if (!InputTokenAmount || !OutputTokenAmount) return;
    getSharePercent();
  }, [InputTokenAmount, OutputTokenAmount]);

  // 4) 유동성 공급
  const Ref = /^(-?)([0-9]*)(\.?)([^0-9]*)([0-9]*)([^0-9]*)/;
  const errMsg = () => {
    return alert("AddLiquidity 실패");
  };
  const tryAddLiquidity = async () => {
    console.log("addLiquidity 시작");
    if (!pairContract) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    if (!InputTokenAmount || !OutputTokenAmount) return;
    const amountADesired = web3?.utils.toBigInt(
      web3?.utils.toWei(InputTokenAmount, "ether")
    );
    const amountBDesired = web3?.utils.toBigInt(
      web3?.utils.toWei(OutputTokenAmount, "ether")
    );
    if (amountADesired != undefined && amountBDesired != undefined) {
      if (
        InputSelectedToken.tokenSymbol == "BNC" ||
        OutputSelectedToken.tokenSymbol == "BNC"
      ) {
        console.log("addLiquidityBNC 실행");
        let tokenAddress =
          InputSelectedToken.tokenSymbol == "BNC"
            ? OutputSelectedToken.tokenAddress
            : InputSelectedToken.tokenAddress;
        let amountTokenDesired =
          InputSelectedToken.tokenSymbol == "BNC"
            ? amountBDesired
            : amountADesired;
        let amountBNCDesired =
          InputSelectedToken.tokenSymbol == "BNC"
            ? amountADesired
            : amountBDesired;
        const result = await addLiquidityBNC(
          pairContract,
          tokenAddress,
          amountTokenDesired,
          amountBNCDesired,
          user.account
        );
        if (result == "error") {
          errMsg();
        } else {
          nav(`/pool/my/${pairAddress}`);
        }
      } else {
        console.log("addLiquidity 실행");
        const result = await addLiquidity(
          pairContract,
          InputSelectedToken.tokenAddress,
          OutputSelectedToken.tokenAddress,
          amountADesired,
          amountBDesired,
          user.account
        );
        if (result == "error") {
          errMsg();
        } else {
          nav(`/pool/my/${pairAddress}`);
        }
      }
    }
  };

  // 정보 반환
  const tokenMatch = async () => {
    if (!pairContract) return;
    if (!pairAddress) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    let inputAmount = BigInt(1 * 10 ** 18);
    const { amountOut: amountOut0 } = await getAmountOut(
      pairContract,
      pairAddress,
      inputAmount,
      InputSelectedToken.tokenAddress,
      OutputSelectedToken.tokenAddress
    );
    let amountOut0Str = Number(
      web3?.utils.fromWei(amountOut0, "ether")
    ).toFixed(5);
    if (amountOut0Str) setToken0Match(amountOut0Str);
    const { amountOut: amountOut1 } = await getAmountOut(
      pairContract,
      pairAddress,
      inputAmount,
      OutputSelectedToken.tokenAddress,
      InputSelectedToken.tokenAddress
    );
    let amountOut1Str = Number(
      web3?.utils.fromWei(amountOut1, "ether")
    ).toFixed(5);
    if (amountOut1Str) setToken1Match(amountOut1Str);
  };
  const getSharePercent = async () => {
    if (!pairContract || !web3) return;
    if (!pairAddress) return;
    if (!InputSelectedToken || !OutputSelectedToken) return;
    const percent = await poolGetSharePercent(
      pairContract,
      InputSelectedToken.tokenAddress,
      OutputSelectedToken.tokenAddress,
      InputTokenAmount,
      OutputTokenAmount,
      web3
    );
    console.log('share percent : ', percent)
    setSharePercent(percent);
  };
  useEffect(() => {
    tokenMatch();
  }, [pairAddress]);

  useEffect(() => {
    console.log(isExact);
  }, [isExact]);

  if  (!data) {
    refetch();
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="w-full flex justify-start mobile:pl-[20px] mobile:h-[20px]">
        <img
          onClick={backArrow}
          src={`${ImgBaseUrl()}backArrow.png`}
          className={Divstyle.arrowsize}
        />
      </div>
      <SwapContainer>
        <div className="flex flex-col items-center">
          <div className="w-[85%] text-baseWhite font-bold text-left text-[35px] mt-7">
            Add Liquidity
          </div>
          <SwapCard>
            <TokenInput
              tokens={data}
              selectedToken={InputSelectedToken}
              setSelectedToken={(token) => setInputSelectedToken(token)}
              setInputAmount={setInputTokenAmount}
              exact={true}
              setExact={setIsExact}
              value={InputTokenAmount}
            />
          </SwapCard>
          <div className="text-lightBlack text-4xl">+</div>
          <SwapCard>
            <TokenInput
              tokens={data}
              selectedToken={OutputSelectedToken}
              setSelectedToken={(token) => setOutputSelectedToken(token)}
              setInputAmount={setOutputTokenAmount}
              exact={false}
              setExact={setIsExact}
              value={OutputTokenAmount}
            />
          </SwapCard>
          <InitialPoolPair
            firstData={InputSelectedToken}
            secondData={OutputSelectedToken}
            inputValue={token1Match}
            outputValue={token0Match}
            sharePercent={sharePercent}
          />

          <div
            onClick={() => {
              tryAddLiquidity();
            }}
            className="w-[85%] max-w-[500px] min-w-[340px] h-[60px]
            bg-lightGreen rounded-[20px] m-2 mt-2 mb-[30px] text-xl font-bold text-white
            flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md"
          >
            <button>{btnText}</button>
          </div>
        </div>
      </SwapContainer>
    </>
  );
};

export default PoolCreate;
