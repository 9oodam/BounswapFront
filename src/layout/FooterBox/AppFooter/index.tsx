import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppFooter: React.FC = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    return location.pathname === path
      ? "text-deepGreen"
      : "text-white [text-shadow:0px_4px_4px_#00000040]";
  };
  return (
    <>
      <div className="mobile:block pc:hidden">
        <Link
          to="/swap"
          className={`mr-[14px] ml-[14px] left-0 font-bold text-[22px] ${getTabStyle(
            "/swap"
          )}`}
        >
          Swap
        </Link>
        <Link
          to="/tokens"
          className={`mr-[14px] left-[87px] font-bold text-[22px] ${getTabStyle(
            "/tokens"
          )}`}
          // style={getTextShadowStyle("/tokens")}
        >
          Tokens
        </Link>
        <Link
          to="/pool"
          className={`mr-[14px] left-[193px] font-bold text-[22px] ${getTabStyle(
            "/poolpair"
          )}`}
          // style={getTextShadowStyle("/poolpair")}
        >
          Pools
        </Link>
        <Link
          to="/stake"
          className={`mr-[14px] left-[281px] font-bold text-[22px] ${getTabStyle(
            "/stake"
          )}`}
          // style={getTextShadowStyle("/stake")}
        >
          Stake
        </Link>
        <Link
          to="/governance"
          className={`mr-[14px] left-[281px] font-bold text-[22px] ${getTabStyle(
            "/governance"
          )}`}
          // style={getTextShadowStyle("/governance")}
        >
          Governance
        </Link>
      </div>
    </>
  );
};

export default AppFooter;
