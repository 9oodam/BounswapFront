import React, { useState } from "react";
import { ProposalsArr } from "src/Interface/governance.interface";
import { getTime } from "src/features/getTime";
import ProposalsContent from "./ProposalsContent";
import VoteContent from "./VoteContent";

const DashText: React.FC<ProposalsArr> = ({ data, voteProposal }) => {
  const [pop, setPop] = useState<Record<number, boolean>>({});

  return (
    <>
      {data.map((el, index) => (
        <div className=" flex flex-col mobile:mt-3">
          <div
            className={`pc:grid pc:grid-cols-5 items-center text-deepBlack cursor-pointer hover:bg-opercityBlack pc:h-[60px] mobile:h-[50px] mobile:flex 
        ${
          pop[index]
            ? "border-t-4 border-r-4 border-l-4 rounded-t-3xl border-deepGreen"
            : ""
        }`}
            onClick={(e) => {
              setPop((pop) => ({ ...pop, [index]: !pop[index] })); // 행의 인덱스를 키로 사용하여 펼침 상태를 관리
            }}
          >
            <div
              className={`pc:col-span-3 mobile:w-[70%] text-left pc:pl-5 font-bold mobile:p-2  ${
                pop[index]
                  ? ``
                  : `mobile:text-ellipsis mobile:overflow-hidden mobile:whitespace-nowrap`
              } `}
            >
              {el.title}
            </div>
            <div className="mobile:w-[30%]">
              {/* 상태 처리 */}
              {el.state == 0 ? (
                <div className="border-2 border-gray-400 text-gray-400 font-bold inline-flex justify-center items-center p-1.5 rounded-xl mobile:rounded-lg mobile:text-[12px]">
                  PENDING
                </div>
              ) : el.state == 1 ? (
                <div className="border-2 border-red-400 text-red-400 font-bold inline-flex justify-center items-center p-1.5 rounded-xl mobile:rounded-lg mobile:text-[12px]">
                  DEFEATED
                </div>
              ) : (
                <div className="border-2 border-green-400 text-green-400 font-bold inline-flex justify-center items-center p-1.5 rounded-xl mobile:rounded-lg mobile:text-[12px]">
                  EXECUTED
                </div>
              )}
            </div>
            <div className="mobile:hidden">{getTime(Number(el.endTime))}</div>
          </div>

          {/* 펼침 내용 */}
          {pop[index] && (
            <div className="col-span-5 text-deepBlack border-deepGreen border-l-4 border-r-4 border-b-4 rounded-b-3xl">
              <div className="w-full flex pc:flex-row mobile:flex-col p-5">
                <ProposalsContent data={el} />
                <VoteContent data={el} voteProposal={voteProposal} />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default DashText;
