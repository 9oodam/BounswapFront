import React from "react";
import { PropoaslProps } from "src/Interface/governance.interface";

const VoteContent: React.FC<PropoaslProps> = ({ data, voteProposal }) => {

  return (
    <div className=" pc:w-2/5 flex flex-col justify-start items-center rounded-bodyBackRadius bg-cardWhite pc:p-7 mobile:p-3 mx-3 shadow-md">
      <div className=" w-full flex flex-row justify-evenly">
        <div onClick={() => { voteProposal(true, data.id, data.proposer) }} className="bg-green-300 text-baseWhite w-[130px] pc:h-[50px] mobile:h-[40px] flex justify-center items-center font-bold rounded-2xl shadow-md hover:bg-green-500 cursor-pointer mx-1">
          찬성
          <span className="font-medium text-[14px]">
            {data.forPercent}%
          </span>
        </div>
        <div onClick={() => { voteProposal(false, data.id, data.proposer) }} className="bg-red-300 text-baseWhite w-[130px] pc:h-[50px] mobile:h-[40px] flex justify-center items-center font-bold rounded-2xl shadow-md hover:bg-red-500 cursor-pointer mx-1">
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
