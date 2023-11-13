import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import { useNavigate } from "react-router-dom";

const WalletInfo: React.FC = (): JSX.Element => {
  const { address, isConnected } = useAccount();

  const chainId = useChainId();
  console.log("chainId", chainId);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [showConnectOptions, setShowConnectOptions] = useState(false);

  const handleLogout = () => {
    disconnect();
    navigate("/"); // 메인으로 넘어가게
  };

  const toggleConnectOptions = () => {
    setShowConnectOptions(!showConnectOptions);
  };

  useEffect(() => {
    console.log("connectors", connectors);
    console.log("address", address);
  }, [connectors, address, toString]);

  const ConnectOptions = () => (
    <div
      className={`absolute right-0 top-0 w-64 h-full bg-white transition-transform ${
        showConnectOptions ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {connectors.map((connector) => (
        <button
          className={`p-2 m-2 ${!connector.ready && "opacity-50"} ${
            isLoading && connector.id === pendingConnector?.id && "bg-gray-500"
          }`}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {/* {connector.chains[0].name} */}
          {address}
          {!connector.ready && " (unsupported)"}
        </button>
      ))}

      {error && <div className="p-2 text-red-500">{error.message}</div>}
    </div>
  );

  if (!isConnected || !address) {
    return (
      <>
        <div className="relative w-full h-full">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={toggleConnectOptions}
          >
            Connect
          </button>
          {showConnectOptions && <ConnectOptions />}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative w-[170px] h-[46px] ">
        <div>
          <div className="absolute w-[46px] h-[46px] rounded-full border-custom-accent border-4 overflow-hidden top-0 left-0">
            <img src="" alt="User Avatar" />
          </div>
          <div className="absolute w-[100px] h-[46px] flex items-center top-0 left-[68px] [font-family:'Bakbak_One-Regular',Helvetica] font-normal text-white text-[19px] tracking-[0] leading-[19px]">
            {address.slice(0, 10)}...
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded absolute top-0 right-0"
            onClick={handleLogout}
          >
            Disconnect
          </button>
        </div>
      </div>
      {/* <div className="relative w-[170px] h-[46px] ">
        <div>
          <div className="absolute w-[46px] h-[46px] rounded-full border-custom-accent border-4 overflow-hidden top-0 left-0">
            <img
              className="w-full h-full object-cover"
              src="/path/to/user-profile.jpg" // 프로필 이미지 경로
              alt="User profile"
            />
          </div>
          <div className="absolute w-[100px] h-[46px] flex items-center top-0 left-[68px] [font-family:'Bakbak_One-Regular',Helvetica] font-normal text-white text-[19px] tracking-[0] leading-[19px]">
            0x425r22...
          </div>
        </div>
      </div> */}
    </>
  );
};
export default WalletInfo;
