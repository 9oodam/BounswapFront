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

  const { web3, governanceContract } = useWeb3(null);
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

  if (!data) {
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
            <DashText data={data} />
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Governance;
