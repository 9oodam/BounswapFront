import { type } from "os";
import React, { useState } from "react";
import { Divstyle } from "./Pairname.style";
import { PairItem } from "src/Interface/Token.interface";

const Pairname:React.FC<{data: PairItem}> = ({data}) => {
  const [address, setAddress] = useState(
    data.pairAddress
  );
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
      <img src="/images/backArrow.png" className={Divstyle.arrowsize}></img>
      <div className={Divstyle.Titlesize}>
        <div className={Divstyle.LogoPair}>
          <img
            src={data.token0Uri}
            className={Divstyle.LogoLeft}
          ></img>
          <img
            src={data.token1Uri}
            className={Divstyle.LogoRight}
          ></img>
        </div>
        <div className={Divstyle.title}>{data.token0Symbol} - {data.token1Symbol}</div>
        <div
          className={`border-2 w-[170px] border-deepBlack rounded-full cursor-pointer flex items-center justify-evenly ${
            copied ? `bg-deepBlack` : ``
          }`}
          onClick={handleCopy}
        >
          <div className={copied ? ` text-baseWhite` : `text-deepBlack`}>
            {copied ? "Copied" : pairA(address)}
          </div>
          {!copied && (
            <img src="/images/copy icon.png" className="w-[20px] h-[20px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default Pairname;
