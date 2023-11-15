import React, { useEffect, useState } from "react";
import LoadingIndicator from "src/components/LoadingIndicator";
import { verifyToken, getLoginUrl } from "src/Service/authService";
import { SNSLoginProps } from "src/Interface/SNSLoginProps";
import axios from "src/utils/axiosConfig";

const SNSLogin: React.FC<SNSLoginProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);

  const onClickLogin = async () => {
    window.location.href = getLoginUrl();
  };

  useEffect(() => {
    console.log("현재 URL:", window.location.href);
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get("access_token");

    console.log("urlAccessToken:", accessToken);

    if (accessToken) {
      console.log("??");

      verifyToken(accessToken).then((isValid) => {
        if (isValid) {
          localStorage.setItem("accessToken", accessToken);

          console.log("axiosConfig > verifyToken 완료");

          onLoginSuccess();
        } else {
          alert("토큰이 유효하지 않습니다");
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [onLoginSuccess]);

  // useEffect(() => {
  //   console.log("address", address);
  // }, [address]);

  // DID 토큰 생성 로직 추가
  // const createDidToken = () => {
  //   fetch(`https://bouns.io/api/create-did-token`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: accessToken,
  //     }),
  //   }).then(async (res) => {
  //     try {
  //       const result = await res.json();
  //       alert(result);
  //       console.log("DID token?", result);

  //       if (res.status == 200) {
  //         setDidToken(result);
  //         setLoggedData(result);
  //         onLoginSuccess();
  //       } else {
  //         console.error("Error in creating DID token:", result);
  //       }
  //     } catch (error) {
  //       console.error("Network error :", error);
  //     }
  //   });
  // };

  // wallet 주소 받아오기
  // const verifyDidToken = () => {
  //   fetch(`https://bouns.io/api/verify-did-token`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: didToken,
  //     }),
  //   }).then(async (res) => {
  //     const result = await res.json();
  //     // console.log("json :", result);
  //     const iss = result?.iss;
  //     const walletAddress = iss.split(":")[2];
  //     setAddress(walletAddress);
  //     alert(walletAddress);
  //   });
  // };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <button className="loginButton" onClick={onClickLogin}>
        로그인 버튼
      </button>

      {/* <button className="loginButton" onClick={verifyDidToken}>
            verifyDidToken
          </button> */}
      {/* <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre> */}
    </div>
  );
};

export default SNSLogin;
