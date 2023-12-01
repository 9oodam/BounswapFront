import React from "react";
import { WalletConnectScreenProps } from "src/Interface/WalletConnect.interface";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const WalletInfo: React.FC<WalletConnectScreenProps> = ({ walletAddress }) => {
  const handleDisconnect = () => {
    console.log("gd");
    //   disconnect();
    //   navigate("/"); // 메인으로 넘어가게
  };

  return (
    <>
      <div className="flex w-full">
        <div className=" w-[40px] h-[40px] rounded-full border-custom-accent border-2 overflow-hidden mt-[3px] mr-[8px]">
          <img
            src={`${ImgBaseUrl()}user.jpeg`}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <div className=" w-[100px] h-[46px] flex items-center top-0 left-[68px]">
          {walletAddress.slice(0, 10)}...
        </div>
      </div>
    </>
  );
};

export default WalletInfo;
