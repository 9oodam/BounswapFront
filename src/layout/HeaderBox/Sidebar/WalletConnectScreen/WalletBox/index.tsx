import React from "react";

export const WalletBox = () => {
  return (
    <div className="w-full border-2">
      <button className="w-full p-[18px] text-orange-500 hover:bg-deepGreen font-bold">
        <div className="flex flex-row">
          <img
            className="w-[40px] h-[40px]"
            src="/images/BNC_Icon.png"
            alt="walletImg"
          />
          <div>bounswallet</div>
        </div>
      </button>
    </div>
  );
};
