import { type } from "os";
import React, { useState } from "react";
import { Divstyle } from "./Pairname.style";

const Pairname = () => {
  const [address, setAddress] = useState(
    "0xf744Fc00ac7C180167eddfB77D1E808384Aa0a3D"
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
            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
            className={Divstyle.LogoLeft}
          ></img>
          <img
            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
            className={Divstyle.LogoRight}
          ></img>
        </div>
        <div className={Divstyle.title}>ETH - USDT</div>
        <div
          className={`border-2 w-[170px] border-deepBlack rounded-full cursor-pointer flex items-center justify-evenly ${
            copied ? `bg-deepBlack` : ``
          }`}
          onClick={handleCopy}
        >
          <div className={copied ? ` text-baseWhite` : `text-deepBlack`}>
            {copied ? "복사 완료" : pairA(address)}
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
