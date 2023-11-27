import React from "react";

const index = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div className="pc:w-[32%] pc:min-w-[100px] mobile:w-[90%] pc:h-[100px] rounded-coinBox bg-cardWhite pc:p-3 mobile:p-5 flex flex-col items-center justify-evenly mobile:m-2">
      {/* 금액 */}
      <div className="text-lg w-full text-start text-deepBlack font-bold">
        {title}
      </div>
      {/* 심볼 */}
      <div className="w-full text-end text-lightBlack text-lg">{amount}</div>
    </div>
  );
};

export default index;
