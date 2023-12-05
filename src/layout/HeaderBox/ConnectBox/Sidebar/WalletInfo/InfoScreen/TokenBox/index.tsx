import React from "react";
import useWeb3 from "src/hooks/web3.hook";
import { TokenArray, TokenItem } from "src/Interface/Token.interface";
import "../../../../../../../contents/StakeDetail/EarlyCard/EarlyCard.style.css";

const TokenBox: React.FC<{ tokens: TokenArray }> = ({ tokens }) => {
  return (
    <div>
      <div className="w-full h-full pc:p-5 mobile:mt-5">
        <div className="flex flex-col justify-start overflow-auto pc:h-[260px] mobileSiedbar:h-[300px]">
          {tokens?.map((el: TokenItem, index: number) => (
            <div key={index}>
              <div className="flex justify-start items-center h-[68px] pr-[10px] pl-[10px]">
                <div className="w-[30%] flex justify-center items-center">
                  <img className="w-[36px] h-[36px]" src={el.tokenUri} />
                </div>
                <div className="w-[30%] h-[36px] flex justify-center items-center">
                  {el.tokenSymbol}
                </div>
                <div className="w-[40%] h-[36px] flex justify-center items-center">
                  {el.tokenBalance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenBox;
