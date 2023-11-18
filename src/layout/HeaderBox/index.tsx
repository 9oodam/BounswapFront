import React, { useEffect, useState } from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBar/index";
import Navigation from "./Navigation";
import LogoArea from "./LogoArea";

const HeaderBox = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-10 ${
          isScrolled ? "bg-headerBack" : "bg-headerBackScrolled"
        }`}
      >
        <div className="pc:flex mobile:hidden justify-center items-center w-full  mb-6 mt-3">
          <div className="flex w-full h-full items-center justify-between pl-10 pr-10">
            <LogoArea />
            <Navigation />
            <SearchBox />
            <WalletInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBox;
