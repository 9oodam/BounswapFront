import React from "react";
import PoolBox from "./PoolBox";
import { Divstyle } from "./Deposite.style";
import { PairItem } from "src/Interface/Token.interface";

const index:React.FC<{data: PairItem}> = ({data}) => {
  return (
    <div className={Divstyle.flex}>
      <PoolBox title={"TVL"} amount={data.pairTvl}></PoolBox>
      <PoolBox title={"Volume(24H)"} amount={data.pairVolume}></PoolBox>
      <PoolBox title={"Volume(7D)"} amount={data.pairVolume}></PoolBox>
    </div>
  );
};

export default index;
