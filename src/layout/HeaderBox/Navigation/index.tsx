import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    return location.pathname === path
      ? "text-deepGreen"
      : "text-white [text-shadow:0px_4px_4px_#00000040]";
  };

  return (
    <div className="mobile:hidden flex w-[50%] header:w-[85%] justify-evenly">
      <Link
        to="/swap"
        className={` left-0 font-bold text-[22px] ${getTabStyle("/swap")}`}
      >
        Swap
      </Link>
      <Link
        to="/tokens"
        className={` left-[87px] font-bold text-[22px] ${getTabStyle(
          "/tokens"
        )}`}
        // style={getTextShadowStyle("/tokens")}
      >
        Tokens
      </Link>
      <Link
        to="/poolpair"
        className={` left-[193px] font-bold text-[22px] ${getTabStyle(
          "/poolpair"
        )}`}
        // style={getTextShadowStyle("/poolpair")}
      >
        Pools
      </Link>
      <Link
        to="/stake"
        className={` left-[281px] font-bold text-[22px] ${getTabStyle(
          "/stake"
        )}`}
        // style={getTextShadowStyle("/stake")}
      >
        Stake
      </Link>
      <Link
        to="/governance"
        className={` left-[281px] font-bold text-[22px] ${getTabStyle(
          "/governance"
        )}`}
        // style={getTextShadowStyle("/governance")}
      >
        Governance
      </Link>
    </div>
  );
};

export default Navigation;
