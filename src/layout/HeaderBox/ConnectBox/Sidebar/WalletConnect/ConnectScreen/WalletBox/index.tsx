import React from "react";
import { WalletBoxProps } from "src/Interface/WalletBox.interface";
import useWeb3 from "src/hooks/web3.hook";

export const WalletBox: React.FC<WalletBoxProps> = ({
  walletName,
  walletImg,
}) => {
  const { user, web3, connectMetaMask } = useWeb3(null);

  const ConnectBtn = () => {
    if (walletName == "MetaMask") {
      connectMetaMask();
      localStorage.setItem("connectStatus", "true");
    } else {
      alert("아직 준비중");
    }
  };

  return (
    <div className="w-full bg-[#dff0d2dc]">
      <button
        onClick={ConnectBtn}
        className="w-full p-[18px] text-deepBlack hover:bg-[#d4e5c7dc] font-bold flex flex-row justify-between"
      >
        <div className="flex flex-row items-center">
          <img
            className="w-[40px] h-[40px]"
            src={walletImg}
            alt={`${walletName} Wallet`}
          />
          <div className="pr-[8px] pl-[8px]">{walletName}</div>
        </div>
      </button>
    </div>
  );
};
