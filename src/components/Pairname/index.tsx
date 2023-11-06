import { type } from "os";
import React from "react";
import PairImg from "./PairImg";
import PairTitle from "./PairTitle";

// type ReactNodeProps = {
//   children: React.ReactNode;
// };

const TopTitleDiv = () => {
  return (
    <>
      <img src="/images/backArrow.png"></img>
      <div className="flex flex-row items-center w-full mb-3">
        <PairImg></PairImg>
        <PairTitle></PairTitle>
      </div>
    </>
  );
};

export default TopTitleDiv;
