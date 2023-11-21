import React from "react";
import { useNavigate } from "react-router-dom";
import { github } from "src/Interface/Button.interface";

const GithubArea: React.FC<github> = ({ name, address }) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        console.log("클릭은?", address);
        window.open(address, "_blank");
      }}
      className="flex mx-4 cursor-pointer"
    >
      <img
        src="/images/github-mark.png"
        alt="github"
        className="w-[30px] h-[30px] opacity-80"
      />
      <div className="text-deepBlack ml-2">{name}</div>
    </div>
  );
};

export default GithubArea;
