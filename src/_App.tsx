import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

declare let window: any;

// const web3: Web3 = new Web3("https://network.bouncecode.net/");
const customRpcUrl: string = "https://network.bouncecode.net/";
const chainId = "18328";

let web3: Web3 | undefined;

const connectWallet = async (): Promise<void> => {
  if (window.ethereum) {
    try {
      const hexChainId = "0x" + parseInt(chainId, 10).toString(16);

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: hexChainId,
            rpcUrls: [customRpcUrl], // rpcUrls는 배열로 제공
            chainName: "Custom Network", // 선택적: 네트워크의 이름
          },
        ],
      });

      await window.ethereum.request({ method: "eth_requestAccounts" });

      web3 = new Web3(window.ethereum);
    } catch (error) {
      console.error("Error connecting to the wallet:", error);
    }
  } else {
    console.error("Ethereum wallet is not detected.");
  }
};

const App: React.FC = () => {
  const [loggedData, setLoggedData] = useState();
  const [didToken, setDidToken] = useState();
  const [account, setAccount] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const getAccountInfo = async (): Promise<void> => {
    if (!web3) return; // Web3 인스턴스가 없으면 함수를 종료합니다.

    try {
      const accounts: string[] = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        console.error("No accounts found.");
      } else {
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    connectWallet().then(() => {
      getAccountInfo();
    });
  }, []);

  // async function getBalance() {
  //   try {
  //     const balance = await web3.eth.getBalance(
  //       "0x6877fDA0d42E69f5220d36b408aBd68cbd36C883"
  //     );
  //     console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // getBalance();

  //! SNS 연동 부분
  const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
  // const web3 = new Web3(`https://network.bouncecode.net/${projectId}`);
  // const projectId = "e820a145-cce9-46b1-993d-04bb413bf616";
  let parsedUrl = new URL(window.location.href);
  const accessToken = parsedUrl.searchParams.get("access_token");
  const refreshToken = parsedUrl.searchParams.get("refresh_token");

  const onClickLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const redirectUri = window.location.protocol + "//" + window.location.host;
    // const redirectUri = "http://localhost:3000";

    const queryString = new URLSearchParams({
      client_id: projectId,
      redirect_uri: redirectUri,
    }).toString();

    const loginUrl = `https://mrlogin.io/login?${queryString}`;
    // const loginUrl = `https://bouns.io/_login/?client_id=${projectId}&redirect_uri=${redirectUri}`;

    // provider 를 지정하면 원하는 소셜로그인 화면을 다이렉트로 표시할 수 있습니다.
    // const loginUrl = `https://mrlogin.io/auth/${provider}/login?${queryString}`;

    window.location.href = loginUrl;
  };

  useEffect(() => {
    // let didToken = null;

    if (accessToken || refreshToken) {
      // access token 검증
      fetch(
        `https://bouns.io/api/jwt-verify?token=${accessToken}&projectId=${projectId}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        const result = await res.json();
        if (res.status == 200) {
          createDidToken();
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("address", address);
    // async function getBalance() {
    //   if (address) {
    //     try {
    //       const balance = await web3.eth.getBalance(address);
    //       console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //   getBalance();
    // }
  }, [address]);

  // DID 토큰 생성 로직 추가
  const createDidToken = () => {
    fetch(`https://bouns.io/api/create-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    }).then(async (res) => {
      const result = await res.json();
      alert(result);
      if (res.status == 200) {
        setDidToken(result);
        // verifyDidToken();
      }
    });
  };

  // wallet 주소 받아오기
  const verifyDidToken = () => {
    fetch(`https://bouns.io/api/verify-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: didToken,
      }),
    }).then(async (res) => {
      const result = await res.json();
      // const result = await res.data;
      console.log("res :", res);
      // console.log("data :", res.data);
      console.log("json :", result);
      const iss = result?.iss;
      const walletAddress = iss.split(":")[2];
      setAddress(walletAddress);
      alert(walletAddress);
    });
  };

  // Function equivalent to your script
  const windowPopUp = () => {
    const host = "https://bouns.io"; // MrLogin Endpoint. (* required)
    const clientId = "6e9c40d1-1236-42c4-8a13-586e7df92327"; // projectId (* required)
    const viewProjectId = undefined;

    const network = "ether"; // bnc: bounce aliance , ether: ethereum mainnet, solana: solana mainnet

    // 로그인 또는 auto 로그인 이후 redirect 할 화면
    const dest = "sign"; // 기본 화면: null or undefined, 서명 화면: sign
    // 언어 설정 ( ko: 한국, en: 미국, ja: 일본)
    const locale = "ko";

    // popup window style setting
    const style = "left=10,top=10,width=375,height=520,scrollbars=auto";

    const url = `${host}/walletv2/${clientId}/?${
      !!viewProjectId ? `viewProjectId=${viewProjectId}` : ""
    }&network=bnc&dest=${dest}&locale=${locale}`;

    window.open(url, "popup", style); // MrLogin Wallet popup 실행
  };

  return (
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인인 버튼ㅇㅇㅜㅜ
      </button>
      <button className="loginButton" onClick={verifyDidToken}>
        로그인인 버튼ㅇㅇ
      </button>
      <button className="windowPopUp" onClick={windowPopUp}>
        windowPopUp
      </button>
      <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
        {account && <p>Connected Account: {account}</p>}
      </div>
    </div>
  );
};

export default App;
