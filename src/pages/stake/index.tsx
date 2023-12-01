import React, { useState } from "react";
import Container from "../../components/container";
import Dashboard from "../../components/Dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";
import { getAllTokens } from "src/features/AllTokens";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const Stake = () => {
  const [visible, setVisible] = useState(10);
  const queryClient = useQueryClient();

  const titles = {
    stakeName: "Token Name",
    stake: "Total staked",
    end: "End Date",
    yours: "Your tokens",
  };
  const data = [
    {
      // ! 스테이킹을 구별할 수 있는 요소는 CA가 아닌 poolId 값이 될 것!
      tokenCA: "0x316Ce4d255b75D1320FF7eCE9d5eDb231eaF89C4",
      stakeName: "Stake",
      stakeSymbol: "STK",
      stakeImg: `${ImgBaseUrl()}LPToken_Steake2.png`,
      totalStaked: 12345678,
      StakeVolume: 12000,
      your: 1234,
      startTime: 1700100000,
      endTime: 1704452400,
    },
  ];

  const { governanceContract } = useWeb3(null);

  const test = async () => {
    console.log("governanceContract..", governanceContract);
    if (governanceContract) {
      return await getAllTokens({ governanceContract, queryClient });
    } else {
      return null;
    }
  };

  const {
    data: data2,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["proposals"],
    // queryFn: fetchData,
    queryFn: test,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!governanceContract,
  });

  queryClient.setQueryData(["lpTokens"], data);
  const asd = queryClient.getQueryData(["proposals"]);
  console.log("adbajshbfgnisadnbhfkjs", asd);
  // queryClient.(["lpTokens"], data);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  // const { governanceContract } = useWeb3(null);
  // if (governanceContract !== null) {
  //   getAllTokens({ governanceContract, queryClient });
  // }

  // const {
  //   data: data2,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["proposals"],
  //   // queryFn: fetchData,
  //   queryFn: ()=>{getAllTokens({ governanceContract, queryClient })},
  //   gcTime: 0,
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });

  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Stake
        </div>
        <Dashboard arr={data.slice(0, visible)} url="stake" title={titles} />

        <div className="w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer flex justify-center items-center">
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

export default Stake;
