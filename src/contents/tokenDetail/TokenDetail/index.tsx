import React from "react";
import { TokenItem } from "src/Interface/Token.interface";
import PoolBox from "src/contents/poolpair/PoolDetail/PoolBox";

const TokenVolume: React.FC<{ data: TokenItem }> = ({ data }) => {
  return (
    <div className="flex w-full justify-evenly items-center pc:flex-row mobile:flex-col mt-4 mb-4">
      <PoolBox title={"TVL"} amount={data.tokenTvl}></PoolBox>
      <PoolBox title={"Volume(24H)"} amount={data.tokenVolume}></PoolBox>
      <PoolBox title={"Volume(7D)"} amount={data.tokenVolume7D}></PoolBox>
    </div>
  );
};

export default TokenVolume;
