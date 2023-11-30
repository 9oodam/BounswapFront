import useWeb3 from "src/hooks/web3.hook";

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getAllPools } from "src/features/data/dataGetAllPools";

import Container from "src/components/container";
import Dashboard from "src/components/Dashboard";
import { PairArray, PairItem } from "src/Interface/Token.interface";

const Pool = () => {
  const {web3, dataContract, pairContract} = useWeb3('');
  const [visible, setVisible] = useState(10);
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const titles = {
    PairName: "Pool Name",
    PairTvl: "TVL",
    PairVolume: "Volume",
    PairVolume7D: "Volume(7D)",
  };

  const getPoolData = async () => {
    if (!pairContract || !dataContract || !web3) return null;
    const data : PairArray = await getAllPools({pairContract, dataContract, queryClient, web3});
    return data;
  }

  const { data : poolArr, isLoading, error } = useQuery({
    queryKey : ["allPools"], 
    queryFn : getPoolData,
    gcTime : 0,
    staleTime : 0,
    refetchOnWindowFocus : "always",  
    enabled : !!dataContract && !!web3 && !!pairContract
  });

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  if (!poolArr) {
    return <>loading</>;
  }

  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25) flex justify-between items-center">
          Pools
        {/* <div className="w-[85%] flex justify-end"> */}
          <div
            className="bg-lightGreen p-3 text-baseWhite font-bold pc:text-[20px] rounded-xl hover:bg-deepGreen cursor-pointer
            h-[40px] w-[120px] flex justify-center items-center text-[14px] shadow-md"
            onClick={() => nav("/pool/create")}
          >
            New Position
          </div>
        {/* </div> */}
        </div>
        <Dashboard
          arr={poolArr.slice(0, visible)}
          url="pool/top"
          title={titles}
        />

        <div className="pc:w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer flex justify-center items-center">
          {visible < poolArr.length ? (
            <button onClick={showMore}>show more</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Pool;
