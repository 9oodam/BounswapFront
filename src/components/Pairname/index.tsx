import { type } from "os";
import React, { useEffect, useState } from "react";
import { Divstyle } from "./Pairname.style";
import { PairItem } from "src/Interface/Token.interface";
import { useNavigate, useLocation } from "react-router-dom";

const Pairname: React.FC<{ data: PairItem }> = ({ data }) => {
  const nav = useNavigate();
  const location = useLocation();
  const [address, setAddress] = useState(data.pairAddress);
  const [copied, setCopied] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [isMy, setIsMy] = useState(false);

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

  useEffect(() => {
    if(location.pathname.includes('my')) {
      setIsMy(true);
    }
  }, [])

  return (
    <>
    <div className="mobile:ml-7 mobile:mr-7">
      <div className="flex justify-between">
        <img
          src="/images/backArrow.png"
          className={Divstyle.arrowsize}
          onClick={() => nav(-1)}
        ></img>
        {!isMy &&        
          <div
          onClick={() => {nav(`/pool/my/${data.pairAddress}`)}}
          className="bg-lightGreen p-3 text-baseWhite font-bold pc:text-[20px] rounded-xl hover:bg-deepGreen cursor-pointer
          h-[40px] w-[120px] mobile:h-[30px] mobile:w-[100px] flex justify-center items-center text-[14px] shadow-md">My Pool</div>
        }
      </div>
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
            <img src="/images/copy icon.png" className="pc:w-[20px] pc:h-[20px] mobile:w-[14px] mobile:h-[14px]" />
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Pairname;
