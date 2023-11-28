import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GithubArea from "../GithubArea";
import ToggleBtn from "src/components/toggleBtn";

const AppFooter: React.FC = () => {
  const [infoPop, setInfoPop] = useState(false);
  const location = useLocation();

  // const getTabStyle = (path: string) => {
  //   return location.pathname === path
  //     ? "text-deepGreen"
  //     : "text-white [text-shadow:0px_4px_4px_#00000040]";
  // };

  const getTabStyle = (path: string) => {
    return location.pathname === path ? true : false;
  };

  const handleClick = () => {
    setInfoPop(!infoPop);
    console.log("클릭함?");
  };
  return (
    <>
      <div className="min-w-[386px] pc:hidden mobile:fixed bottom-0 bg-AppFooterBack w-full h-[80px] flex items-center justify-evenly">
        <Link
          to="/swap"
          // className={`mr-[14px] ml-[14px] left-0 font-bold text-[22px] ${getTabStyle(
          //   "/swap"
          // )}`}
          onClick={() => {
            setInfoPop(false);
          }}
        >
          {getTabStyle("/swap") && !infoPop ? (
            <img
              src="/images/AppFooter_Swap_G.png"
              alt="swap"
              className="w-[40px] h-[40px]"
            />
          ) : (
            <img
              src="/images/AppFooter_Swap_W.png"
              alt="swap"
              className="w-[40px] h-[40px]"
            />
          )}
        </Link>
        <Link
          to="/tokens"
          // className={`mr-[14px] left-[87px] font-bold text-[22px] ${getTabStyle(
          //   "/tokens"
          // )}`}
          // style={getTextShadowStyle("/tokens")}
          onClick={() => {
            setInfoPop(false);
          }}
        >
          {getTabStyle("/tokens") && !infoPop ? (
            <img
              src="/images/AppFooter_Token_G.png"
              alt="tokens"
              className="w-[40px] h-[40px]"
            />
          ) : (
            <img
              src="/images/AppFooter_Token_W.png"
              alt="tokens"
              className="w-[40px] h-[40px]"
            />
          )}
        </Link>
        <Link
          to="/pool"
          // className={`mr-[14px] left-[193px] font-bold text-[22px] ${getTabStyle(
          //   "/poolpair"
          // )}`}
          // style={getTextShadowStyle("/poolpair")}
          onClick={() => {
            setInfoPop(false);
          }}
        >
          {getTabStyle("/pool") && !infoPop ? (
            <img
              src="/images/AppFooter_Pool_G.png"
              alt="pool"
              className="w-[40px] h-[40px]"
            />
          ) : (
            <img
              src="/images/AppFooter_Pool_W.png"
              alt="pool"
              className="w-[40px] h-[40px]"
            />
          )}
        </Link>
        <Link
          to="/stake"
          // className={`mr-[14px] left-[281px] font-bold text-[22px] ${getTabStyle(
          //   "/stake"
          // )}`}
          // style={getTextShadowStyle("/stake")}
          onClick={() => {
            setInfoPop(false);
          }}
        >
          {getTabStyle("/stake") && !infoPop ? (
            <img
              src="/images/AppFooter_Stake_G.png"
              alt="stake"
              className="w-[40px] h-[40px]"
            />
          ) : (
            <img
              src="/images/AppFooter_Stake_W.png"
              alt="stake"
              className="w-[40px] h-[40px]"
            />
          )}
        </Link>
        <Link
          to="/governance"
          className="w-[40px] h-[40px] flex items-center justify-center"
          // style={getTextShadowStyle("/governance")}
          onClick={() => {
            setInfoPop(false);
          }}
        >
          <div
            className={`text-[45px] font-semibold [text-shadow:0px_2px_2px_#00000040] ${
              getTabStyle("/governance") && !infoPop
                ? "text-deepGreen"
                : "text-baseWhite"
            }`}
          >
            G
          </div>
        </Link>
        <div className="w-[40px] h-[40px]" onClick={handleClick}>
          {infoPop ? (
            <img src="images/AppFooter_Info_G.png" alt="info" />
          ) : (
            <img src="images/AppFooter_Info_W.png" alt="info" />
          )}
        </div>
        <div
          className={`bg-opercityAppFooter dark:bg-[#ffffffCC] w-full h-[250px] absolute bottom-[80px] p-7 flex-col justify-center rounded-t-3xl ${
            infoPop ? `` : `hidden`
          }`}
        >
          <div className="flex items-center justify-center">
            <img
              src="/images/BounsIo_LOGO.png"
              alt="Logo"
              className="w-[40px] h-[40px]"
            />
            <div className="text-baseWhite dark:text-lightBlack font-bold [text-shadow:0px_4px_4px_#00000040]">
              BounSwap
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center justify-evenly mt-5">
            <GithubArea name="9oodam" address="https://github.com/9oodam" />
            <GithubArea name="ahyeona" address="https://github.com/ahyeona" />
            <GithubArea name="wijiwon" address="https://github.com/wijiwon" />
            <GithubArea
              name="youdonghee"
              address="https://github.com/youdonghee"
            />
            <GithubArea
              name="Jisub_Hwang"
              address="https://github.com/jisub12"
            />
          </div>
          <ToggleBtn />
        </div>
      </div>
    </>
  );
};

export default AppFooter;
