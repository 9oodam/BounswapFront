import React from "react";
import { WalletConnectScreenProps } from "src/Interface/\bWalletConnect.interface";
import { WalletBox } from "./WalletBox";

const WalletConnectScreen: React.FC<WalletConnectScreenProps> = ({
  toggleMenu,
  isOpen,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className=" w-full flex flex-wrap justify-between text-center mb-[16px] font-bold">
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
      <div className="grid auto-rows-auto gap-y-4">
        {/* wallet 연결 관련 UI 추가하기 */}
        <div className="grid gap-[2px] rounded-[12px] overflow-hidden">
          <WalletBox></WalletBox>
          <WalletBox></WalletBox>
        </div>
        <div>
          By connecting a wallet, you agree to BounSwap Labs' Terms of Service
          and consent to its Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default WalletConnectScreen;
