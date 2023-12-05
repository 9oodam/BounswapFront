import { useEffect, useState } from "react";
import Web3 from "web3";
import stakingAbi from "src/abi/stake.abi.json";
import wbncAbi from "src/abi/wbnc.abi.json";
import lpTokenAbi from "src/abi/lpToken.abi.json";
import dataAbi from "src/abi/Data.abi.json";
import govAbi from "src/abi/governance.abi.json";
import pairAbi from "src/abi/Pair.abi.json";

import { Contract } from "web3-eth-contract";
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


  const getIsMobile = (walletName: string) => {
    let isMobile = false;
    const agent = navigator.userAgent;
    if (agent.indexOf("iPhone") > -1 || agent.indexOf("Android") > -1 || agent.indexOf("iPad") > -1 || agent.indexOf("iPod") > -1) {

      if (walletName == "MetaMask") {
        window.location.href = "https://metamask.app.link/dapp/www.bounswap.site"
      }
      isMobile = true;
    }
    return isMobile;
  }

  useEffect(() => {
    if (connectStatus == "BounsWallet" || connectStatus == "null") return;

    const getChainId = async () => {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId != '0x4798') {
        const net = await window?.ethereum?.request({
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4798" }], // bounce
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
    if (connectStatus == "BounsWallet") {
      getBalance(BounsAddress);
      return;
    }
  }, [connectStatus]);

  const connectMetaMask = async (walletName: string) => {
    SetconnectStatus(walletName);
    if (window?.ethereum) {
      window.location.reload();
    } else if (getIsMobile(walletName)) {
      window.location.reload();
      return;
    } else {
      alert("MetaMask 를 설치해주세요");
    }
  };

  const getBalance = async (address: string) => {
    const web3 = new Web3("https://network.bouncecode.net/");

    if (address) {
      try {
        const balance = await web3.eth.getBalance(address);
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
        // console.log("");
      });
  };

  useEffect(() => {
    if (connectStatus == "null" || connectStatus == "") {
      return;
    }

    //// ! state 가 bounswallet 일때 return
    if (connectStatus == "BounsWallet") {
      setWeb3(new Web3("https://network.bouncecode.net/"));
      return;
    }

    if (window?.ethereum) {
      const web3Provider = new Web3(window?.ethereum);
      setWeb3(web3Provider);
      getAccounts(web3Provider);
      window?.ethereum?.on("chainChanged", () => {
        window.location.reload();
      });
    } else if (getIsMobile(connectStatus)) {
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
      if (chainID === "0x4798" && web3 !== null && connectStatus) {
        // ! status가 Metamask 일때 실행
        if (connectStatus == "MetaMask") getAccounts(web3);
      } else {
        const net = await window?.ethereum?.request({
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4798" }], // bounce
        });
        setNetwork(net || true);
      }
    });
  }, [network]);

  useEffect(() => {
    if (connectStatus == "BounsWallet") {
      return;
    }
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
    if (web3 !== null) {
      if (dataContract && pairContract && governanceContract && stakingContract)
        return;
      const dataCon = new web3.eth.Contract(
        dataAbi as any,
        "0x58452BD9499A90Af399f0f7661545DA2D2403e9e", // bounce
        { data: "" }
      );
      const pairCon = new web3.eth.Contract(
        pairAbi as any,
        "0xDdc8De4e598e0D6C088E55217E842c03Ec424e2F", // bounce
        { data: "" }
      );
      const govCon = new web3.eth.Contract(
        govAbi as any,
        "0x297E72F68CBf0410A1C58bA70D58A1448e7BAe07", // bounce
        { data: "" }
      );
      const stakingCon = new web3.eth.Contract(
        stakingAbi as any,
        "0x8d11bA6576E25149009E9136Dd85899136fDc904", // bounce
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