import React, { useState } from "react";
import { DataArray } from "src/Interface/Token.interface";

const SelectToken: React.FC<{ data: DataArray }> = ({ data }) => {
  return (
    <div className="w-full h-56px top-0 left-0">
      <div className="w-[36px] h-[36px]">
        {/* <img src={data.tokenImg} alt="" /> */}
        {/* <div>{data.tokenSymbol}</div> */}
      </div>
    </div>
  );
};

export default SelectToken;
