import React from "react";
import { WalletConnectScreenProps } from "src/Interface/\bWalletConnect.interface";

const WalletConnectScreen: React.FC<WalletConnectScreenProps> = ({
  toggleMenu,
  isOpen,
}) => {
  return (
    <div className="w-full h-full flex flex-col pt-[14px] pr-[16px] pb-[16px] pl-[16px]">
      <div className=" w-full flex flex-wrap justify-between border-2 border-[#202020] text-center mb-[16px]">
        <div>Connect Wallet</div>

        <button
          onClick={() => toggleMenu()}
          className="top-2.5 right-[20px] w-[32px] h-[32px]  transition-all duration-700 rounded-full "
        >
          {isOpen ? (
            <span>X</span>
          ) : (
            <span>X</span>
            // <img
            //   src="images/sun_toggle.png"
            //   alt="contact open button"
            //   className="w-full h-full"
            // />
          )}
        </button>
      </div>
      <div className="grid auto-rows-auto border-2 border-[#56db4c]">
        {/* wallet 연결 관련 UI 추가하기 */}
        <div>
          <div className="w-full border-2">
            <button className="w-full text-orange-500 hover:bg-deepGreen font-bold">
              ㅎㅇ
            </button>
          </div>
          <div>2</div>
          <div>3</div>
        </div>
        <div>gddddklfsjljflskj</div>
      </div>
    </div>
  );
};

export default WalletConnectScreen;
