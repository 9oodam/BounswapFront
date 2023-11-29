import React, { useEffect, useState } from "react";
import { Divstyle } from "src/App.style";
import Card from "src/components/Card";
import Container from "src/components/container";
import { getAllTokens } from "src/features/AllTokens";
import { getTime } from "src/features/getTime";
import useWeb3 from "src/hooks/web3.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashTitle from "src/contents/governance/DashTitle";
import DashText from "src/contents/governance/DashText";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkButton from "src/components/CustomLinkButton";
import { getProposals } from "src/features/governance/govGetProposals";
import { bNCForExactTokens } from "src/features/pair/swapSendFeatures";

const Governance = () => {
  const [pop, setPop] = useState<Record<number, boolean>>({});
  const [nowTime, setNowTime] = useState<number>(0);
  const [forPercent, setForPercent] = useState<number>(0);
  const [againstPercent, setAgainstPercent] = useState<number>(0);

  useEffect(() => {
    var date = Date.now();
    var timestamp = date / 1000; // 형식화된 날짜 및 시간
    setNowTime(timestamp);
  }, []);

  // const { web3, governanceContract } = useWeb3(null);
  const { web3, governanceContract, pairContract, user } = useWeb3(null); // test
  const queryClient = useQueryClient();

  const getData = async () => {
    console.log("getdata");
    if (!governanceContract || !web3) return null;
    return await getProposals({governanceContract, queryClient, web3});
  };

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["proposals"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!governanceContract,
  });

  
  const test = async () => {
    if (!pairContract || !web3) {
      return;
    }

    const outputAmount = web3?.utils.toBigInt(web3.utils.toWei("0.1", "ether"));
    const maxToken = web3?.utils.toBigInt(web3.utils.toWei("0.2", "ether"));
    const inputToken = "0x846757DC36B8CBB7A53d0A238272e57cEf0b4dDE";
    const outputToken = "0x295bA6f9d3E1de3aDaf8d2260E4498c5Bf97BB69";

    const data = await bNCForExactTokens(pairContract, "0xD845A0AB1edcfBE3251ACeBa271B6f78F4AEe77A", outputAmount, maxToken, inputToken, outputToken, user.account);
    console.log("data", data);
  }




  if (!data) {
    return <>loading</>;
  }

  return (
    <Container>
      <button onClick={test}>test</button>
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
            <DashText data={data} />
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Governance;
