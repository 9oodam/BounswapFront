import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";


import SwapContainer from "../../components/SwapContainer";
import Card from "src/components/Card";
import TokenInput from "src/contents/Swap/TokenInput";
import SwapFetchingCard from "src/components/Card/SwapFetchingCard";
import SwapButton from "src/contents/Swap/SwapButton";

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
  const { user, web3, pairContract } = useWeb3(
    window.ethereum
  );

  const [InputSelectedToken, setInputSelectedToken] = useState<Token | null>(
    null
  );
  const [OutputSelectedToken, setOutputSelectedToken] = useState<Token | null>(
    null
  );

  // console.log("selectedToken", selectedToken?.balance);

  const [tokens, setTokens] = useState<Token[]>([]);

  const tokenData = [
    {
      tokenAddress: "0x1aaaaa123123213213213123213213123",
      name: "Stake",
      symbol: "STK",
      uri: "/images/LPToken_Steake2.png",
      tvl: 500000000000000n,
      balance: 600000000000000n,
    },
    {
      tokenAddress: "0x3aaaaa123123213213213123213213123",
      name: "Jipgagoshipda",
      symbol: "JGD",
      uri: "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      tvl: 500000000000000n,
      balance: 500000000000000n,
    },
    {
      tokenAddress: "0x1aaaaa123123213213213123213213123",
      name: "Stake",
      symbol: "STK",
      uri: "/images/LPToken_Steake2.png",
      tvl: 500000000000000n,
      balance: 700000000000000n,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    // const data = await (dataContract?.methods.getUserPools as any)(user.account).call();
    // setPools(data);
    setTokens(tokenData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("tokens:", tokens);
  }, [tokens]);


  return (
    <SwapContainer>
      <div className="flex flex-col items-center">
        <div className="w-[85%] text-baseWhite font-bold [text-shadow:0px_4px_4px_#00000040] text-left text-[35px] mt-7">
          Swap
        </div>
        <Card>
          <div className="text-lightBlack text-left">You pay</div>
          <TokenInput
            tokens={tokens}
            selectedToken={InputSelectedToken}
            setSelectedToken={(token) => setInputSelectedToken(token)}
          />
        </Card>
        <Card>
          <div className="text-lightBlack text-left">You receive</div>
          <TokenInput
            tokens={tokens}
            selectedToken={OutputSelectedToken}
            setSelectedToken={(token) => setOutputSelectedToken(token)}
          />
        </Card>
        <SwapFetchingCard children={<div>fetching best price...</div>} />

        <SwapButton />

        {/* 조건 1.지갑연동 안됐을때 wallet 연결 유도 2. 토큰 두개다 골랐는데 Input or Output 입력안됐을때 "Enter an amount" 3. Input or Output 이 입력됐을때 계산실행해주기 "fetching best price 표시 -> 입력됐을때 얼마로 바꿔줄수있는지 표시 "1UNI = 3.234 WETH" 4. 내가 보유한 첫번째 TokenInput 의 balance 가 InputValue 보다 높을때는 "Insufficient WETH balance" 띄어주고 swap 막기 5.위의 조건을 다 피해가면 그때 "Swap"가능 */}
      </div>
    </SwapContainer>
  );
};

export default Swap;
