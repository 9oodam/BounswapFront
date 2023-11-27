import React from "react";
import CustomModal from "src/pages/Swap/CustomModal";
import { TokenItem } from "src/Interface/Token.interface";

type TokenInputProps = {
  tokens: TokenItem[];
  selectedToken: TokenItem | null;
  setSelectedToken: (token: TokenItem) => void;
  // inputValue: string;
  // setInputValue: (value: string) => void;
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
  // inputValue,
  // setInputValue,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const valueInBigInt = BigInt(Math.floor(parseFloat(value) * 10 ** 18));
    console.log(valueInBigInt)

    if (
      selectedToken &&
      selectedToken.tokenBalance &&
      valueInBigInt <= selectedToken.tokenBalance
    ) {
      setInputAmount(event.target.value);
    } else {
      alert("Input value 는 해당토큰의 balance 보다 작아야합니다");
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
            handleInputChange
          }}
          value={value}
          className="bg-transparent w-[70%] h-[40px] text-4xl border-gray-300 rounded-lg p-2 border-none outline-none"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          type="number"
          placeholder="0"
          value={inputValue}
          onChange={handleInputChange}
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
            <div>{`Balance : ${
              selectedToken.tokenBalance
            }`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInput;
