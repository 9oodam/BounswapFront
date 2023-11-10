import React from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import LogoArea from "./LogoArea";

const HeaderBox = (): JSX.Element => {
  return (
    <>
      <div className="mx-auto pc:flex mobile:hidden justify-center items-center w-full h-[93px] bg-opercityBlack rounded-[20px] mb-5 mt-3">
        <div className="flex w-full h-full items-center justify-between pl-10 pr-10">
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
