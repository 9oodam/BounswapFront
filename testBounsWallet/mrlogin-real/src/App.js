import "./App.css";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Result } from "postcss";

function App() {
  const [loggedData, setLoggedData] = useState();

  const onClickLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const projectId = "e820a145-cce9-46b1-993d-04bb413bf616";
    const redirectUri = window.location.protocol + "//" + window.location.host;

    const queryString = new URLSearchParams({
      client_id: projectId,
      redirect_uri: redirectUri,
    }).toString();

    const loginUrl = `https://mrlogin.io/login?${queryString}`;

    // provider 를 지정하면 원하는 소셜로그인 화면을 다이렉트로 표시할 수 있습니다.
    // const loginUrl = `https://mrlogin.io/auth/${provider}/login?${queryString}`;

    window.location.href = loginUrl;
  };

  useEffect(() => {
    let parsedUrl = new URL(window.location.href);
    const accessToken = parsedUrl.searchParams.get("access_token");
    const refreshToken = parsedUrl.searchParams.get("refresh_token");

    if (accessToken || refreshToken) {
      setLoggedData({
        accessToken: jwt.decode(accessToken),
        refreshToken: refreshToken,
      });

      // DID 토큰 생성 로직 추가
      fetch(`https://bouns.io/api/create-did-token-solana`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
        }),
      })
        .then(async (response) => {
          console.log("response: ", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // return response.json();
          const result = await res.json();
          console.log("result : ", result);
        })
        // .then(async(result) => {
        //   console.log(result);
        //   await
        // })
        .catch((error) => {
          console.error("DID 토큰 생성 에러:", error);
        });
    }
  }, []);

  return (
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인인 버튼ㅇㅇㅜㅜ
      </button>
      <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre>
    </div>
  );
}

export default App;
