import useWeb3 from "src/hooks/web3.hook";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Container from "src/components/container";
import Dashboard from "src/components/Dashboard";

const Pool = () => {
  const {web3, dataContract} = useWeb3('');

  const [visible, setVisible] = useState(10);

  const queryClient = useQueryClient();

  const titles = {
    PairName: "Pool Name",
    PairTvl: "TVL",
    PairVolume: "Volume",
    PairVolume7D: "Volume(7D)",
  };
  const data = [
    {
      pairAddress: "0x11111111aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/a5/da/a6/a5daa6a5133355111ecdee0c7e67b729.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/0d/c0/fb/0dc0fb79b4147e4f7331e2595d999d3e.jpg",
      token0Symbol: "ETH",
      token1Symbol: "USDT",
      pairTvl: 123000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 10000000000000000000n,
    },
    {
      pairAddress: "0x222222222aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x233333333aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/03/6a/29/036a29fc129a051478cf41c0f2afe465.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cd/a9/11/cda911f7e7fce5740f33f6937fdcabb7.jpg",
      token0Symbol: "CLV",
      token1Symbol: "LCK",
      pairTvl: 12345000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 100000000000000000000n,
    },
    {
      pairAddress: "0x4444444444aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x55555555aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x466666666aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x77777777aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x888888888aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x499999999aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x1010101010aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x121212121212aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x113313131313aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x141414141414aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x151515151515aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
    {
      pairAddress: "0x1661661161616aaaaaaaaaaaaaaaaa",
      token0Uri:
        "https://i.pinimg.com/564x/1c/76/2a/1c762ad8b094cd94feb88dd797933787.jpg",
      token1Uri:
        "https://i.pinimg.com/564x/cf/c5/fc/cfc5fcd2d0ce85f7085f6467ece6f5d5.jpg",
      token0Symbol: "AAA",
      token1Symbol: "BBB",
      pairTvl: 134000000000000000000n,
      pairVolume: 40000000000000000000n,
      pairBalance: 1000000000000000000n,
    },
  ];

  const pair = data.map((el) => {
    return {
      pairAddress: el.pairAddress,
      token0Uri: el.token0Uri,
      token1Uri: el.token1Uri,
      token0Symbol: el.token0Symbol,
      token1Symbol: el.token1Symbol,
      pairTvl: Number(el.pairTvl) / 10 ** 18,
      pairVolume: Number(el.pairVolume) / 10 ** 18,
      pairBalance: Number(el.pairBalance) / 10 ** 18,
    };
  });

  // useQuery("pairs", async () => {
  //   return pair;
  // });
  queryClient.setQueryData(["pairs"], pair);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          pools
        </div>
        <Dashboard arr={pair.slice(0, visible)} url="pool/top" title={titles} />

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

export default Pool;
