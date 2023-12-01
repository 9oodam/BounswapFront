import React, { useEffect, useState } from "react";
import LogoArea from "../LogoArea";
import SerchHook from "./SerchHook";
import { SearchTokenInfo, SearchTokenArr } from "src/Interface/Token.interface";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";
import { getAllTokens } from "src/features/data/dataGetAllTokens";
import { getAllPools } from "src/features/data/dataGetAllPools";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const SearchBox = () => {
  const [allTokenData, setAllTokenData] = useState<SearchTokenArr>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const params = useParams<{ id: string }>();
  const [selectItem, setSelectItem] = useState<SearchTokenInfo>();

  const queryClient = useQueryClient();

  const nav = useNavigate();

  const { web3, dataContract, pairContract } =
    useWeb3(window.ethereum);

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
    <div className="flex-col relative  justify-center w-[25%] mobile:w-[30%] header:hidden mobile:block mobile:w-[70%]">
      <div className="flex">
        <div className="pc:w-[331px] w-full relative h-[46px] rounded-[63px] overflow-hidden border-[3px] border-baseWhite shadow-[0px_4px_5px_#00000040]">
          <img
            className="absolute w-[22px] h-[21px] top-[10px] left-[15px]"
            alt="Search icon"
            src={`${ImgBaseUrl()}search.svg`}
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
            {searchResults.map((token, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-white"
                onClick={() => searchClickHandler(token.tokenSymbol)}
              >
                {token.tokenUri && token.tokenUri.includes("+") ? (
                  token.tokenUri
                    .split("+")
                    .map((uri, uriIndex) => (
                      <img
                        key={uriIndex}
                        src={uri}
                        alt={`${token.tokenSymbol}-${uriIndex}`}
                        className="inline-block w-[25px] h-[25px] rounded-full border-[1px] border-gray-300"
                      />
                    ))
                ) : (
                  <img
                    src={token.tokenUri}
                    alt={token.tokenSymbol}
                    className="inline-block w-[25px] h-[25px] rounded-full border-[1px] border-gray-300"
                  />
                )}

                {token.tokenName ? (
                  <span>{`${token.tokenName}/${token.tokenSymbol}`}</span>
                ) : (
                  <span>{token.tokenSymbol}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
