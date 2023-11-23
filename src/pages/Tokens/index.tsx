import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { TokenArray } from "src/Interface/Token.interface";
import Card from "src/components/Card";
import Container from "src/components/container";
import Dashboard from "src/contents/Stake/Dashboard";
import index from "src/contents/poolpair/PoolDetail";
import useWeb3 from "src/hooks/web3.hook";
import { ContractTransactionDataAndInputError } from "web3-errors";

const Tokens = () => {
  const {web3, dataContract} = useWeb3('');

  const [visible, setVisible] = useState(10);
  const [arr, setArr] = useState<TokenArray>([]);
  const [tokenArr, setTokenArr] = useState<TokenArray>([]);

  const queryClient = useQueryClient();

  const titles = {
    tokenName: "Token Name",
    tvl: "TVL",
    volume: "Volume",
    volume7D: "Volume(7D)",
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
      name: "Ether",
      Symbol: "ETH",
      uri: "https://i.pinimg.com/564x/d1/48/bd/d148bda5524dfcae85b2a1cdac8e7308.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
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
      name: "JIIIIIIP",
      Symbol: "JIP",
      uri: "https://i.pinimg.com/564x/23/e0/8d/23e08d5e5441651967611d4ac224a4d3.jpg",
      tvl: 19900000000000000000n,
      balance: 19900000000000000000n,
    },
  ];

  const token = data.map((el, index) => {
    return {
      tokenAddress: el.tokenAddress,
      name: el.name,
      symbol: el.Symbol,
      uri: el.uri,
      tvl: Number(el.tvl) / 10 ** 18,
      tokenVolume: 100,
      balance: Number(el.balance) / 10 ** 18,
    };
  });

  useEffect(() => {
    if(dataContract) {
      const fetchTokenData = async () => {
        const tokenArr : TokenArray = await dataContract.methods.getAllTokens().call();
        console.log(tokenArr)
        console.log('?')
        setArr(tokenArr);
      }
      fetchTokenData();
    }
  }, [dataContract])

  useEffect(() => {
    if(arr) {
      const token = arr.map((el, index) => {
        console.log(el);
        return {
          tokenAddress: el.tokenAddress,
          name: el.name,
          symbol: el.symbol,
          uri: el.uri,
          tvl: Number(el.tvl) / 10 ** 18,
          tokenVolume: 100,
          balance: Number(el.balance) / 10 ** 18,
        };
      });
      token.splice(1, 1); // govToken 제외
      setTokenArr(token);
    }
  }, [arr])

  // useQuery("tokens", async () => {
  //   // const data = await dataContract?.methods.getAllTokens().call();

  //   return token;
  // });
  queryClient.setQueryData("tokens", tokenArr);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };
  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Token
        </div>
        <Dashboard arr={tokenArr.slice(0, visible)} url="token" title={titles} />

        <div className="w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer">
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
