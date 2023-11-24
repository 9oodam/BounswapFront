import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "src/components/container";
import { Divstyle } from "src/components/Pairname/Pairname.style";
import AddLiquidity from "src/contents/poolpair/Liquidity/AddLiquidity";
import ProposalForm from "src/contents/Proposal/ProposalForm";
import SubmitButton from "src/contents/Proposal/SubmitButton";
import TipSection from "src/contents/Proposal/TipSection";
import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";

const CreateProposal = () => {
  const navigate = useNavigate();
  const backArrow = () => {
    navigate(-1);
  };

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
              <ProposalForm />
              <SubmitButton />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateProposal;
