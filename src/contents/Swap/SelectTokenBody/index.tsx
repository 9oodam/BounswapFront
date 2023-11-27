import React from "react";
import { SelectTokenBodyProps } from "src/Interface/Modal.interface";

const SelectTokenBody: React.FC<SelectTokenBodyProps> = ({
  tokens,
  handleSelectToken,
}) => {
  return (
    <div className="w-full h-[448px] top-0 left-0">
      <div className="w- full h-[168px]">
        {tokens.map((token, index) => (
          <div
            onClick={() => handleSelectToken(token)}
            className="flex items-center justify-start pt-[4px] pb-[4px] pr-[20px] pl-[20px] cursor-pointer  hover:bg-opercityBlack"
          >
            <div key={index} className="w-[36px] h-[36px]">
              <img
                src={token.uri}
                alt={token.symbol}
                className="rounded-[50%]"
              />
            </div>
            <div className="flex-col">
              <div>{token.symbol}</div>
              <div>{token.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTokenBody;
