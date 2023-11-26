import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";
import { Divstyle } from "src/components/Pairname/Pairname.style";
import SwapContainer from "src/components/SwapContainer";
import SwapCard from "src/components/Card/SwapCard";
import TokenInput from "src/contents/Swap/TokenInput";
import SwapButton from "src/contents/Swap/SwapButton";
import InitialPoolPair from "src/contents/PoolCreate/InitialPoolPair";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

const PoolCreate = () => {
  const navigate = useNavigate();
  const backArrow = () => {
    navigate(-1);
  };
  const [InputSelectedToken, setInputSelectedToken] = useState<Token | null>(
    null
  );
  const [OutputSelectedToken, setOutputSelectedToken] = useState<Token | null>(
    null
  );

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
              tokens={tokens}
              selectedToken={InputSelectedToken}
              setSelectedToken={(token) => setInputSelectedToken(token)}
            />
          </SwapCard>
          <div className="text-lightBlack text-4xl">+</div>
          <SwapCard>
            <TokenInput
              tokens={tokens}
              selectedToken={OutputSelectedToken}
              setSelectedToken={(token) => setOutputSelectedToken(token)}
            />
          </SwapCard>
          <InitialPoolPair
            firstData={InputSelectedToken}
            secondData={OutputSelectedToken}
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
