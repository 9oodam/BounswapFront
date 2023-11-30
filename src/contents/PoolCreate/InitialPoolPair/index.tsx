import React from "react";
import { TokenItem } from "src/Interface/Token.interface";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

interface InitialPoolProps {
  firstData: TokenItem | null;
  secondData: TokenItem | null;
  inputValue: string; // A 토큰의 입력값
  outputValue: string; // B 토큰의 입력값
  sharePercent: string;
}

const InitialPoolPair: React.FC<InitialPoolProps> = ({
  firstData,
  secondData,
  inputValue,
  outputValue,
  sharePercent
}) => {
  // const firstDataBalance = firstData
  //   ? Number(firstData.balance) / 10 ** 18
  //   : "-";
  const firstDataValue = inputValue ? parseFloat(inputValue) : 0;
  const secondDataValue = outputValue ? parseFloat(outputValue) : 0;
  const firstRatio =
    secondDataValue && firstDataValue ? secondDataValue / firstDataValue : "-";
  const secondRatio =
    secondDataValue && firstDataValue ? firstDataValue / secondDataValue : "-";

  const isCalculationComplete =
    typeof firstRatio === "number" && typeof secondRatio === "number";

  // console.log("firstData?", firstData);

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-between p-5 dark:text-white">
        <div>Initial price and pool share</div>
      </div>

      <div className="w-full p-5 rounded-[20px] dark:text-white">
        <div className="grid auto-rows-auto gap-[12px]">
          <div className="flex flex-wrap m-[-px] justify-around">
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">
                {typeof firstRatio === "number"
                  ? firstRatio.toFixed(4)
                  : firstRatio}
              </div>
              <div>
                {isCalculationComplete && secondData
                  ? secondData.tokenSymbol
                  : ""}{" "}
                per{" "}
                {isCalculationComplete && firstData
                  ? firstData.tokenSymbol
                  : "-"}
              </div>
            </div>
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">
                {typeof secondRatio === "number"
                  ? secondRatio.toFixed(4)
                  : secondRatio}
              </div>
              <div className="">
                {" "}
                {isCalculationComplete && firstData
                  ? firstData.tokenSymbol
                  : "-"}{" "}
                per{" "}
                {isCalculationComplete && secondData
                  ? secondData.tokenSymbol
                  : "-"}
              </div>
            </div>
            <div className="grid-flow-row auto-rows-auto justify-center">
              <div className="font-semibold">
              {sharePercent
                  ? sharePercent
                  : "-"}
                -
              </div>
              <div className="">Share of pool</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPoolPair;
