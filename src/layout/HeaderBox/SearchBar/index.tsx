import React, { useEffect, useState } from "react";
import LogoArea from "../LogoArea";
import SerchHook from "./SerchHook";
import {
  DataItem,
  DataArray,
  EarlyInfo,
  EarlyArray,
  TokenNameInterface,
  SearchTokenInfo,
} from "src/Interface/Token.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import useWeb3 from "src/hooks/web3.hook";

const SearchBox = () => {
  // 1. web3로 토큰들(CA), Pair(CA) 다 가지고 와서 Data에 넣고
  // 2. SearchHook에 전달

  // 3. 해당 CA 클릭하면 상세페이지로 이동 (params)
  const [tokensData, setTokensData] = useState<SearchTokenInfo[]>([]);

  const [tokens, setTokens] = useState<string[]>([]);
  const params = useParams<{ id: string }>();
  const [selectItem, setSelectItem] = useState<SearchTokenInfo>();

  const queryClient = useQueryClient();

  const nav = useNavigate();

  const { web3, stakingContract, wbncContract, LPTokenContract } = useWeb3(
    window.ethereum
  );

  const pairData = ["APair", "BPair"];

  const getSymbol = async (contract: any) => {
    try {
      if (contract && web3) {
        const symbol = await contract.methods.symbol().call();
        const address = await contract.options.address;
        setTokensData((prev) => {
          const exists = prev.some((token) => token.symbol === symbol);
          if (!exists) {
            return [...prev, { symbol, address }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSymbol(wbncContract);
    getSymbol(LPTokenContract);
  }, [web3, wbncContract, LPTokenContract]);

  useEffect(() => {
    queryClient.setQueryData("tokens", tokensData);
  }, [tokensData]);

  useEffect(() => {
    const getTokens = async () => {
      const data = await queryClient.getQueryData<string[]>("tokens");
      setTokens(data ? data : []);
    };
    getTokens();
  }, [tokensData, queryClient, tokens]);

  useEffect(() => {
    if (tokensData) {
      const find = async () => {
        const select = await tokensData.find((el: SearchTokenInfo) => {
          return el.address == params.id;
        });
        setSelectItem(select);
      };
      find();
    }
  }, [tokensData, params.id, selectItem]);

  const { searchTerm, setSearchTerm, searchResults } = SerchHook(tokensData);

  const searchClickHandler = (tokenSymbol: string) => {
    const tokenInfo = tokensData.find((token) => token.symbol === tokenSymbol);
    if (tokenInfo) {
      nav(`/${tokenInfo.address}`);
    }
  };

  return (
    <div className="flex-col relative  justify-center w-[25%] mobile:w-[30%] header:hidden mobile:block">
      <div className="flex">
        <div className="pc:w-[331px] w-full relative h-[46px] rounded-[63px] overflow-hidden border-[3px] border-baseWhite shadow-[0px_4px_5px_#00000040]">
          <img
            className="absolute w-[22px] h-[21px] top-[10px] left-[15px]"
            alt="Search icon"
            src="/images/search.svg"
          />
          <input
            className="absolute w-full h-full left-0 top-0 pl-[48px] pr-3 py-0 opacity-80 [font-family:'Inter-Bold',Helvetica] font-bold text-baseWhite text-[19px] tracking-[0] leading-[normal] placeholder-baseWhite bg-transparent border-none outline-none"
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="absolute top-full left-0 bg-lime-500 z-10 w-full max-h-[300px] overflow-auto"> */}
      <div className="pc:w-[331px] w-full absolute top-full left-0 bg-lime-500 z-10 max-h-[300px] overflow-auto  border-baseWhite">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((tokenSymbol, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-white"
                onClick={() => searchClickHandler(tokenSymbol.symbol)}
              >
                {tokenSymbol.symbol}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
