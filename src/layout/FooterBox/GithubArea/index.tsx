import React from "react";
import { github } from "src/Interface/Button.interface";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const GithubArea: React.FC<github> = ({ name, address }) => {
  return (
    <div
      onClick={() => {
        window.open(address, "_blank");
      }}
      className="flex mx-4 cursor-pointer mobile:my-1"
    >
      <img
        src={`${ImgBaseUrl()}github-mark.png`}
        alt="github"
        className="w-[30px] h-[30px] opacity-80 mobile:w-[20px] mobile:h-[20px] "
      />
      <div className="text-baseWhite dark:text-lightBlack ml-2 mobile:text-[14px]">
        {name}
      </div>
    </div>
  );
};

export default GithubArea;
