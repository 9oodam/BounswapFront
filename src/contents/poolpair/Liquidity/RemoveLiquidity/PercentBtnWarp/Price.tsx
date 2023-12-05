import React from "react";

type match = {
  token0Match: string;
  token1Match: string;
  token0Symbol: string;
  token1Symbol: string;
};

const Price: React.FC<match> = ({
  token0Match,
  token1Match,
  token0Symbol,
  token1Symbol,
}) => {

  return (
    <div className="flex flex-col w-full text-[#7C7C7C] mobile:hidden">
      <div className="flex w-full justify-between">
        <div>Price :</div>
        <div className="flex">
          <div>1 {token0Symbol}</div>
          <div>=</div>
          <div>
            {token0Match} {token1Symbol}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div>1 {token1Symbol}</div>
        <div>=</div>
        <div>
          {token1Match} {token0Symbol}
        </div>
      </div>
    </div>
  );
};

export default Price;
