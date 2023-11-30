import React, { useEffect, useState } from "react";
import LoadingIndicator from "src/components/LoadingIndicator";
import { getLoginUrl } from "src/Service/authService";
import { SNSLoginProps } from "src/Interface/SNSLoginProps";
import Footer from "src/layout/FooterBox";
import { DivStyle } from "./SNSLogin.styled";

const SNSLogin: React.FC<SNSLoginProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);

  const onClickLogin = async () => {
    window.location.href = getLoginUrl();
  };

  useEffect(() => {
    // console.log("현재 URL:", window.location.href);
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get("access_token");
    const refreshToken = url.searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      // 토큰이 유효한 경우, 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 로그인 성공 처리
      onLoginSuccess();
    } else {
      // 토큰이 URL에 없는 경우
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
    <>
      {/* 다른 파일 건드린 부분 == App.css 파일안에 loginButton, .App text-align 주석처리 */}

      <div className={DivStyle.SNSLoginBox}>
        <img className="w-[125px] h-[125px]" src="/images/BounsIo_LOGO.png" />
        <div className=" w-full h-[23px] top-[36px] left-0 [text-shadow:0px_4px_4px_#00000040] font-bold text-baseWhite text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          BounSwap
        </div>
        <button
          className="w-[20%] h-11 mt-16 bg-lightGreen shadow-lg hover:bg-deepGreen rounded-full text-baseWhite font-bold text-[25px] cursor-pointer"
          onClick={onClickLogin}
        >
          Sign
        </button>
      </div>

      {/* <button className="loginButton" onClick={verifyDidToken}>
            verifyDidToken
          </button> */}
      {/* <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre> */}
      {/* <Footer /> */}
    </>
  );
};

export default SNSLogin;
