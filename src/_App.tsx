import "./App.css";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Result } from "postcss";
import Web3 from "web3";

function App() {
  const [loggedData, setLoggedData] = useState();
  const [didToken, setDidToken] = useState();

  console.log("dfdffdf");

  const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
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
      // setLoggedData({
      //   // accessToken: jwt.decode(accessToken),
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      // });

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

      // fetch(`https://bouns.io/api/create-did-token-solana`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     token: accessToken,
      //     // token: [jwt.decode(accessToken)],
      //   }),
      // })
      //   .then(async (res) => {
      //     const result = await res.json();
      //     console.log("res : ", res);

      //     // 지금 요구사항에서 제시해주신 문서를 참고해서 소셜로그인을 구현하고 있는데
      //     // 액세스토큰은 이미 요청해서 받은 상태이고
      //     // 이제 지갑 주소를 받으려면 액세스토큰으로 did토큰을 발급받아야 하는데
      //     // 해당 경로로 요청을 보냈더니 null값이 뜹니다... 뭐가 문제인지 알수가 없어요..
      //     didToken = res.body;
      //     console.log(result);
      //   })
      //   .catch((e) => {
      //     console.log("?", e);
      //   });
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

  // wallet
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

  return (
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인인 버튼ㅇㅇㅜㅜ
      </button>
      <button className="loginButton" onClick={verifyDidToken}>
        로그인인 버튼ㅇㅇ
      </button>
      <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre>
    </div>
  );
}

export default App;
