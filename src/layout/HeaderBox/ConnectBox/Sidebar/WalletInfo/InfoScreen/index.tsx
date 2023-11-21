import React, { useEffect, useState } from "react";
import useWeb3 from "src/hooks/web3.hook";
import SendBox from "./SendBox";
import ReceiveBox from "./ReceiveBox";
import TokenBox from "./TokenBox";
import PoolBox from "./PoolBox";
import ActivityBox from "./ActivityBox";
// import Tap from "../../../../../../contents/poolpair/Liquidity/Tap";

const InfoScreen = () => {
  const { user } = useWeb3(null);
  const [sendReceive, setSendReceive] = useState("");
  const [history, setHistory] = useState("Tokens");
  
  useEffect(()=>{
    console.log("send receive 영역");
  }, [sendReceive]);

  // send, receive 영역 출력 여부 설정하는 함수
  const setShowSendReceive = (name : string) => {
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
      {user.balance.split(".")[0] +"."+ user.balance.split(".")[1]?.slice(0,4)} BNC
    </h3>


    {/* send, receive */}
    <div>
    <div style={{display:"flex", justifyContent : "space-evenly"}}>
      <button onClick={()=>{setShowSendReceive("send")}} style={{backgroundColor:"white"}}>send</button>
      <button onClick={()=>{setShowSendReceive("receive")}} style={{backgroundColor:"white"}}>receive</button>
    </div>
      

    <div style={{backgroundColor:"greenyellow"}}>
      {/* send 영역, receive 영역 */}
      {
        sendReceive ?
        sendReceive=="send" ? 
        <SendBox />
        :
        <ReceiveBox />
        :
        <></>
      }
    </div>
      

    </div>

      <div style={{width: "100%", height : "1px", backgroundColor:"gray", marginTop : "20px", marginBottom: "20px"}}></div>
    {/* tokens, Pools, Activity */}
    <div>
      <div style={{display:"flex", justifyContent : "space-evenly"}}>
        <button onClick={()=>{setHistory("Tokens")}} style={{backgroundColor:"white"}}>Tokens</button>
        <button onClick={()=>{setHistory("Pools")}} style={{backgroundColor:"white"}}>Pools</button>
        <button onClick={()=>{setHistory("Activity")}} style={{backgroundColor:"white"}}>Activity</button>
      </div>

      {
        history == "Tokens" ?
        <TokenBox /> :
        history == "Pools" ?
        <PoolBox /> :
        <ActivityBox />
      }

    </div>

  </div>
  );
};

export default InfoScreen;
