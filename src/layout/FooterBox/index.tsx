import LogoArea from "../HeaderBox/LogoArea";
import ToggleBtn from "src/components/toggleBtn";
import GithubArea from "./GithubArea";
import { useState } from "react";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const Footer = (): JSX.Element => {
  const [pop, setPop] = useState(false);

  const handleClick = () => {
    setPop(!pop);
  };

  return (
    <footer className="relative flex flex-row justify-between w-full mx-auto h-[100px] bg-[#6b7d63cc] dark:bg-[#ffffffcc] p-4 mt-[150px] mobile:hidden">
      <LogoArea />
      <div className="flex items-center justify-between mobile:hidden">
        <GithubArea name="9oodam" address="https://github.com/9oodam" />
        <GithubArea name="ahyeona" address="https://github.com/ahyeona" />
        <GithubArea name="wijiwon" address="https://github.com/wijiwon" />
        <GithubArea name="youdonghee" address="https://github.com/youdonghee" />
        <GithubArea name="Jisub_Hwang" address="https://github.com/jisub12" />
      </div>
      <div
        onClick={handleClick}
        className="pc:hidden w-full flex justify-end items-center mr-5"
      >
        <img
          src={`${ImgBaseUrl}github-mark.png`}
          alt="github icon"
          className="w-[30px] h-[30px] opacity-80"
        />
      </div>
      <ToggleBtn />
      <div
        className={`absolute w-[150px] h-[170px] bg-cardWhite top-[-170px] right-[0px] rounded-bodyBackRadius pc:hidden ${pop ? "slide-in" : "mobile:hidden slide-out"
          }`}
      >
        <div className="flex flex-col pc:items-center pc:justify-between mt-3">
          <GithubArea name="9oodam" address="https://github.com/9oodam" />
          <GithubArea name="ahyeona" address="https://github.com/ahyeona" />
          <GithubArea name="wijiwon" address="https://github.com/wijiwon" />
          <GithubArea
            name="youdonghee"
            address="https://github.com/youdonghee"
          />
          <GithubArea name="Jisub_Hwang" address="https://github.com/jisub12" />
        </div>
        <div className="pc:hidden w-full flex justify-end items-center mr-5"></div>
      </div>
    </footer>
  );
};

export default Footer;
