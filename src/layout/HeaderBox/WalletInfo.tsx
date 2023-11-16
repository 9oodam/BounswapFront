import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/index";
import axios from "../../utils/axiosConfig";
import WalletConnectScreen from "./Sidebar/WalletConnectScreen";

const WalletInfo: React.FC = () => {
  const navigate = useNavigate();
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("wallet");

  const toggleSidebar = async () => {
    // const data = await axios.get(
    //   "https://bouns.io/login/?client_id=6e9c40d1-1236-42c4-8a13-586e7df92327&redirect_uri=https://localhost:3000&auto_login=true"
    // );
    // console.log(data, "data");

    setSidebarOpen(!isSidebarOpen);
  };

  // const handleLogout = () => {
  //   disconnect();
  //   navigate("/"); // 메인으로 넘어가게
  // };

  const toggleConnectOptions = () => {
    setShowConnectOptions(!showConnectOptions);
  };

  // return (
  //   <>
  //     <div className="relative w-[170px] h-[46px] ">
  //       <div>
  //         <div className="absolute w-[46px] h-[46px] rounded-full border-custom-accent border-4 overflow-hidden top-0 left-0">
  //           <img src="" alt="User Avatar" />
  //         </div>
  //         <div className="absolute w-[100px] h-[46px] flex items-center top-0 left-[68px] [font-family:'Bakbak_One-Regular',Helvetica] font-normal text-white text-[19px] tracking-[0] leading-[19px]">
  //           {address.slice(0, 10)}...
  //         </div>
  //         <button
  //           className="bg-red-500 text-white p-2 rounded absolute top-0 right-0"
  //           onClick={handleLogout}
  //         >
  //           Disconnect
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="relative w-[170px] h-[46px] ">
      <button
        onClick={toggleSidebar}
        className="bg-lightGreen text-baseWhite py-[10px] px-[12px] rounded-[10px] hover:bg-deepGreen font-bold"
      >
        Connect
      </button>
      <Sidebar width={500} isOpen={isSidebarOpen} toggleMenu={toggleSidebar}>
        {currentScreen === "wallet" ? (
          <WalletConnectScreen
            toggleMenu={toggleSidebar}
            isOpen={isSidebarOpen}
          />
        ) : (
          <h1>wallet connect 됐을때 넣어주자</h1>
        )}
      </Sidebar>
    </div>
  );
};
export default WalletInfo;
