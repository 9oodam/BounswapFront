import React, { useEffect, useState } from "react";
import WalletInfo from "./WalletInfo";
import SearchBox from "./SearchBar/index";
import Navigation from "./Navigation/index";
import LogoArea from "./LogoArea/index";

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
        className={`fixed top-0 left-0 right-0 z-10 pt-[20px] pb-[20px] pr-[12px] pl-[20px] ${
          isScrolled ? "bg-headerBack" : "bg-headerBackScrolled"
        }`}
      >
        <div className="w-full h-full flex justify-center items-center mobile:flex mobile:justify-evenly ">
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
