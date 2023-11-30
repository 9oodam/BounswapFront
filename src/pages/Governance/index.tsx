import React, { useEffect, useState } from "react";
import { Divstyle } from "src/App.style";
import Card from "src/components/Card";
import Container from "src/components/container";
import useWeb3 from "src/hooks/web3.hook";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import DashTitle from "src/contents/governance/DashTitle";
import DashText from "src/contents/governance/DashText";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkButton from "src/components/CustomLinkButton";
import { getProposals } from "src/features/governance/govGetProposals";
import { bNCForExactTokens } from "src/features/pair/swapSendFeatures";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { vote } from "src/features/governance/govSendFeatures";

const Governance = () => {
  const { web3, governanceContract, pairContract, dataContract, user } = useWeb3(null);
  const [pop, setPop] = useState<Record<number, boolean>>({});
  const [nowTime, setNowTime] = useState<number>(0);
  const [forPercent, setForPercent] = useState<number>(0);
  const [againstPercent, setAgainstPercent] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    var date = Date.now();
    var timestamp = date / 1000; // 형식화된 날짜 및 시간
    setNowTime(timestamp);
  }, []);


  const getData = async () => {
    if (!governanceContract || !web3) return null;
    return await getProposals({governanceContract, queryClient, web3});
  };

  const {
    data,
    isLoading,
    error,
    refetch : refetchData
  } = useQuery({
    queryKey: ["proposals"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!governanceContract,
  });

// -----------------------------

  const getGov =async () => {
    if (!web3 || !dataContract || !pairContract || user.account == "") return null;
    const {gov} = await getUserTokens({pairContract, user : user, queryClient, dataContract, web3})
    return gov
  }

  const { data : gov, refetch : refetchGov } = useQuery({ queryKey : ["gov"], queryFn : getGov, enabled : !!web3 && !!dataContract && !!pairContract && !!user });

  // const data = useQueries({
  //   queries : [
  //     {
  //       queryKey: ["proposals"],
  //       queryFn: getData,
  //       gcTime: 0,
  //       staleTime: 0,
  //       refetchOnWindowFocus: "always",
  //       enabled: !!governanceContract,
      
  //     },
  //     { queryKey : ["gov"], queryFn : getGov, refetchOnWindowFocus: "always", staleTime : 0,  enabled : !!web3 && !!dataContract && !!pairContract && !!user }
  //   ]
  // });

    // 투표
    const voteProposal =async (support : boolean, id : number, proposer : string) => {
      if (!governanceContract || user.account == "" || !gov) {
        alert("loading")
        return;
      }
  
      if (proposer.toUpperCase() == user.account.toUpperCase()) {
        alert("제출자는 투표 못 함");
        return;
      }
  
      // 거버넌스 토큰 0이면 투표 불가
      if (gov.tokenBalance == 0) {
        alert("거버넌스 토큰 없음");
        return;
      }
  
      const result = await vote(governanceContract, id, user.account, support);
      console.log("result", result);
  
      if (result == true) {
        alert("투표되었습니다.");
      } else if (result == "already voted") {
        alert("이미 투표했습니다.");
      } else {
        alert("투표 취소");
      }
  
      refetchGov();
      refetchData();
    }

// -----------------------------




  
  // // bnc bnb
  // const test = async () => {
  //   if (!pairContract || !web3) {
  //     return;
  //   }

  //   const outputAmount = web3?.utils.toBigInt(web3.utils.toWei("0.1", "ether"));
  //   const maxToken = web3?.utils.toBigInt(web3.utils.toWei("0.2", "ether"));
  //   const inputToken = "0x846757DC36B8CBB7A53d0A238272e57cEf0b4dDE";
  //   const outputToken = "0x295bA6f9d3E1de3aDaf8d2260E4498c5Bf97BB69";

  //   const data = await bNCForExactTokens(pairContract, "0xD845A0AB1edcfBE3251ACeBa271B6f78F4AEe77A", outputAmount, maxToken, inputToken, outputToken, user.account);
  //   console.log("data", data);
  // }

  // // bnc usdt
  // const test = async () => {
  //   if (!pairContract || !web3 || !user) {
  //     return;
  //   }

  //   const outputAmount = web3?.utils.toBigInt(web3.utils.toWei("0.1", "ether"));
  //   const maxToken = web3?.utils.toBigInt(web3.utils.toWei("0.2", "ether"));
  //   const inputToken = "0x846757DC36B8CBB7A53d0A238272e57cEf0b4dDE";
  //   const outputToken = "0xB398984B5D3bb29D3461Fd96f527DA3181689431";

  //   const data = await bNCForExactTokens(pairContract, "0xA43951C8DeeCd1b87A9e907Da723F111f0A17D9d", outputAmount, maxToken, inputToken, outputToken, user.account);
  //   console.log("data", data);
  // }



  if (!data) {
    refetchData();
    return <>loading</>;
  }

  if (!gov) {
    refetchGov();
    return <>loading</>;
  }

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25)">
          Governance
        </div>

        <CustomLinkButton
          to={"/governance/create"}
          children={"Create propsal"}
        />

        <Card>
          <div className="pc:grid w-full pc:gap-y-4">
            <DashTitle />
            <DashText data={data} voteProposal={voteProposal} />
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Governance;
