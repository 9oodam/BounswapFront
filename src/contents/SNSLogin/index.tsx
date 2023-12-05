import React, { useEffect, useState } from "react";
import { getLoginUrl } from "src/Service/authService";
import { SNSLoginProps } from "src/Interface/SNSLoginProps";
import { DivStyle } from "./SNSLogin.styled";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";
import LoadingIndicator from "src/components/LoadingIndicator";

const SNSLogin: React.FC<SNSLoginProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);

  const onClickLogin = async () => {
    window.location.href = getLoginUrl();
  };

  useEffect(() => {
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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className={DivStyle.SNSLoginBox}>
        <img className="w-[125px] h-[125px]" src={`${ImgBaseUrl()}BounsIo_LOGO.png`} />
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
    </>
  );
};

export default SNSLogin;
