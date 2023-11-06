import React from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import LogoArea from "./LogoArea";

const HeaderBox = () => {
  return (
    <>
      <div className="relative w-[1359px] h-[93px] bg-[#37373740] rounded-[20px]">
        <LogoArea />
        <Navigation />
        <SearchBox />
        <WalletInfo />
      </div>
    </>
  );
};

export default HeaderBox;
