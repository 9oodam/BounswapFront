import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "src/components/container";
import { Divstyle } from "src/components/Pairname/Pairname.style";
import AddLiquidity from "src/contents/poolpair/Liquidity/AddLiquidity";
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
              <div className="w-full bg-[#9CE084] rounded-[20px] text-xl flex items-center justify-center shadow-md p-2">
                <div className="text-deepGreen">
                  <strong>Tip:</strong>
                  Select an action and describe your proposal for the community.
                  The proposal cannot be modified after submission, so please
                  verify all information before submitting. The voting period
                  will begin immediately and last for 7 days. To propose a
                  custom action, read the docs.
                </div>
              </div>

              <div className="bg-cardWhite mt-[10px] pt-3 pb-3 pl-4 pr-4 rounded-[20px] border-[2px] border-[#22222212]">
                dd
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreateProposal;
