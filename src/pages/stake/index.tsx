import React, { useState } from "react";
import Container from "../../components/container";
import StakeDashboard from "../../contents/Stake/Dashboard";
const Stake = () => {
  const [visible, setVisible] = useState(10);

  const data = [
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "STK",
      tokenImg: "/images/LPToken_Steake2.png",
      totkeStaked: 12345678,
      volume: 12000,
      APR: 2.33,
      your: 1234,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
    {
      tokenCA: "0x23j4bk4hjb34243242kj124324341j",
      tokenName: "JGD",
      tokenImg:
        "https://i.pinimg.com/564x/c6/ee/71/c6ee712799d7193ce735a727fd3e9296.jpg",
      totkeStaked: 23449453,
      volume: 6578,
      APR: 3.53,
      your: 786,
    },
  ];

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  return (
    // ! 대시보드 타이틀 / show more 수정 / 클릭 이벤트. 클릭 시 토큰 CA값 파라미더로 전달
    <>
      <Container>
        <StakeDashboard data={data.slice(0, visible)} />
        {visible < data.length ? (
          <button onClick={showMore}>show more</button>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Stake;
