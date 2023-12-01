import React, { useEffect, useState } from "react";
import Web3 from "web3";
// import tokenAbi from "src/abi/token.abi.json";
import governanceAbi from "src/abi/governance.abi.json";
import stakingAbi from "src/abi/stake.abi.json";
import wbncAbi from "src/abi/wbnc.abi.json";
import lpTokenAbi from "src/abi/lpToken.abi.json";
import dataAbi from "src/abi/Data.abi.json";
import govAbi from "src/abi/governance.abi.json";
import pairAbi from "src/abi/Pair.abi.json";

import { Contract } from "web3-eth-contract";
import { error, log } from "console";
import BounsGetWallet from "./BounsGetWallet";

interface UseWeb3Result {
  user: any; // user의 실제 타입으로 교체해야 합니다.
  web3: Web3 | null;
  dataContract: Contract<any> | null;
  pairContract: Contract<any> | null;
  governanceContract: Contract<any> | null;
  stakingContract: Contract<any> | null;
  wbncContract: Contract<any> | null;
  LPTokenContract: Contract<any> | null;
}

const useWeb3 = (provider: string | null) => {
  const [user, setUser] = useState({ account: "", balance: "" });
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [network, setNetwork] = useState(null);
  const [stakingContract, setStakingContract] = useState<Contract<any> | null>(
    null
  );
  const [wbncContract, setWbncContract] = useState<Contract<any> | null>(null);
  const [dataContract, setDataContract] = useState<Contract<any> | null>(null);
  const [LPTokenContract, setLPTokenContract] = useState<Contract<any> | null>(
    null
  );

  const [pairContract, setPairContract] = useState<Contract<any> | null>(null);
  const [governanceContract, setGovernanceContract] =
    useState<Contract<any> | null>(null);
  const [connectStatus, SetconnectStatus] = useState(
    String(localStorage.getItem("connectStatus"))
  );
  const [BounsAddress, SetBounsAddress] = useState("");

  const getBousnsWallet = async () => {
    console.log("BounsAddress?", BounsAddress);

    const Bounswallet = await BounsGetWallet();
    SetBounsAddress(String(Bounswallet));
  };

  // if (!BounsAddress) {
  //   getBousnsWallet();
  // }

  const getIsMobile = () => {
    let isMobile = false;
    const agent = navigator.userAgent;
    if(agent.indexOf("iPhone") > -1 || agent.indexOf("Android") > -1 || agent.indexOf("iPad") > -1 || agent.indexOf("iPod") > -1) {
      console.log("모바일환경");
      // alert("모바일 환경");
        window.location.href = "https://metamask.app.link/dapp/www.bounswap.site"
      isMobile = true;
    }
    return isMobile;
  }

  useEffect(()=>{
    // const agent = navigator.userAgent;
    // if(agent.indexOf("iPhone") > -1 || agent.indexOf("Android") > -1 || agent.indexOf("iPad") > -1 || agent.indexOf("iPod") > -1) {
    //   console.log("모바일환경");
    //   // alert("모바일 환경");
    // }
    
    if (!window?.ethereum) {
      window.location.href = "https://metamask.app.link/dapp/www.bounswap.site"
      return;
    }

    const getChainId =async () => {
      const chainId = await window.ethereum.request({method : 'eth_chainId'});  
      if (chainId != '0x4798') {
        const net = await window?.ethereum?.request({
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // sepolia
          // params: [{ chainId: "0x4798" }], // bounce
        });
        setNetwork(net || true);
      }
    };

    getChainId();
  }, []);

  useEffect(() => {
    if (connectStatus == "BounsWallet") {
      if (!BounsAddress) {
        getBousnsWallet();
      } else {
        getBalance(BounsAddress);
      }
    }
  }, [BounsAddress]);

  useEffect(() => {
    // SetconnectStatus(String(localStorage.getItem("connectStatus")));

    if (connectStatus == "BounsWallet") {
      getBalance(BounsAddress);
      return;
    }

    console.log("accountsChanged", connectStatus);
  }, [connectStatus]);

  const connectMetaMask = async () => {
    if (window?.ethereum) {
      SetconnectStatus(String(localStorage.getItem("connectStatus")));
      // SetconnectStatus(true);
      // // await window?.ethereum?.request({ method: "eth_requestAccounts" });
      // getAccounts(window?.ethereum);
      window.location.reload();
    } else if (getIsMobile()) {
      return;
    } else {
      alert("MetaMask 를 설치해주세요");
    }
  };

  const getBalance = async (address: string) => {
    const web3 = new Web3("https://network.bouncecode.net/");
    console.log("BounsAddress ::", BounsAddress);

    if (address) {
      try {
        // if (!BounsAddress) getBousnsWallet();

        const balance = await web3.eth.getBalance(address);
        console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
        setUser({
          account: address,
          balance: web3.utils.fromWei(balance, "ether"),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getAccounts = (web3Provider: Web3) => {
    let webProvider: Web3;
    if (!web3) {
      webProvider = web3Provider;
    } else {
      webProvider = web3;
    }
    window?.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async ([data]: string[]) => {
        setUser({
          account: data,
          balance: webProvider.utils.fromWei(
            await webProvider.eth.getBalance(data),
            "ether"
          ),
        });
      })
      .catch(() => {
        // console.log("dsfsdfs");
        // SetconnectStatus(false);
      });
  };

  useEffect(() => {
    if (connectStatus == "null" || connectStatus == "") {
      return;
    }

    // ! useEffect 실행될때마다 getbalance 실행 (wallet 주소 state 에 저장)
    // if (!window?.ethereum?.selectedAddress) {
    //   alert("메타마스크 로그인");
    //   return;
    // }

    //// ! state 가 bounswallet 일때 return
    if (connectStatus == "BounsWallet") {
      // getBalance(BounsAddress);
      return;
    }

    if (window?.ethereum) {
      const web3Provider = new Web3(window?.ethereum);
      setWeb3(web3Provider);
      getAccounts(web3Provider);
      window?.ethereum?.on("chainChanged", () => {
        window.location.reload();
      });
    } else if (getIsMobile()) {
      return;
    } else {
      alert("MetaMask를 설치 해주세요!");
    }
  }, [connectStatus]);

  // ! 0x4798 === 바운스네트워크
  useEffect(() => {
    if (connectStatus == "BounsWallet") {
      getBalance(BounsAddress);
      return;
    }
    window?.ethereum?.on("chainChanged", async (chainID: string) => {
      console.log("chainIDdsfdsdfsfds", chainID);
      if (chainID === "0xaa36a7" && web3 !== null && connectStatus) {
        // if (chainID === "0x4798" && web3 !== null && connectStatus) {
        // ! status가 Metamask 일때 실행
        if (connectStatus == "MetaMask") getAccounts(web3);
      } else {
        const net = await window?.ethereum?.request({
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // sepolia
          // params: [{ chainId: "0x4798" }], // bounce
        });
        setNetwork(net || true);
      }
    });
  }, [network]);

  useEffect(() => {
    // if (user.account != "") {
    //   window.location.reload();
    // }

    if (connectStatus == "BounsWallet") {
      // getBalance(BounsAddress);
      return;
    }
    console.log("User : ", user);
  }, [user]);

  if (web3 !== null) {
    window?.ethereum?.on("accountsChanged", async (accounts: string[]) => {
      const updatedAccount = accounts[0];

      setUser({
        account: updatedAccount,
        balance: web3.utils.fromWei(
          await web3.eth.getBalance(updatedAccount),
          "ether"
        ),
      });
    });
  }

  useEffect(() => {
    if (connectStatus == "BounsWallet") {
      // getBalance(BounsAddress);
      return;
    }
    if (web3 !== null) {
      if (dataContract && pairContract && governanceContract && stakingContract)
        return;
      const dataCon = new web3.eth.Contract(
        dataAbi as any,
        "0x3FA5071b97C8D8809272aa35628654f0bf22C0E2", // sepolia
        // "0x0103f9Dec7dc8378d11f9ac29E6796d76725a0C2", // bounce
        { data: "" }
      );
      const pairCon = new web3.eth.Contract(
        pairAbi as any,
        "0xB7cDf8CF83e2C9dFb240700814802460eEd5BAE4", // sepolia
        // "0xd9742c39d3EA58f674AC5b7A135f5b31923D8aD9", // bounce
        { data: "" }
      );
      const govCon = new web3.eth.Contract(
        govAbi as any,
        "0xCF36B339BC1023D574F04582f891429273AF1461", // sepolia
        // "0xAb74d94c354779cEd1A50a4E0c428Ab1eb7CcA5B", // bounce
        { data: "" }
      );
      const stakingCon = new web3.eth.Contract(
        stakingAbi as any,
        "0x1209603cB84FA9b7d7975fF4e8b65224a0C0e739", // sepolia
        // "0x180966C6adf826ad0D5D0D831fCe84dd7E876f94", // bounce
        // "0xA381BEc860Aa6575fb33Ac2404Cd20A13aA05610",
        { data: "" }
      );
      const wbnc = new web3.eth.Contract(
        wbncAbi as any,
        "0x19C466b19A30A85f4E3C3b291D820823E858D6c6",
        { data: "" }
      );
      const lpToken = new web3.eth.Contract(
        lpTokenAbi as any,
        "0x0ab4C056c769B85D7ce03dFE570Fe09e33794fF3",
        { data: "" }
      );
      console.log("contract 연결 완료");
      setDataContract(dataCon);
      setGovernanceContract(govCon);
      setPairContract(pairCon);
      setStakingContract(stakingCon);
      setWbncContract(wbnc);
      setLPTokenContract(lpToken);
    }
  }, [web3]);

  return {
    user,
    web3,
    dataContract,
    pairContract,
    governanceContract,
    stakingContract,
    connectMetaMask,
    wbncContract,
    LPTokenContract,
  };
};

export default useWeb3;

// 커넥트가 되어있다고 하는데 메타마스크 로그인이 안되어있어서 뜨는 에러로 보임
