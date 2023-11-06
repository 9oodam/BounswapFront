import { type } from "os";
import React from "react";
import CoinPairImg from "../CoinImg/CoinPairImg";
import BodyTitle from "../Titles/BodyTitle";

// type ReactNodeProps = {
//   children: React.ReactNode;
// };

const TopTitleDiv = () => {
  return (
    <div className="flex flex-row items-center w-full mb-3">
      <CoinPairImg></CoinPairImg>
      <BodyTitle></BodyTitle>
    </div>
  );
};

export default TopTitleDiv;
