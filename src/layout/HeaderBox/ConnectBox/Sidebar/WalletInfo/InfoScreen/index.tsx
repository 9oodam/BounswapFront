import React, { useEffect, useState } from "react";
import useWeb3 from "src/hooks/web3.hook";
import SendBox from "./SendBox";
import ReceiveBox from "./ReceiveBox";
import TokenBox from "./TokenBox";
import PoolBox from "./PoolBox";
import ActivityBox from "./ActivityBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { getUserPools } from "src/features/data/dataGetUserPools";
import { addLiquidityBNC } from "src/features/pair/poolSendFeatures";
import { bNCForExactTokens } from "src/features/pair/swapSendFeatures";

const InfoScreen = () => {
  const { user, web3, dataContract, pairContract } = useWeb3(null);
  const [sendReceive, setSendReceive] = useState("");
  const [history, setHistory] = useState("Tokens");
  const [tokens, setTokens] = useState();
  const [pools, setPools] = useState();
  const [isData, setIsData] = useState(false);
  const queryClient = useQueryClient();

  // send, receive 영역 출력 여부 설정하는 함수
  const setShowSendReceive = (name: string) => {
    if (sendReceive != name) {
      setSendReceive(name)
    } else {
      setSendReceive("")
    }
  }

  const getTokens = async () => {
    if (!dataContract || !web3 || user.account == "") return null;
    const data = await getUserTokens({ dataContract, queryClient, userAddress: user.account, web3 });    
    setTokens(data);
    return data;
  }
  
  const getPools =async () => {
    if (!dataContract || !web3 || user.account == "") return null;
    const data = await getUserPools({dataContract, queryClient, userAddress : user.account, web3});
    setPools(data);
    return data;
  }


  // const { data: tokens } = useQuery({
  //   queryKey: ["userTokens"],
  //   queryFn: getTokens,
  //   gcTime: 0,
  //   staleTime: 0,
  //   refetchOnWindowFocus: "always",
  //   // enabled: !!dataContract && !!web3 && !!user,
  //   enabled: !(!dataContract || !web3 || !user)
  // });

  // const { data: pools } = useQuery({
  //   queryKey: ["userPairs"],
  //   queryFn: getPools,
  //   gcTime: 0,
  //   staleTime: 0,
  //   refetchOnWindowFocus: "always",
  //   // enabled: !!dataContract && !!web3 && !!user
  //   enabled: !(!dataContract || !web3 || !user)
  // });

  useEffect(()=>{
    if (!dataContract || !user || !web3) return;
    console.log("tokens", tokens);
    console.log("pools", pools);

    getTokens();
    getPools();
  }, [dataContract, user, web3]);


  if (!tokens || !pools) {
    return <>loading</>
  }


  // const test =async () => {
  //   if (!pairContract) return;
  //   try {
  //     // const data1 = await bNCForExactTokens(pairContract, "0x0459A3045Fe91e9Cf42D1A74bf391d0EA22E080D", 100000n, 150000n, "0x28125d2d7450F4837d030186c2076cC53af03dae", "0x0967FddEc5370F42218A8b0f898BcfF45F941084", user.account)
  //     // console.log("data1", data1);

  //     const data = await addLiquidityBNC(pairContract, "0x0967FddEc5370F42218A8b0f898BcfF45F941084", 10n, 1000n, user.account);
  //     console.log("testsetstets", data);
      
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  return (
    <div>      
      {/* bnc 금액 */}
      <h3 className="font-bold text-[23px] mb-5">
        {user.balance.split(".")[0] + "." + user.balance.split(".")[1]?.slice(0, 4)} BNC
      </h3>


      {/* send, receive */}
      <div>
        <div className="flex justify-evenly">
          <button onClick={() => { setShowSendReceive("send") }} className="w-[100px] bg-green-200 p-2 rounded-md">send</button>
          <button onClick={() => { setShowSendReceive("receive") }} className="w-[100px] bg-green-200 p-2 rounded-md">receive</button>
        </div>


        <div className="bg-gray-200">
          <div className='bg-indigo-200 w-[80%] m-auto'>
            {/* send 영역, receive 영역 */}
            {
              (sendReceive)?
                sendReceive == "send" ?
                  <SendBox />
                  :
                  <ReceiveBox />
                :
                <></>
            }
          </div>
        </div>


      </div>

      <div className="w-[100%] h-[1px] bg-gray-300 my-4"></div>

      {/* tokens, Pools, Activity */}
      <div>
        <div className="flex justify-evenly">
          <button className={`bg-${history === "Tokens" ? "yellow" : "gray"}-200 w-[100px] p-2 rounded`} onClick={() => { setHistory("Tokens") }}>Tokens</button>
          <button className={`bg-${history === "Tokens" ? "gray" : "yellow"}-200 w-[100px] p-2 rounded`} onClick={() => { setHistory("Pools") }} >Pools</button>
          {/* <button className="bg-yellow-200 p-2 rounded" onClick={(e) => { setShowHistory("Activity", e.target as Element) }} >Activity</button> */}
        </div>

        <div className="bg-yellow-200 h-[100%] rounded">
          {
            history == "Tokens" ?
              <TokenBox tokens={tokens} /> :
              <PoolBox pools={pools} />
            // <ActivityBox />
          }
        </div>

      </div>

    </div>
  );
};

export default InfoScreen;
