import React from "react";
import { Divstyles, Textstyle } from "./TokenName.style";
import { TokenNameInterface } from "src/Interface/Token.interface";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";
//! interface 만들기. 토큰img, 토큰이름, 토큰심볼
const TokenName: React.FC<TokenNameInterface> = ({
  tokenImg,
  tokenName,
  tokenSymbol,
  onClick,
}) => {
  return (
    <>
      <div className="mobile:ml-7 mobile:mr-7">
        <img
          src={`${ImgBaseUrl()}backArrow.png`}
          className={Divstyles.arrowsize}
          onClick={onClick}
        ></img>
        <div className={Divstyles.Titlesize}>
          <img
            src={tokenImg}
            className={Divstyles.LogoImg}
          ></img>
          <div className={Divstyles.nameBox}>
            <div className={Textstyle.nameTitle}>{tokenName}</div>
            <div className={Textstyle.symbolTitle}>{tokenSymbol}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenName;
