import Card from "src/components/Card";
import Container from "src/components/container";
import useWeb3 from "src/hooks/web3.hook";
import DashTitle from "src/contents/governance/DashTitle";
import DashText from "src/contents/governance/DashText";
import CustomLinkButton from "src/components/CustomLinkButton";
import LoadingIndicator from "src/components/LoadingIndicator";
import { getProposals } from "src/features/governance/govGetProposals";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { vote } from "src/features/governance/govSendFeatures";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Governance = () => {
  const { web3, governanceContract, pairContract, dataContract, user } = useWeb3(null);
  const [nowTime, setNowTime] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    var date = Date.now();
    var timestamp = date / 1000; // 형식화된 날짜 및 시간
    setNowTime(timestamp);
  }, []);

  const getData = async () => {
    if (!governanceContract || !web3) return null;
    return await getProposals({ governanceContract, queryClient, web3 });
  };

  const {
    data,
    refetch: refetchData
  } = useQuery({
    queryKey: ["proposals"],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!governanceContract,
  });

  const getGov = async () => {
    if (!web3 || !dataContract || !pairContract || user.account == "") return null;
    const { gov } = await getUserTokens({ pairContract, user: user, queryClient, dataContract, web3 })
    return gov
  }

  const { data: gov, refetch: refetchGov } = useQuery({ queryKey: ["gov"], queryFn: getGov, enabled: !!web3 && !!dataContract && !!pairContract && !!user });

  // 투표
  const voteProposal = async (support: boolean, id: number, proposer: string) => {
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

  if (!data) {
    refetchData();
    return <LoadingIndicator />
  }

  if (!gov) {
    refetchGov();
    return <LoadingIndicator />
  }

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-baseWhite w-[85%] text-left text-[35px] font-bold mt-7 shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25) flex justify-between items-center">
          Governance
          <CustomLinkButton
            to={"/governance/create"}
            children={"Create propsal"}
          />
        </div>

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
