import React from "react";
import { WalletBox } from "./WalletBox";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const WalletConnectScreen: React.FC = () => {
  return (
    <>
      <div className="grid auto-rows-auto gap-y-4">
        {/* wallet 연결 관련 UI 추가하기 */}
        <div className="grid gap-[2px] rounded-[12px] overflow-hidden">
          <WalletBox
            walletName="BounsWallet"
            walletImg={`${ImgBaseUrl()}BNC_Icon.png`}
          ></WalletBox>
          <WalletBox
            walletName="MetaMask"
            walletImg={`${ImgBaseUrl()}MetaMask.png`}
          ></WalletBox>
        </div>
        <div>
          By connecting a wallet, you agree to BounSwap Labs' Terms of Service
          and consent to its Privacy Policy.
        </div>
      </div>
    </>
  );
};

export default WalletConnectScreen;
