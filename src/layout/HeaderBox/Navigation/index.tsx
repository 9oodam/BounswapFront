import LogoArea from "../LogoArea";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const getTabStyle = (path: string) => {
    return location.pathname === path
      ? "text-deepGreen"
      : "text-white [text-shadow:0px_4px_4px_#00000040]";
  };

  return (
    <div className="flex justify-between pc:w-[50%] header:w-[85%] h-100% items-center mobile:w-[20%]">
      <LogoArea />
      <div className="mobile:hidden flex justify-around flex-grow">
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
        >
          Tokens
        </Link>
        <Link
          to="/pool"
          className={`mr-[14px] left-[193px] font-bold text-[22px] ${getTabStyle(
            "/pool"
          )}`}
        >
          Pools
        </Link>
        <Link
          to="/stake"
          className={`mr-[14px] left-[281px] font-bold text-[22px] ${getTabStyle(
            "/stake"
          )}`}
        >
          Stake
        </Link>
        <Link
          to="/governance"
          className={`mr-[14px] left-[281px] font-bold text-[22px] ${getTabStyle(
            "/governance"
          )}`}
        >
          Governance
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
