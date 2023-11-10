import React from "react";

const WalletInfo: React.FC = (): JSX.Element => (
  <div className="relative w-[170px] h-[46px] ">
    <div className="absolute w-[46px] h-[46px] rounded-full border-lightGreen border-4 overflow-hidden top-0 left-0">
      <img
        className="w-full h-full object-cover"
        src="/path/to/user-profile.jpg" // 프로필 이미지 경로
        alt="User profile"
      />
    </div>
    <div className="absolute w-[100px] h-[46px] flex items-center top-0 left-[68px] [font-family:'Bakbak_One-Regular',Helvetica] font-normal text-white text-[19px] tracking-[0] leading-[19px]">
      0x425r22...
    </div>
  </div>
);

export default WalletInfo;
