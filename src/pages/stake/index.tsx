import React, { useState } from "react";
import Container from "../../components/container";
import StakeDashboard from "../../contents/Stake/Dashboard";
import { useQueryClient } from "react-query";

const Stake = () => {
  const [visible, setVisible] = useState(10);
  const queryClient = useQueryClient();

  const data = [
    {
      // ! 스테이킹을 구별할 수 있는 요소는 CA가 아닌 poolId 값이 될 것!
      tokenCA: "0x1aaaaa123123213213213123213213123",
      tokenName: "Stake",
      tokenSymbol: "STK",
      tokenImg: "/images/LPToken_Steake2.png",
      totalStaked: 12345678,
      volume: 12000,
      APR: 2.33,
      your: 1234,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x2bbbbbb123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 124453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x3aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x4aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x5aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x6aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x7aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x8aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x9aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x10aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x11aaaaa123123213213213123213213123",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "Jipgagoshipda",
      tokenSymbol: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totalStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
      startTime: 1700100000,
      endTime: 1704452400,
    },
  ];
  queryClient.setQueryData("lpTokens", data);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  return (
    <>
      <Container>
        <div className="flex flex-col items-center">
          <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
            Stake
          </div>
          <StakeDashboard data={data.slice(0, visible)} />

          <div className="w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer">
            {visible < data.length ? (
              <button onClick={showMore}>show more</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Stake;
