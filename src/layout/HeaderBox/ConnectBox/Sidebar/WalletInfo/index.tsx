import React from "react";
import { WalletConnectScreenProps } from "src/Interface/\bWalletConnect.interface";

const WalletInfo: React.FC<WalletConnectScreenProps> = ({ walletAddress }) => {
  const handleDisconnect = () => {
    console.log("gd");
    //   disconnect();
    //   navigate("/"); // 메인으로 넘어가게
  };

  return (
    <>
      <div className="flex w-full">
        <div className=" w-[46px] h-[46px] rounded-full border-custom-accent border-4 overflow-hidden top-0 left-0">
          <img src="/path/to/avatar.jpg" alt="User Avatar" />
        </div>
        <div className=" w-[100px] h-[46px] flex items-center top-0 left-[68px]">
          {walletAddress.slice(0, 10)}...
        </div>
      </div>
    </>
  );
};

export default WalletInfo;