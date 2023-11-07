import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    return location.pathname === path
      ? "text-green-yellow-accent"
      : "text-green-yellow-base";
  };

  return (
    <div className="absolute top-[35px] left-[158px] w-[354px] h-[23px]">
      <Link
        to="/swap"
        className={`absolute left-0 font-bold text-[22px] ${getTabStyle(
          "/swap"
        )}`}
      >
        Swap
      </Link>
      <Link
        to="/tokens"
        className={`absolute left-[87px] font-bold text-[22px] ${getTabStyle(
          "/tokens"
        )}`}
      >
        Tokens
      </Link>
      <Link
        to="/apool"
        className={`absolute left-[193px] font-bold text-[22px] ${getTabStyle(
          "/apool"
        )}`}
      >
        Pools
      </Link>
      <Link
        to="/stake"
        className={`absolute left-[281px] font-bold text-[22px] ${getTabStyle(
          "/stake"
        )}`}
      >
        Stake
      </Link>
    </div>
  );
};

export default Navigation;
