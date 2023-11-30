import React, { useEffect } from "react";
import useWeb3 from "src/hooks/web3.hook";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { TokenArray, TokenItem } from "src/Interface/Token.interface";

const TokenBox: React.FC<{ tokens: TokenArray }> = ({ tokens }) => {
  const { user, web3, dataContract } = useWeb3(null);

  // const queryClient = useQueryClient();

  // const getData = async () => {
  //     if (!dataContract || !web3 || user.account == "") return null;
  //     const data = await getUserTokens({ dataContract, queryClient, userAddress: user.account, web3 });

  //     console.log("getUserTokens", data);
  //     return data;
  // }

  // const { data: tokens, isLoading, error } = useQuery({
  //     queryKey: ["userTokens"],
  //     queryFn: getData,
  //     gcTime: 0,
  //     staleTime: 0,
  //     refetchOnWindowFocus: "always",
  //     enabled: !!dataContract && !!web3 && !!user
  // });

  // if (!tokens) {
  //     return <>loading</>
  // }

  return (
    <div>
      <div className="w-full h-full pc:p-5 mobile:mt-5">
        {/* <h3
                    className="font-bold text-[25px] text-left mb-5"
                >
                    Tokens
                </h3> */}
        {/* <div className="grid pc:grid-cols-3 mobile:grid-cols-2 w-full font-semibold text-[20px] border-b-2 mb-3 items-center justify-center text-D_lightBlack">
          <div>img</div>
          <div className="mobile:hidden">name</div>
          <div>balance</div>
        </div> */}

        {/* <div className='h-[240px]'> */}
        {/* <div className="grid grid-cols-1 overflow-auto scrollbar overflow-y-scroll w-full h-full"> */}
        <div className="flex flex-col justify-start overflow-auto pc:h-[500px] mobileSiedbar:h-[300px] overflow-y-scroll ">
          {tokens?.map((el: TokenItem, index: number) => (
            // <div
            //   key={index}
            //   className="w-full flex justify-between item-center mobile:flex mobile:justify-around"
            // >
            <div key={index}>
              <div className="flex justify-around items-center h-[68px] pr-[10px] pl-[10px]">
                <div>
                  <img className="w-[40px] h-[40px] " src={el.tokenUri} />
                </div>
                <div>{el.tokenSymbol}</div>
                <div>{el.tokenBalance}</div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default TokenBox;
