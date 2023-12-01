import React, { useEffect, useState } from "react";
import useWeb3 from "src/hooks/web3.hook";
import SendBox from "./SendBox";
import ReceiveBox from "./ReceiveBox";
import TokenBox from "./TokenBox";
import PoolBox from "./PoolBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { getUserPools } from "src/features/data/dataGetUserPools";
import { addLiquidityBNC } from "src/features/pair/poolSendFeatures";
import { bNCForExactTokens } from "src/features/pair/swapSendFeatures";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const InfoScreen = () => {
  const { user, web3, dataContract, pairContract } = useWeb3(null);
  const [sendReceive, setSendReceive] = useState("");
  const [history, setHistory] = useState("Tokens");
  const [isData, setIsData] = useState(false);
  const queryClient = useQueryClient();

  // send, receive 영역 출력 여부 설정하는 함수
  const setShowSendReceive = (name: string) => {
    if (sendReceive != name) {
      setSendReceive(name);
    } else {
      setSendReceive("");
    }
  };

  const getTokens = async () => {
    console.log("gettokens1");
    if (!pairContract || !dataContract || !web3 || user.account == "")  return null;
    console.log("gettoekns2");
    const data = await getUserTokens({
      pairContract,
      dataContract,
      queryClient,
      user: user,
      web3,
    });
    return data.userTokens;
  };

  const getPools = async () => {
    if (!pairContract || !dataContract || !web3 || user.account == "")
      return null;
    const data = await getUserPools({
      pairContract,
      dataContract,
      queryClient,
      userAddress: user.account,
      web3,
    });
    return data;
  };

  const getButtonClass = (buttonType: string) => {
    return `w-[120px] h-[40px] rounded-[10px] font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md pl-[10px] pr-[10px] ${
      sendReceive === buttonType ? "bg-deepGreen" : "bg-lightGreen"
    }`;
  };

  const getBoxClass = () => {
    return `w-[80%] m-auto ${sendReceive ? "" : "bg-blue"}`;
  };

  const { data: tokens, refetch: tokenRefetch } = useQuery({
    queryKey: ["userTokens"],
    queryFn: getTokens,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!dataContract || !web3 || !user)
  });

  const { data: pools, refetch: poolRefetch } = useQuery({
    queryKey: ["userPairs"],
    queryFn: getPools,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!dataContract || !web3 || !user)
  });

  useEffect(()=>{
    tokenRefetch();
    poolRefetch();
  }, [user]);


  if (!tokens || !pools) {
    if (!tokens) {
      tokenRefetch();
    }

    if (!pools) {
      poolRefetch();
    }

    return (
      <div className="w-full pc:h-[80vh] mobile:h-[70vh] flex items-center justify-center ">
        <div className="w-[200px] h-[200px] rounded-full shadow-xl">
          <img src={`${ImgBaseUrl()}Loading.gif`} alt="Loading" />
        </div>
      </div>
    );
  }


  return (
    <div className="w-full">
      {/* bnc 금액 */}
      <h3 className="font-bold text-[23px] mb-7 ">
        {/* {user.balance.split(".")[0] +
          "." +
          user.balance.split(".")[1]?.slice(0, 4)}{" "} */}
          {Number(tokens[0].tokenBalance).toFixed(4)}
        BNC
      </h3>

      {/* send, receive */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-evenly">
          <button
            onClick={() => {
              setShowSendReceive("send");
            }}
            className={getButtonClass("send")}
          >
            send
          </button>
          <button
            onClick={() => {
              setShowSendReceive("receive");
            }}
            className={getButtonClass("receive")}
          >
            receive
          </button>
        </div>

        <div className="w-full">
          <div className={getBoxClass()}>
            {/* send 영역, receive 영역 */}
            {sendReceive ? (
              sendReceive == "send" ? (
                <SendBox />
              ) : (
                <ReceiveBox />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="w-[100%] h-[1px] bg-gray-300 my-4" />

      {/* tokens, Pools, Activity */}
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-evenly">
          <button
            className={`w-[100px] p-2 rounded hover:scale-105 ${
              history === "Tokens" ? "font-bold" : "font-normal"
            }`}
            onClick={() => {
              setHistory("Tokens");
            }}
          >
            Tokens
          </button>
          <button
            className={`w-[100px] p-2 rounded hover:scale-105 ${
              history === "Tokens" ? "font-normal" : "font-bold"
            }`}
            onClick={() => {
              setHistory("Pools");
            }}
          >
            Pools
          </button>
          {/* <button className="bg-yellow-200 p-2 rounded" onClick={(e) => { setShowHistory("Activity", e.target as Element) }} >Activity</button> */}
        </div>

        <div className="w-[80%] h-[100%] rounded">
          {
            history == "Tokens" ? (
              <TokenBox tokens={tokens} />
            ) : (
              <PoolBox pools={pools} />
            )
            // <ActivityBox />
          }
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;