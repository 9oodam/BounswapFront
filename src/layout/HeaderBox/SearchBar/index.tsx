import React, { useEffect, useState } from "react";
import LogoArea from "../LogoArea";
import SerchHook from "./SerchHook";
import { SearchTokenInfo, SearchTokenArr } from "src/Interface/Token.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";
import { getAllTokens } from "src/features/data/dataGetAllTokens";
import { getAllPools } from "src/features/data/dataGetAllPools";

const SearchBox = () => {
  const [allTokenData, setAllTokenData] = useState<SearchTokenArr>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const params = useParams<{ id: string }>();
  const [selectItem, setSelectItem] = useState<SearchTokenInfo>();

  const queryClient = useQueryClient();

  const nav = useNavigate();

  const { web3, dataContract, pairContract } = useWeb3(window.ethereum);

  const getPoolData = async () => {
    if (!pairContract || !dataContract || !web3) {
      return;
    }
    const poolData = await getAllPools({
      pairContract,
      dataContract,
      queryClient,
      web3,
    });
    return poolData;
  };

  const {
    data: poolArr,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["pairs"],
    queryFn: getPoolData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!dataContract && !!web3,
  });

  useEffect(() => {
    const fetchAllTokens = async () => {
      try {
        const data = await (getAllTokens as any)({
          pairContract: pairContract,
          dataContract: dataContract,
          queryClient: queryClient,
          web3: web3,
        });

        const poolData =
          poolArr?.map((pool) => {
            return {
              tokenAddress: pool.pairAddress,
              tokenSymbol: `${pool.token0Symbol}/${pool.token1Symbol}`,
              tokenUri: `${pool.token0Uri}+${pool.token1Uri}`,
              isPair: true,
            };
          }) || [];

        const updateData = [...data, ...poolData];

        setAllTokenData(updateData);
      } catch (error) {
        console.log(error);
      }
    };

    console.log("allTokenData", allTokenData);
    fetchAllTokens();
  }, [pairContract, dataContract, queryClient, web3, poolArr]);

  useEffect(() => {
    queryClient.setQueryData(["tokens"], allTokenData);
  }, [allTokenData]);

  useEffect(() => {
    const getTokens = async () => {
      const data = queryClient.getQueryData<string[]>(["tokens"]);
      setTokens(data ? data : []);
    };
    getTokens();
  }, [allTokenData, queryClient, tokens]);

  useEffect(() => {
    if (allTokenData) {
      const find = async () => {
        const select = allTokenData.find((el: SearchTokenInfo) => {
          return el.tokenAddress == params.id;
        });
        setSelectItem(select);
      };
      find();
    }
  }, [allTokenData, params.id, selectItem]);

  const { searchTerm, setSearchTerm, searchResults } = SerchHook(allTokenData);

  const searchClickHandler = (tokenSymbol: string) => {
    const tokenInfo = allTokenData.find(
      (token) => token.tokenSymbol === tokenSymbol
    );
    if (tokenInfo) {
      if (tokenInfo.isPair) {
        nav(`pool/top/${tokenInfo.tokenAddress}`);
      } else {
        nav(`tokens/${tokenInfo.tokenAddress}`);
      }
      setSearchTerm("");
    }
  };

  if (!poolArr && !allTokenData) {
    return <>loading</>;
  }

  return (
    <div className="flex-col relative justify-center w-[25%] mobile:w-[30%] header:hidden mobile:block">
      <div className="flex">
        <div className="pc:w-[331px] w-full relative h-[46px] rounded-[63px] overflow-hidden border-[3px] border-baseWhite shadow-[0px_4px_5px_#00000040] pc:bg-[#c9f399] mobile:bg-[#a8e99d]">
          <img
            className="absolute w-[22px] h-[21px] top-[10px] left-[15px]"
            alt="Search icon"
            src="/images/search.svg"
          />
          <input
            className="w-full h-full left-0 top-0 pl-[48px] pr-3 py-3 px-4 opacity-80 font-bold text-baseWhite text-[19px] tracking-[0] placeholder-baseWhite bg-transparent border-none focus:outline-none focus:ring-0 "
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="rounded-b-3xl border-x-3 border-baseWhite text-baseWhite pc:w-[331px] w-full absolute top-[20px] left-0 z-[-100] max-h-[300px] overflow-auto pc:bg-[#c9f399] mobile:bg-[#a8e99d] border-[3px] pt-[30px]">
         */}
        <div
          className={`rounded-b-3xl text-baseWhite pc:w-[331px] w-full absolute top-[20px] left-0 z-[-100] max-h-[200px] overflow-auto pc:bg-[#c9f399] mobile:bg-[#a8e99d] pt-[30px] ${
            searchResults.length > 0
              ? "border-[3px] border-x-3 border-baseWhite"
              : ""
          }`}
        >
          {searchResults.length > 0 && (
            <ul className="overflow-y-auto h-full">
              {searchResults.map((token, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 h-[35px] font-bold cursor-pointer hover:text-deepGreen"
                  onClick={() => searchClickHandler(token.tokenSymbol)}
                >
                  {token.tokenUri && token.tokenUri.includes("+") ? (
                    token.tokenUri.split("+").map((uri, uriIndex) => (
                      //! tokenUrI 한개씩 뽑아올수있는지 물어보기
                      <img
                        key={uriIndex}
                        src={uri}
                        alt={`${token.tokenSymbol}-${uriIndex}`}
                        className="inline-block w-[28px] h-[28px] rounded-full border-[1px] border-baseWhite mr-2"
                      />
                    ))
                  ) : (
                    <img
                      src={token.tokenUri}
                      alt={token.tokenSymbol}
                      className="inline-block w-[28px] h-[28px] rounded-full border-[1px] border-baseWhite mr-2"
                    />
                  )}

                  <span className="text-lg [text-shadow:0px_2px_3px_#00000040]">
                    {token.tokenName ? (
                      <span>{`${token.tokenName}/${token.tokenSymbol}`}</span>
                    ) : (
                      <span>{token.tokenSymbol}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
