import React from "react";
import CustomModal from "src/pages/Swap/CustomModal";
import { TokenItem } from "src/Interface/Token.interface";

type TokenInputProps = {
  tokens: TokenItem[];
  selectedToken: TokenItem | null;
  setSelectedToken: (token: TokenItem) => void;
  setInputAmount: (value: string) => void;
  setExact: (bool: boolean) => void;
  exact: boolean;
  value: string;
};

const TokenInput: React.FC<TokenInputProps> = ({
  tokens,
  selectedToken,
  setSelectedToken,
  setInputAmount,
  setExact,
  exact,
  value,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedToken) return;
    const value = event.target.value;
    if (!value) return;

    const valueInBigInt = Math.floor(parseFloat(value));
    console.log(selectedToken.tokenBalance, valueInBigInt)

    if (valueInBigInt <= selectedToken.tokenBalance) {
      setInputAmount(event.target.value);
    } else {
      alert("Input value 는 해당토큰의 balance 보다 작아야합니다.");
      console.error("handleInputChange error");
    }
  };

  return (
    <div className="flex flex-col justify-around h-[100px] min-h-[44px]">
      <div className="flex items-center justify-between ">
        <input
          onChange={(e) => {
            setInputAmount(e.target.value);
            setExact(exact);
          }}
          value={value}
          className="bg-transparent w-[70%] h-[40px] text-4xl border-gray-300 rounded-lg p-2 border-none outline-none dark:text-white"
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
          <div className="pt-8px flex justify-end dark:text-white">
            <div>{`Balance : ${selectedToken.tokenBalance.toFixed(5)
              }`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInput;
