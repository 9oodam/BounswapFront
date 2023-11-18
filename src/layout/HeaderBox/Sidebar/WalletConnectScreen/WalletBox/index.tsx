import React from "react";

export const WalletBox = () => {
  return (
    <div className="w-full bg-[#dff0d2dc]">
      <button className="w-full p-[18px] text-deepBlack hover:bg-[#d4e5c7dc] font-bold flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <img
            className="w-[40px] h-[40px]"
            src="/images/BNC_Icon.png"
            alt="walletImg"
          />
          <div className="pr-[8px] pl-[8px]">bounswallet</div>
        </div>
      </button>
    </div>
  );
};
