import React, { useEffect, useState } from "react";
import Web3 from "web3";
import dataAbi from "src/abi/Data.abi.json";
import govAbi from "src/abi/Governance.abi.json";
import pairAbi from "src/abi/Pair.abi.json";
import stakingAbi from "src/abi/Staking.abi.json";

import { Contract } from "web3-eth-contract";

interface UseWeb3Result {
  user: any; // user의 실제 타입으로 교체해야 합니다.
  web3: Web3 | null;
  dataContract: Contract<any> | null;
  pairContract: Contract<any> | null;
  governanceContract: Contract<any> | null;
  stakingContract: Contract<any> | null;
}

const useWeb3 = (provider: string | null) => {
  const [user, setUser] = useState({ account: "", balance: "" });
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [network, setNetwork] = useState(null);

  const [dataContract, setDataContract] = useState<Contract<any> | null>(null);
  const [pairContract, setPairContract] = useState<Contract<any> | null>(null);
  const [governanceContract, setGovernanceContract] = useState<Contract<any> | null>(null);
  const [stakingContract, setStakingContract] = useState<Contract<any> | null>(null);
  
  const [connectStatus, SetconnectStatus] = useState(false);

  useEffect(() => {
    // console.log("?🙄?", connectStatus);
  }, [connectStatus]);

  useEffect(() => {
    SetconnectStatus(Boolean(localStorage.getItem("connectStatus")));
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      Boolean(localStorage.getItem("connectStatus"));
      SetconnectStatus(Boolean(localStorage.getItem("connectStatus")));
      // // await window.ethereum.request({ method: "eth_requestAccounts" });
      // getAccounts(window.ethereum);
    } else {
      alert("MetaMask 를 설치해주세요");
    }
  };

  const getAccounts = (web3Provider: Web3) => {
    let webProvider: Web3;
    if (!web3) {
      webProvider = web3Provider;
    } else {
      webProvider = web3;
    }
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async ([data]: string[]) => {
        setUser({
          account: data,
          balance: webProvider.utils.fromWei(
            await webProvider.eth.getBalance(data),
            "ether"
          ),
        });
      });
  };

  useEffect(() => {
    if (!connectStatus) {
      return;
    }
    if (window.ethereum) {
      const web3Provider = new Web3(window.ethereum);
      setWeb3(web3Provider);
      getAccounts(web3Provider);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      alert("메타마스크 설치");
    }
  }, [connectStatus]);

  // ! 0x4798 === 바운스네트워크
  useEffect(() => {
    window.ethereum.on("chainChanged", async (chainID: string) => {
      console.log("네트워크 변경");
      if (chainID === "0xaa36a7" && web3 !== null) {
        getAccounts(web3);
      } else {
        const net = await window.ethereum.request({
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
        setNetwork(net || true);
      }
    });
  }, [network]);

  useEffect(() => {
    // console.log("User : ", user);
  }, [user]);

  if (web3 !== null) {
    window.ethereum.on("accountsChanged", async (accounts: string[]) => {
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
      if (dataContract && pairContract && governanceContract && stakingContract) return;
      const dataCon = new web3.eth.Contract(
        dataAbi as any,
        "0x8728bEf28c07A5483C848F879C414662fF5f7f34",
        { data: "" }
      );
      const pairCon = new web3.eth.Contract(
        pairAbi as any,
        "0x59c80D908D35dFdc351C37CE8Da8eba5Cd3336DA",
        { data: "" }
      );
      const govCon = new web3.eth.Contract(
        govAbi as any,
        "0xeb392e612CFeB2eFef9810Eb0b786B02D9B4C635",
        { data: "" }
      );
      const stakingCon = new web3.eth.Contract(
        stakingAbi as any,
        "0x39A9B4456651db823Ff19fB341E591ae153AdB17",
        { data: "" }
      );
      setDataContract(dataCon);
      setPairContract(pairCon);
      setGovernanceContract(govCon);
      setStakingContract(stakingCon);
    }
  }, [web3]);

  return { user, web3, dataContract, pairContract, governanceContract, stakingContract, connectMetaMask };
};

export default useWeb3;
