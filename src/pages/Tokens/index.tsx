import { url } from "inspector";
import useWeb3 from "src/hooks/web3.hook";
import { ContractTransactionDataAndInputError } from "web3-errors";

import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { TokenArray,TokenContract } from "src/Interface/Token.interface";

import index from "src/contents/poolpair/PoolDetail";
import Card from "src/components/Card";
import Container from "src/components/container";
import Dashboard from "src/components/Dashboard";
import { getAllTokens } from "src/features/data/dataGetAllTokens";

const Tokens = () => {
  const {web3, dataContract, pairContract} = useWeb3('');

  const [visible, setVisible] = useState(10);
  // const [arr, setArr] = useState<TokenContract[]>([]);
  // const [tokenArr, setTokenArr] = useState<TokenArray>([]);

  const queryClient = useQueryClient();

  const titles = {
    tokenName: "Token Name",
    tokenTvl: "TVL",
    tokenVolume: "Volume",
    tokenVolume7D: "Volume(7D)",
  };

  // useEffect(()=>{
  const getData = async () => {
    if (!pairContract || !dataContract || !web3) return null;
    const data = await getAllTokens({pairContract, dataContract, queryClient, web3});
    (data as TokenArray).splice(1, 1);

    // setTokenArr(data as TokenArray);
    // console.log("getTokensTest", data);
    return data;
  }
    // getData();
  // }, [dataContract]);


  const { data : tokenArr, isLoading, error } = useQuery({
    queryKey : ["allTokens"], 
    queryFn : getData,
    gcTime : 0,
    staleTime : 0,
    refetchOnWindowFocus : "always",  
    enabled : !!dataContract && !!web3
  });


  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  if (!tokenArr) {
    return <>loading</>;
  }


  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Token
        </div>
        <Dashboard arr={tokenArr.slice(0, visible)} url="tokens" title={titles} />

        <div className="w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer flex justify-center items-center">
          {visible < tokenArr.length ? (
            <button onClick={showMore}>show more</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Tokens;
