import React from "react";
import { Divstyles, Textstyle } from "./TokenName.style";
import { TokenNameInterface } from "src/Interface/Token.interface";
import { useNavigate } from "react-router-dom";
//! interface 만들기. 토큰img, 토큰이름, 토큰심볼
const TokenName: React.FC<TokenNameInterface> = ({
  tokenImg,
  tokenName,
  tokenSymbol,
  onClick,
}) => {
  // const nav = useNavigate();
  return (
    <>
      <img
        src="/images/backArrow.png"
        className={Divstyles.arrowsize}
        onClick={onClick}
      ></img>
      <div className={Divstyles.Titlesize}>
        <img
          // src="https://i.pinimg.com/564x/76/ca/1a/76ca1a94e6866f3b1156218c6723ce3a.jpg"
          src={tokenImg}
          className={Divstyles.LogoImg}
        ></img>
        <div className={Divstyles.nameBox}>
          <div className={Textstyle.nameTitle}>{tokenName}</div>
          <div className={Textstyle.symbolTitle}>{tokenSymbol}</div>
        </div>
      </div>
    </>
  );
};

export default TokenName;
