import { url } from "inspector";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Card from "src/components/Card";
import Container from "src/components/container";
import Dashboard from "src/components/Dashboard";
import index from "src/contents/poolpair/PoolDetail";

const Tokens = () => {
  const [visible, setVisible] = useState(10);

  const queryClient = useQueryClient();

  const titles = {
    tokenName: "Token Name",
    tokenTvl: "TVL",
    tokenVolume: "Volume",
    tokenVolume7D: "Volume(7D)",
  };

  const data = [
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1111aaaaaaaaaaaaaaaaaa",
      tokenName: "Ether",
      tokenSymbol: "ETH",
      tokenUri:
        "https://i.pinimg.com/564x/d1/48/bd/d148bda5524dfcae85b2a1cdac8e7308.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x2222aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x3333aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x4444aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x5555aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x6666aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x7777aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x8888aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x9999aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1010aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1212aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1313aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1414aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1515aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1616aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1717aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
    {
      0: 2n,
      1: "0x35BF335fef91E0ac59799850E59e598301dBC040",
      2: "0x7366",
      3: "0x786c6b766a666b6c73",
      4: 19900000000000000000n,
      5: 0n,
      6: 0n,
      7: 1700182548n,
      8: 1700182668n,
      9: 0n,
      tokenAddress: "0x1818aaaaaaaaaaaaaaaaaa",
      tokenName: "JIIIIIIP",
      tokenSymbol: "JIP",
      tokenUri:
        "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tokenTvl: 19900000000000000000n,
      tokenBalance: 19900000000000000000n,
    },
  ];

  const token = data.map((el, index) => {
    return {
      tokenAddress: el.tokenAddress,
      tokenName: el.tokenName,
      tokenSymbol: el.tokenSymbol,
      tokenUri: el.tokenUri,
      tokenTvl: Number(el.tokenTvl) / 10 ** 18,
      tokenVolume: 100,
      tokenBalance: Number(el.tokenBalance) / 10 ** 18,
    };
  });

  const fetchData = () => {
    return token;
  };

  const {
    data: data2,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchData,
    gcTime: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  // queryClient.setQueryData(["tokens"], token);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Token
        </div>
        <Dashboard arr={token.slice(0, visible)} url="token" title={titles} />

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

export default Tokens;
