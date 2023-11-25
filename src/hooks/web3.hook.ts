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

interface UseWeb3Result {
  user: any; // user의 실제 타입으로 교체해야 합니다.
  web3: Web3 | null;
  dataContract: Contract<any> | null;
  pairContract: Contract<any> | null;
  governanceContract: Contract<any> | null;
  stakingContract: Contract<any> | null;
  wbncContract: Contract<any> | null;
  LPTokenContract: Contract<any> | null;
};

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
      if (dataContract && pairContract && governanceContract && stakingContract)
        return;
      const dataCon = new web3.eth.Contract(
        dataAbi as any,
        "0xE8f4D0D81C39243466D42726F4e527F0AA5629C6",
        { data: "" }
      );
      const pairCon = new web3.eth.Contract(
        pairAbi as any,
        "0x848D3b8D0E2a54Ef4E2d21857700e658B8fbA41A",
        { data: "" }
      );
      const govCon = new web3.eth.Contract(
        govAbi as any,
        "0x9a927D94846c80B1E83B35B67081BD58fbe6AaD9",
        { data: "" }
      );
      const stakingCon = new web3.eth.Contract(
        stakingAbi as any,
        "0x85C1c5194f0952333F5FD51aF69bAeA4316A1D56",
        { data: "" }
      );
      const wbnc = new web3.eth.Contract(
        wbncAbi as any,
        "0x5c0cCfA858Bf49840c6f4A69Db1D2DA3128161EA",
        { data: "" }
      );
      const lpToken = new web3.eth.Contract(
        lpTokenAbi as any,
        "0x316Ce4d255b75D1320FF7eCE9d5eDb231eaF89C4",
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

// data contract :  0xE8f4D0D81C39243466D42726F4e527F0AA5629C6
// pair contract :  0x848D3b8D0E2a54Ef4E2d21857700e658B8fbA41A
// gov contract :  0x9a927D94846c80B1E83B35B67081BD58fbe6AaD9
// staking contract :  0x85C1c5194f0952333F5FD51aF69bAeA4316A1D56
// tokenAddressArr :  Result(5) [
//   '0x28125d2d7450F4837d030186c2076cC53af03dae',
//   '0x26989289FCce632539a2daE0968612459fee901E',
//   '0x0967FddEc5370F42218A8b0f898BcfF45F941084',
//   '0xFB55e2bd1F5763B3E018A39DAA74E010Dbf7E112',
//   '0xa7bA02d72f104D0bea144d5Bd2B3657b5020d00A'
// ]
// pairAddressArr :  Result(6) [
//   '0x0459A3045Fe91e9Cf42D1A74bf391d0EA22E080D',
//   '0x7A171bA42536dA9c0E43FB72ddDFea09Fdc33266',
//   '0xA621711708c4767edE6e199C824780453aC9bC4d',
//   '0x4f8EFf347299162308f57234AA1DA21d600F7E0c',
//   '0x08b6DaA1388bAbA1a6b30aE49f8751748eAA04C0',
//   '0x20054C17A64F8Cc88D2D65ECFB353f754cc25056'
// ]
