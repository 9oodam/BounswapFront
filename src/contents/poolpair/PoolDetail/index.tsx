import React from "react";
import PoolBox from "./PoolBox";
import { Divstyle } from "./Deposite.style";

const index = () => {
  return (
    <div className={Divstyle.flex}>
      <PoolBox title={"TVL"} amount={227.64}></PoolBox>
      <PoolBox title={"Volume(24H)"} amount={283.35}></PoolBox>
      <PoolBox title={"Volume(7D)"} amount={1.61223}></PoolBox>
    </div>
  );
};

export default index;
