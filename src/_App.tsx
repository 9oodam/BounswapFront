import "./App.css";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Result } from "postcss";
import Web3, { Numbers } from "web3";

// declare let window: any;

const App: React.FC = () => {
  const [loggedData, setLoggedData] = useState();
  const [didToken, setDidToken] = useState();
  const [account, setAccount] = useState<string | null>(null);

  const web3 = new Web3("https://network.bouncecode.net/");
  async function getBalance() {
    try {
      const balance = await web3.eth.getBalance(
        "0x6877fDA0d42E69f5220d36b408aBd68cbd36C883"
      );
      console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
    } catch (err) {
      console.error(err);
    }
  }

  getBalance();

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

  // 지갑연결

  const connectWallet = async () => {
    try {
      // 커스텀 RPC를 사용하여 계정 정보를 가져옵니다.
      const web3 = new Web3(
        new Web3.providers.HttpProvider("https://network.bouncecode.net/")
      );
      // 계정 정보를 가져옵니다.
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error(
          "No accounts found. Please check the network and accounts."
        );
      }
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to the custom RPC:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

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
