import React from "react";
import { proposals } from "src/Interface/governance.interface";
import { getTime } from "src/features/getTime";

const ProposalsContent: React.FC<{ data: proposals }> = ({ data }) => {
  return (
    <div className="flex justify-center pc:w-[70%] mobile:w-full mobile:mb-12">
      <div className="w-full mx-5">
        <div className="pc:hidden text-right mb-3">
          {getTime(data.startTime)} ~ {getTime(data.endTime)}
        </div>
        <div className="bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius shadow-md w-full min-h-[200px] p-2 text-left mobile:text-[14px]">
          {data.description}
        </div>
        <div className="w-full text-left p-2 font-bold text-[20px]">
          proposer.{" "}
          <span className="font-normal text-[15px] mobile:hidden">
            {data.proposer}
          </span>
          <span className="font-normal text-[15px] pc:hidden">{`${data.proposer.substring(
            0,
            4
          )}...${data.proposer.substring(data.proposer.length - 4)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProposalsContent;
