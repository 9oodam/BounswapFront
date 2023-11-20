import React from "react";
import { WalletBox } from "./WalletBox";

const WalletConnectScreen: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default WalletConnectScreen;
