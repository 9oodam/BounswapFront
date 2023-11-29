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

const PoolCreate = () => {
  const navigate = useNavigate();
  const backArrow = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const { user, web3, pairContract, dataContract } = useWeb3(window.ethereum);

  const [InputSelectedToken, setInputSelectedToken] = useState<TokenItem | null>(null);
  const [OutputSelectedToken, setOutputSelectedToken] = useState<TokenItem | null>(null);
  // const [inputValue, setInputValue] = useState(""); // A 토큰의 입력 값
  // const [outputValue, setOutputValue] = useState(""); // B 토큰의 입력 값

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

  // 1) 토큰 데이터 가져오기
  const getData = async () => {
    if (!pairContract || !dataContract || !web3) return null;
    const {swapTokens} = await getUserTokens({
      pairContract,
      dataContract,
      user: user,
      queryClient,
      web3,
    });
    return swapTokens;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["swapTokens"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!pairContract && !!dataContract && !!web3,
  });

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

  // 3)

  if(!data) return <>loading</>;

  return (
    <>
      <div className="w-full flex justify-start">
        <img
          onClick={backArrow}
          src="/images/backArrow.png"
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
            // inputValue={inputValue}
            // setInputValue={setInputValue}
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
            // inputValue={outputValue}
            // setInputValue={setOutputValue}
            />
          </SwapCard>
          <InitialPoolPair
            firstData={InputSelectedToken}
            secondData={OutputSelectedToken}
            inputValue={''}
            outputValue={''}
          />

          <div className="w-[85%] max-w-[500px] min-w-[340px] h-[60px] bg-[#9CE084] rounded-[20px] m-2 mt-2 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md">
            <button>Add Liquidity</button>
          </div>
        </div>
      </SwapContainer>
    </>
  );
};

export default PoolCreate;
