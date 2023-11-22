// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import tokenAbi from "src/abi/token.abi.json";
// import governanceAbi from "src/abi/governance.abi.json";

// import { Contract } from "web3-eth-contract";

// interface UseWeb3Result {
//   user: any; // user의 실제 타입으로 교체해야 합니다.
//   web3: Web3 | null;
//   dataContract: Contract | null;
//   governanceContract: Contract | null;
// }

// const useWeb3 = (provider): UseWeb3Result => {
//   const [user, setUser] = useState({ account: "", balance: "" });
//   const [web3, setWeb3] = useState(null);
//   const [network, setNetwork] = useState(null);
//   const [stakingContract, setStakingContract] = useState(null);
//   const [governanceContract, setGovernanceContract] = useState(null);
//   const [dataContract, setDataContract] = useState(null);
//   const [pairContract, setPairContract] = useState(null);

//   const getAccounts = (web3Provider) => {
//     let webProvider;
//     if (!web3) {
//       webProvider = web3Provider;
//     } else {
//       webProvider = web3;
//     }
//     window.ethereum
//       .request({ method: "eth_requestAccounts" })
//       .then(async ([data]) => {
//         setUser({
//           account: data,
//           balance: webProvider.utils.fromWei(
//             await webProvider.eth.getBalance(data),
//             "ether"
//           ),
//         });
//       });
//   };
//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Provider = new Web3(provider);
//       setWeb3(web3Provider);
//       getAccounts(web3Provider);
//       window.ethereum.on("chainChanged", () => {
//         window.location.reload();
//       });
//     } else {
//       alert("메타마스크 설치");
//     }
//   }, []);

//   // ! 0x4798 === 바운스네트워크
//   useEffect(() => {
//     window.ethereum.on("chainChanged", async (chainID) => {
//       console.log("네트워크 변경");
//       if (chainID === "0xaa36a7") {
//         getAccounts();
//       } else {
//         const net = await window.ethereum.request({
//           jsonrpc: "2.0",
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: "0xaa36a7" }],
//         });
//         setNetwork(net || true);
//       }
//     });
//   }, [network]);

//   useEffect(() => {
//     if (web3 !== null) {
//       if (dataContract || governanceContract) return;
//       const token = new web3.eth.Contract(
//         tokenAbi,
//         "0x260c168573b8196523d98800FA5BFF1C1930712d",
//         { data: "" }
//       );
//       const governance = new web3.eth.Contract(
//         governanceAbi,
//         "0x050Ade3854C7493dD67271f85Fc40459674F737C",
//         { data: "" }
//       );
//       setDataContract(token);
//       setGovernanceContract(governance);
//     }
//   }, [web3]);
//   return { user, web3, governanceContract, dataContract };
// };

// export default useWeb3;
