import React from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import LogoArea from "./LogoArea";

const HeaderBox = (): JSX.Element => {
  return (
    <>
      <div className="mx-auto flex justify-center items-center w-[1359px] h-[93px] bg-[#37373740] rounded-[20px]">
        <div className="relative w-full h-full">
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
