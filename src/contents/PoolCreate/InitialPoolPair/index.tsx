import React from "react";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

interface InitialPoolProps {
  firstData: Token | null;
  secondData: Token | null;
  // selectedToken: Token | null;
}

const InitialPoolPair: React.FC<InitialPoolProps> = ({
  firstData,
  secondData,
}) => {
  const firstDataBalance = firstData
    ? Number(firstData.balance) / 10 ** 18
    : "-";

  console.log("firstData?", firstData);

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-between p-5">
        <div>Initial price and pool share</div>
      </div>

      <div className="w-full p-5 rounded-[20px]">
        <div className="grid auto-rows-auto gap-[12px]">
          <div className="flex flex-wrap m-[-px] justify-around">
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">{firstDataBalance}</div>
              <div>
                {secondData ? secondData.symbol : "-"} per{" "}
                {firstData ? firstData.symbol : "-"}
                {/* {secondData} per {firstData} */}
              </div>
            </div>
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">-</div>
              <div className="">{/* {firstData} per {secondData} */}</div>
            </div>
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">-</div>
              <div className="">Share of pool</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPoolPair;
