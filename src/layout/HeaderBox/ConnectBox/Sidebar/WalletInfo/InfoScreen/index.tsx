import React, { useEffect, useState } from "react";
import useWeb3 from "src/hooks/web3.hook";
import SendBox from "./SendBox";
import ReceiveBox from "./ReceiveBox";
import TokenBox from "./TokenBox";
import PoolBox from "./PoolBox";
import ActivityBox from "./ActivityBox";

const InfoScreen = () => {
  const { user } = useWeb3(null);
  const [sendReceive, setSendReceive] = useState("");
  const [history, setHistory] = useState("Tokens");

  // send, receive 영역 출력 여부 설정하는 함수
  const setShowSendReceive = (name: string) => {
    if (sendReceive != name) {
      setSendReceive(name)
    } else {
      setSendReceive("")
    }
  }

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
              sendReceive ?
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
              <TokenBox /> :
              <PoolBox />
                // <ActivityBox />
          }
        </div>

      </div>

    </div>
  );
};

export default InfoScreen;
