import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../ConnectBox/Sidebar";
import WalletConnectScreen from "../ConnectBox/Sidebar/WalletConnect/ConnectScreen";
import WalletInfo from "../ConnectBox/Sidebar/WalletInfo/index";
import InfoScreen from "../ConnectBox/Sidebar/WalletInfo/InfoScreen";
import WalletConnect from "../ConnectBox/Sidebar/WalletConnect";
import { WalletAddressButton, ConnectButton } from "./ConnectBox.Style";
import useWeb3 from "src/hooks/web3.hook";

const ConnectBox: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [walletAddress, setWalletAddress] = useState(""); // 지갑 주소 상태 변수
  const { user } = useWeb3(null);

  const toggleSidebar = async () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("connectStatus");
    setSidebarOpen(false);
    window.location.reload();
  };

  // 로그아웃 toggleSidebar 대신에 로그아웃 시켜줘야함!
  const logoutCloseButton = (
    <>
      <button onClick={handleLogout} className="w-[25px] h-[25px] mr-[10px]">
        <img
          src="images/logout-icon.png"
          alt="logout button"
          className="w-full h-full"
        />
      </button>
      <button onClick={toggleSidebar} className="w-[23px] h-[23px] ml-[10px]">
        <img
          src="images/x-letter-icon.png"
          alt="exit button"
          className="w-full h-full"
        />
      </button>
    </>
  );

  const closeButton = (
    <button onClick={toggleSidebar} className="w-[25px] h-[25px]">
      <img
        src="images/x-letter-icon.png"
        alt="exit button"
        className="w-full h-full"
      />
    </button>
  );

  return (
    <div className=" w-[12%] h-[46px] ">
      {user.account ? (
        <WalletAddressButton
          onClick={toggleSidebar}
          walletAddress={user.account}
        />
      ) : (
        <ConnectButton onClick={toggleSidebar}>Connect</ConnectButton>
      )}
      <Sidebar
        title={
          user.account ? (
            <WalletInfo walletAddress={user.account} />
          ) : (
            <WalletConnect />
          )
        }
        button={user.account ? logoutCloseButton : closeButton}
        isOpen={isSidebarOpen}
        toggleMenu={toggleSidebar}
      >
        {user.account ? <InfoScreen /> : <WalletConnectScreen />}
      </Sidebar>
    </div>
  );
};
export default ConnectBox;
