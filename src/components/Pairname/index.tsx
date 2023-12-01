import { type } from "os";
import React, { useState } from "react";
import { Divstyle } from "./Pairname.style";
import { PairItem } from "src/Interface/Token.interface";
import { useNavigate } from "react-router-dom";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const Pairname: React.FC<{ data: PairItem }> = ({ data }) => {
  const nav = useNavigate();
  const [address, setAddress] = useState(data.pairAddress);
  const [copied, setCopied] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const pairA = (address: string) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  function handleCopy() {
    if (!isClickable) return;
    navigator.clipboard.writeText(address); // 클립보드에 주소 복사
    setCopied(true);
    setIsClickable(false); // 클릭 가능 상태를 false로 설정

    setTimeout(() => {
      setCopied(false);
      setIsClickable(true); // 1초 후에 클릭 가능 상태를 true로 설정
    }, 1000);
  }
  return (
    <>
      <img
        src={`${ImgBaseUrl()}backArrow.png`}
        className={Divstyle.arrowsize}
        onClick={() => nav(-1)}
      ></img>
      <div className={Divstyle.Titlesize}>
        <div className="flex flex-row items-center">
          <div className={Divstyle.LogoPair}>
            <img src={data.token0Uri} className={Divstyle.LogoLeft}></img>
            <img src={data.token1Uri} className={Divstyle.LogoRight}></img>
          </div>
          <div className={Divstyle.title}>
            {data.token0Symbol} - {data.token1Symbol}
          </div>
        </div>
        <div
          className={`border-2 pc:w-[170px] mobile:w-[120px] border-deepBlack rounded-full cursor-pointer flex items-center justify-evenly mobile:text-[13px] ${
            copied ? `bg-deepBlack` : ``
          }`}
          onClick={handleCopy}
        >
          <div className={copied ? ` text-baseWhite` : `text-deepBlack`}>
            {copied ? "Copied" : pairA(address)}
          </div>
          {!copied && (
            <img src={`${ImgBaseUrl()}copy icon.png`} className="pc:w-[20px] pc:h-[20px] mobile:w-[14px] mobile:h-[14px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default Pairname;
