import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PairArray } from "src/Interface/Token.interface";
import useWeb3 from "src/hooks/web3.hook";

const PoolBox: React.FC<{ pools: PairArray }> = ({ pools }) => {
  const { web3 } = useWeb3(null);
  const nav = useNavigate();

  return (
    <div>
      <div className="w-full pc:p-5 mobile:mt-5">
        {/* <h3
                    className="font-bold text-[25px] text-left mb-5"
                >
                    Pools
                </h3> */}
        {/* <div className="grid pc:grid-cols-3 mobile:grid-cols-2 w-full font-semibold text-[20px] border-b-2 mb-3 items-center justify-center text-D_lightBlack">
          <div>img</div>
          <div className="mobile:hidden">name</div>
          <div>lpToken</div>
        </div> */}

        {/* <div className='h-[240px]'> */}
        <div className="grid grid-cols-1 overflow-auto scrollbar overflow-y-scroll w-full h-full">
          {pools.map((el, index) => (
            // <div key={index} className="w-full flex justify-around">
            <div
              key={index}
              onClick={() => {
                nav(`/pool/my/${el.pairAddress}`);
              }}
              className="w-full flex justify-around item-center"
            >
              <img className="w-[30%]" src={el.token0Uri} />
              <span className="w-[30%] mobile:hidden">
                {el.token0Symbol} - {el.token1Symbol}
              </span>
              <span className="w-[30%]">{el.pairBalance}</span>
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PoolBox;
