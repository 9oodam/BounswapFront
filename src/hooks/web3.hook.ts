import React, { useEffect, useState } from "react";
import Web3 from "web3";
import tokenAbi from "src/abi/token.abi.json";
import governanceAbi from "src/abi/governance.abi.json";
import stakingAbi from "src/abi/staking.abi.json";
import wbncAbi from "src/abi/wbnc.abi.json";
import lpTokenAbi from "src/abi/lpToken.abi.json";

import { Contract } from "web3-eth-contract";

interface UseWeb3Result {
  user: any; // user의 실제 타입으로 교체해야 합니다.
  web3: Web3 | null;
  dataContract: Contract<any> | null;
  governanceContract: Contract<any> | null;
  stakingContract: Contract<any> | null;
  wbncContract: Contract<any> | null;
  LPTokenContract: Contract<any> | null;
  
}

const useWeb3 = (provider: string) => {
  const [user, setUser] = useState({ account: "", balance: "" });
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [network, setNetwork] = useState(null);
  const [stakingContract, setStakingContract] = useState<Contract<any> | null>(null);
  const [wbncContract, setWbncContract] = useState<Contract<any> | null>(null);
  const [dataContract, setDataContract] = useState<Contract<any> | null>(null);
  const [LPTokenContract, setLPTokenContract] = useState<Contract<any> | null>(null);
  const [governanceContract, setGovernanceContract] =
    useState<Contract<any> | null>(null);
  const [pairContract, setPairContract] = useState(null);

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
    if (window.ethereum) {
      const web3Provider = new Web3(provider);
      setWeb3(web3Provider);
      getAccounts(web3Provider);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      alert("메타마스크 설치");
    }
  }, []);

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
    if (web3 !== null) {
      if (dataContract || governanceContract || stakingContract) return;
      const token = new web3.eth.Contract(
        tokenAbi as any,
        "0x260c168573b8196523d98800FA5BFF1C1930712d",
        { data: "" }
      );
      const governance = new web3.eth.Contract(
        governanceAbi as any,
        "0x050Ade3854C7493dD67271f85Fc40459674F737C",
        { data: "" }
      );
      const staking = new web3.eth.Contract(
        stakingAbi as any,
        "0xbe5405e632457042cCf17d55d87CCf0428575F7b",
        { data: "" }
      );
      const wbnc = new web3.eth.Contract(
        wbncAbi as any,
        "0x19C466b19A30A85f4E3C3b291D820823E858D6c6",
        { data: ""}
      );
      const lpToken = new web3.eth.Contract(
        lpTokenAbi as any,
        "0x0ab4C056c769B85D7ce03dFE570Fe09e33794fF3",
        {data: ""}
      )
      setDataContract(token);
      setGovernanceContract(governance);
      setStakingContract(staking);
      setWbncContract(wbnc);
      setLPTokenContract(lpToken)
    }
  }, [web3]);
  return { user, web3, governanceContract, dataContract, stakingContract, wbncContract, LPTokenContract};
};

export default useWeb3;
