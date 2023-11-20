import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../ConnectBox/Sidebar";
import WalletConnectScreen from "../ConnectBox/Sidebar/WalletConnect/ConnectScreen";
import WalletInfo from "../ConnectBox/Sidebar/WalletInfo/index";
import InfoScreen from "../ConnectBox/Sidebar/WalletInfo/InfoScreen";
import WalletConnect from "../ConnectBox/Sidebar/WalletConnect";
import { WalletAddressButton, ConnectButton } from "./ConnectBox.Style";

const ConnectBox: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(""); // 지갑 주소 상태 변수

  const toggleSidebar = async () => {
    // const data = await axios.get(
    //   "https://bouns.io/login/?client_id=6e9c40d1-1236-42c4-8a13-586e7df92327&redirect_uri=https://localhost:3000&auto_login=true"
    // );
    // console.log(data, "data");

    const randomWalletAddress = "0x123...abc"; // 예시 주소
    setWalletAddress(randomWalletAddress);

    setSidebarOpen(!isSidebarOpen);
  };

  // 로그아웃 toggleSidebar 대신에 로그아웃 시켜줘야함!
  const logoutButton = (
    <button onClick={toggleSidebar} className="w-[32px] h-[32px]">
      <img
        src="images/moon_toggle.png"
        alt="logout button"
        className="w-full h-full"
      />
    </button>
  );

  const closeButton = (
    <button onClick={toggleSidebar} className="w-[32px] h-[32px]">
      <img
        src="images/sun_toggle.png"
        alt="exit button"
        className="w-full h-full"
      />
    </button>
  );

  return (
    <div className=" w-[10%] h-[46px] ">
      {walletAddress ? (
        <WalletAddressButton
          onClick={toggleSidebar}
          walletAddress={walletAddress}
        />
      ) : (
        <ConnectButton onClick={toggleSidebar}>Connect</ConnectButton>
      )}
      <Sidebar
        title={
          walletAddress ? (
            <WalletInfo walletAddress={walletAddress} />
          ) : (
            <WalletConnect />
          )
        }
        button={walletAddress ? logoutButton : closeButton}
        isOpen={isSidebarOpen}
        toggleMenu={toggleSidebar}
      >
        {walletAddress ? <InfoScreen /> : <WalletConnectScreen />}
      </Sidebar>
    </div>
  );
};
export default ConnectBox;
