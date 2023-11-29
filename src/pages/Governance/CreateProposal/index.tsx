import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "src/components/container";
import { Divstyle } from "src/components/Pairname/Pairname.style";
import AddLiquidity from "src/contents/poolpair/Liquidity/AddLiquidity";
import ProposalForm from "src/contents/Proposal/ProposalForm";
import SubmitButton from "src/contents/Proposal/SubmitButton";
import TipSection from "src/contents/Proposal/TipSection";
import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import useWeb3 from "src/hooks/web3.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { propose } from "src/features/governance/govSendFeatures";

const CreateProposal = () => {
  const { web3, governanceContract, dataContract, pairContract, user } = useWeb3(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  
  const navigate = useNavigate();
  const backArrow = () => {
    navigate(-1);
  };
  
  const getData =async () => {
    if (!web3 || !dataContract || !pairContract || user.account == "") return null;
    const {gov} = await getUserTokens({pairContract, user : user, queryClient, dataContract, web3})
    return gov
  }

  const { data : gov } = useQuery({ queryKey : ["gov"], queryFn : getData, enabled : !!web3 && !!dataContract && !!pairContract && !!user });

  if (!gov) {
    return <>loading</>;
  }

  // 의제 제출
  const createProposal =async () => {

    // 거버넌스 토큰이 1 미만이면 불가
    if (gov?.tokenBalance < 1) {
      alert(`의제를 제출하려면 GOV 토큰이 1 이상이어야합니다.\n현재 : ${gov.tokenBalance}`);
      return;
    }

    if (!governanceContract || !web3 || user.account =="") return;
    
    const result = await propose(governanceContract, web3, user.account, title, description);
    
    if (result == 'succeed') {
      alert("의제를 제출했습니다.");
      navigate("/governance");
    } else {
      alert("error");
    }
  }

  return (
    <>
      <div className="flex justify-start">
        <img
          onClick={backArrow}
          src="/images/backArrow.png"
          className={Divstyle.arrowsize}
        />
      </div>
      <Container>
        <div className={Divstyles.flexCol}>
          <div className=" min-w-[340px] pc:w-[80%] mobile:w-[85%] p-5 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius m-5 mt-16 shadow-md">
            <div className="font-semibold text-[20px]">CreateProposal</div>
            <div className="w-full flex flex-col flex-wrap p-[20px]">
              <TipSection />
              <ProposalForm setTitle={setTitle} setDescription={setDescription}/>
              <SubmitButton onClick={createProposal} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateProposal;
