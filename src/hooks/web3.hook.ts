import React, { useEffect, useState } from "react";
import Web3 from "web3";
// import tokenAbi from "src/abi/token.abi.json";
import governanceAbi from "src/abi/governance.abi.json";
import stakingAbi from "src/abi/staking.abi.json";
import wbncAbi from "src/abi/wbnc.abi.json";
import lpTokenAbi from "src/abi/lpToken.abi.json";
import dataAbi from "src/abi/Data.abi.json";
import govAbi from "src/abi/governance.abi.json";
import pairAbi from "src/abi/Pair.abi.json";

import { Contract } from "web3-eth-contract";
import { error } from "console";

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
  const [connectStatus, SetconnectStatus] = useState(false);

  useEffect(() => {
    SetconnectStatus(Boolean(localStorage.getItem("connectStatus")));

    // console.log("accountsChanged", connectStatus);
    console.log("sdfsdf",connectStatus,  window.ethereum.selectedAddress);
  }, [connectStatus]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      Boolean(localStorage.getItem("connectStatus"));
      SetconnectStatus(true);
      // SetconnectStatus(Boolean(localStorage.getItem("connectStatus")));
      // SetconnectStatus(true);
      // // await window.ethereum.request({ method: "eth_requestAccounts" });
      // getAccounts(window.ethereum);
      window.location.reload();
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
      })
      .catch(() => {
        // console.log("dsfsdfs");
        // SetconnectStatus(false);
      });
    };
    
  useEffect(() => {
    if (!connectStatus) {
      return;
    }
    
    // if (!window.ethereum.selectedAddress) {
      //   alert("메타마스크 로그인");
      //   return;
      // }
      
      console.log("?????dddddd?");

    if (window.ethereum) {
      const web3Provider = new Web3(window.ethereum);
      setWeb3(web3Provider);
      getAccounts(web3Provider);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      alert("MetaMask를 설치 해주세요!");
    }
  }, [connectStatus]);

  // ! 0x4798 === 바운스네트워크
  useEffect(() => {
    window.ethereum.on("chainChanged", async (chainID: string) => {
      console.log("네트워크 변경");
      if (chainID === "0xaa36a7" && web3 !== null && connectStatus) {
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
      if (dataContract && pairContract && governanceContract && stakingContract)
        return;
      const dataCon = new web3.eth.Contract(
        dataAbi as any,
        "0x3FA5071b97C8D8809272aa35628654f0bf22C0E2",
        { data: "" }
      );
      const pairCon = new web3.eth.Contract(
        pairAbi as any,
        "0xB7cDf8CF83e2C9dFb240700814802460eEd5BAE4",
        { data: "" }
      );
      const govCon = new web3.eth.Contract(
        govAbi as any,
        "0xCF36B339BC1023D574F04582f891429273AF1461",
        // "0x050Ade3854C7493dD67271f85Fc40459674F737C",
        { data: "" }
      );
      const stakingCon = new web3.eth.Contract(
        stakingAbi as any,
        "0xD73865E343138f35C57EAc514257cDdD2FAa97aB",
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
