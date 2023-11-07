import React from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import LogoArea from "./LogoArea";

const HeaderBox = (): JSX.Element => {
  return (
    <>
      <div className="mx-auto flex justify-center items-center w-4/5 h-[93px] bg-[#37373740] rounded-[20px] mb-5 mt-10">
        {/* <div className="relative w-full h-full"> */}
        <div className="flex w-full h-full">
          <LogoArea />
          <Navigation />
          <SearchBox />
          <WalletInfo />
        </div>
      </div>
    </>
  );
};

export default HeaderBox;
