import React from "react";

const WalletInfo = () => (
  <div className="absolute w-[170px] h-[46px] top-[23px] left-[1114px]">
    <img
      className="absolute w-[76px] h-[76px] top-[-11px] left-[-15px]"
      alt="User wallet"
      src="user-wallet.svg"
    />
    <div className="absolute w-[100px] h-[46px] top-0 left-[68px] [font-family:'Bakbak_One-Regular',Helvetica] font-normal text-white text-[19px] tracking-[0] leading-[19px]">
      0x425r22...
    </div>
  </div>
);

export default WalletInfo;
