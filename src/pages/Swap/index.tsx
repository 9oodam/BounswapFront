import SwapContainer from "../../components/SwapContainer";
import React, { useEffect, useState } from "react";
import Card from "src/components/Card";
import CustomModal from "./CustomModal";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

const Swap = () => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  console.log("selectedToken", selectedToken);

  const [tokens, setTokens] = useState<Token[]>([]);

  const tokenData = [
    {
      tokenAddress: "0x1aaaaa123123213213213123213213123",
      name: "Stake",
      symbol: "STK",
      uri: "/images/LPToken_Steake2.png",
      tvl: 500000000000000n,
      balance: 500000000000000n,
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
      balance: 500000000000000n,
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
    <SwapContainer>
      <div className="flex flex-col items-center">
        <div className="w-[85%] text-baseWhite font-bold [text-shadow:0px_4px_4px_#00000040] text-left text-[35px] mt-7">
          Swap
        </div>
        <Card>
          <div className="text-lightBlack text-left">You pay</div>
          <div className="flex-row items-center">
            <div className="flex">
              <input className="w-[80%] h-[40px] text-xl" />
              <CustomModal
                tokens={tokens}
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
              />
            </div>
            {selectedToken && (
              <div className="pt-8px text-right">
                {/* 나중에 balance query 로 가져올예정 */}
                {/* Balance : {selectedToken.balance} */}
                <div>Balance : 111111</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </SwapContainer>
  );
};

export default Swap;
