import { useEffect, useState } from "react";
import ConnectBox from "./ConnectBox/index";
import SearchBox from "./SearchBar/index";
import Navigation from "./Navigation/index";

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
        className={`fixed top-0 left-0 right-0 z-10 pt-[20px] pb-[20px] pr-[12px] pl-[20px] ${isScrolled ? "bg-headerBack" : "bg-headerBackScrolled"
          }`}
      >
        <div className="w-full h-full flex justify-center items-center mobile:flex mobile:justify-start ">
          <Navigation />
          <SearchBox />
          <ConnectBox />
        </div>
      </div>
    </>
  );
};

export default HeaderBox;
