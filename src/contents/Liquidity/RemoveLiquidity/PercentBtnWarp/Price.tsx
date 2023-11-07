import React from "react";

const Price = () => {
  return (
    <div className="flex flex-col w-[500px] text-[#7C7C7C]">
      <div className="flex w-full justify-between">
        <div>Price :</div>
        <div className="flex">
          <div>1 ETH</div>
          <div>=</div>
          <div>1897.55 USDT</div>
        </div>
      </div>
      <div className="flex justify-end">
        <div>1 USDT</div>
        <div>=</div>
        <div>0.0000526996 ETH</div>
      </div>
    </div>
  );
};

export default Price;
