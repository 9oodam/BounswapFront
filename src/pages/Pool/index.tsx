import useWeb3 from "src/hooks/web3.hook";

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Container from "src/components/container";
import Dashboard from "src/components/Dashboard";
import { getAllPools } from "src/features/data/dataGetAllPools";
import { PairArray, PairItem } from "src/Interface/Token.interface";
import { useNavigate } from "react-router-dom";

const Pool = () => {
  const { web3, dataContract } = useWeb3("");
  const [visible, setVisible] = useState(10);
  // const [pair, setPair] = useState<PairArray | null>(null);

  const queryClient = useQueryClient();
  const nav = useNavigate();

  const titles = {
    PairName: "Pool Name",
    PairTvl: "TVL",
    PairVolume: "Volume",
    PairVolume7D: "Volume(7D)",
  };

  const getData = async () => {
    if (!dataContract || !web3) return;
    const pools = await getAllPools({ dataContract, queryClient, web3 });
    console.log(pools);
    // setPair(pools as PairArray);
    return pools;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["pairs"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!dataContract && !!web3,
  });

  if (!data) {
    return <>loading</>;
  }

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%]  text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          pools
        </div>
        <div className="w-[85%] flex justify-end">
          <div
            className="bg-lightGreen p-3 text-baseWhite font-bold pc:text-[20px] rounded-xl hover:bg-deepGreen cursor-pointer"
            onClick={() => nav("/pool/createPool")}
          >
            New Position
          </div>
        </div>
        <Dashboard arr={data.slice(0, visible)} url="pool/top" title={titles} />

        <div className="pc:w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer flex justify-center items-center">
          {visible < data.length ? (
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
