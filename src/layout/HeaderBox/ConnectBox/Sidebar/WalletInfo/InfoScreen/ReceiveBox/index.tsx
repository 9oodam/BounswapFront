import React, { useState } from "react";
import useWeb3 from "src/hooks/web3.hook";
import { QRCodeCanvas } from "qrcode.react";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const ReceiveBox = () => {
  const { user } = useWeb3(null);
  const [copied, setCopied] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const userAddress = (address: string) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  // 클립보드 주소 복사
  const copy = () => {
    if (!isClickable) return;
    navigator.clipboard.writeText(user.account);
    setCopied(true);
    setIsClickable(false);

    setTimeout(() => {
      setCopied(false);
      setIsClickable(true);
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-center mb-2">
        <QRCodeCanvas value={user.account} />
      </div>
      <div className="flex justify-center">
        <div
          className={`border-[3px] w-[170px] border-deepGreen rounded-full cursor-pointer flex items-center justify-evenly ${
            copied ? `bg-deepGreen` : ``
          }`}
          onClick={copy}
        >
          <div className={copied ? ` text-baseWhite` : `text-deepGreen`}>
            {copied ? "복사 완료" : userAddress(user.account)}
          </div>

          {!copied && (
            <img src={`${ImgBaseUrl()}copy icon.png`} className="w-[20px] h-[20px]" />
          )}
        </div>
      </div>
    </>
  );
};

export default ReceiveBox;
