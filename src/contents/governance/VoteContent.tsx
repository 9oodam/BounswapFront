import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { proposals } from "src/Interface/governance.interface";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { vote } from "src/features/governance/govSendFeatures";
import useWeb3 from "src/hooks/web3.hook";

const VoteContent: React.FC<{ data: proposals }> = ({ data }) => {
  const { user, web3, dataContract, governanceContract, pairContract } = useWeb3(null);

  const queryClient = useQueryClient();


  const getData =async () => {
    if (!web3 || !dataContract || !pairContract || user.account == "") return null;
    const {gov} = await getUserTokens({pairContract, user : user, queryClient, dataContract, web3})
    return gov
  }

  const { data : gov } = useQuery({ queryKey : ["gov"], queryFn : getData, enabled : !!web3 && !!dataContract && !!pairContract && !!user });

  // 투표
  const voteProposal =async (support : boolean) => {
    if (!governanceContract || user.account == "" || !gov) {
      alert("loading")
      return;
    }

    if (data.proposer.toUpperCase() == user.account.toUpperCase()) {
      alert("제출자는 투표 못 함");
      return;
    }

    // 거버넌스 토큰 0이면 투표 불가
    if (gov.tokenBalance == 0) {
      alert("거버넌스 토큰 없음");
      return;
    }

    const result = await vote(governanceContract, data.id, user.account, support);
    console.log("result", result);

    if (result == "succeed") {
      alert("succeed");
    } else if (result == "already voted") {
      alert("already voted");
    } else {
      alert("error");
    }
  }

  if (user.account == "" || !governanceContract) {
    return <>loading</>;
  }

  return (
    <div className=" pc:w-2/5 flex flex-col justify-start items-center rounded-bodyBackRadius bg-cardWhite pc:p-7 mobile:p-3 mx-3 shadow-md">
      <div className=" w-full flex flex-row justify-evenly">
        <div onClick={()=>{voteProposal(true)}} className="bg-green-300 text-baseWhite w-[130px] pc:h-[50px] mobile:h-[40px] flex justify-center items-center font-bold rounded-2xl shadow-md hover:bg-green-500 cursor-pointer mx-1">
          찬성
          <span className="font-medium text-[14px]">
            {data.forPercent}%
          </span>
        </div>
        <div onClick={()=>{voteProposal(false)}} className="bg-red-300 text-baseWhite w-[130px] pc:h-[50px] mobile:h-[40px] flex justify-center items-center font-bold rounded-2xl shadow-md hover:bg-red-500 cursor-pointer mx-1">
          반대
          <span className="font-medium text-[14px]">
            {data.againstPercent}%
          </span>
        </div>
      </div>
      <div className="w-[80%] mt-5 pc:p-5  ">
        <div className="flex flex-col">
          <div className=" w-full text-left">찬성</div>
          <div className="w-full text-right font-bold text-[17px]">
            <span className="text-deepGreen">{data.forVotes}</span> /{" "}
            <span className="text-lightBlack">{data.quorumVotes}</span>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="w-full text-left">반대</div>
          <div className="w-full text-right text-red-500 font-bold text-[17px]">
            {data.againstVotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteContent;
