import { error } from "console";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "src/components/LoadingIndicator";

const SNSLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [loggedData, setLoggedData] = useState();
  const [didToken, setDidToken] = useState();
  const [address, setAddress] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  let parsedUrl = new URL(window.location.href);
  // const accessToken = parsedUrl.searchParams.get("access_token");
  // const refreshToken = parsedUrl.searchParams.get("refresh_token");

  const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";

  const onClickLogin = async () => {
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
    const urlAccessToken = new URL(window.location.href).searchParams.get(
      "access_token"
    );

    if (urlAccessToken) {
      console.log("urlAccessToken", urlAccessToken);
      setAccessToken(urlAccessToken);
      console.log("?", accessToken);
      // localStorage.setItem("accessToken", accessToken);
      verifyToken(urlAccessToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = (token: string) => {
    fetch(
      `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const result = await res.json();
        if (res.status == 200) {
          // createDidToken();
          onLoginSuccess();
        } else {
          localStorage.removeItem("accessToken");
        }
      })
      .catch((error) => {
        console.error("Token verification error:", error);
        setAccessToken(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log("address", address);
  // }, [address]);

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
      try {
        const result = await res.json();
        alert(result);
        console.log("DID token?", result);

        if (res.status == 200) {
          setDidToken(result);
          setLoggedData(result);
          onLoginSuccess();
        } else {
          console.error("Error in creating DID token:", result);
        }
      } catch (error) {
        console.error("Network error :", error);
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
      // console.log("json :", result);
      const iss = result?.iss;
      const walletAddress = iss.split(":")[2];
      setAddress(walletAddress);
      alert(walletAddress);
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <button className="loginButton" onClick={onClickLogin}>
        로그인인 버튼
      </button>
      {/* <button className="loginButton" onClick={verifyDidToken}>
            verifyDidToken
          </button> */}
      {/* <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre> */}
    </div>
  );
};

export default SNSLogin;
