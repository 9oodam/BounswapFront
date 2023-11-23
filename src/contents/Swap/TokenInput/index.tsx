import React from "react";
import CustomModal from "src/pages/Swap/CustomModal";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

type TokenInputProps = {
  tokens: Token[];
  selectedToken: Token | null;
  setSelectedToken: (token: Token) => void;
};

const TokenInput: React.FC<TokenInputProps> = ({
  tokens,
  selectedToken,
  setSelectedToken,
}) => {
  return (
    <div className="flex flex-col justify-around h-[100px] min-h-[44px]">
      <div className="flex items-center justify-between ">
        <input
          className="bg-transparent w-[70%] h-[40px] text-4xl border-gray-300 rounded-lg p-2 border-none outline-none"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          type="number"
          placeholder="0"
        />

        <CustomModal
          tokens={tokens}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      </div>
      <div>
        {selectedToken && (
          <div className="pt-8px flex justify-end">
            <div>{`Balance : ${Number(selectedToken.balance) / 10 ** 18}`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInput;
