import React from "react";
import { Divstyles, Textstyle } from "./TokenName.style";

const TokenName = () => {
  return (
    <>
      <img src="/images/backArrow.png" className={Divstyles.arrowsize}></img>
      <div className={Divstyles.Titlesize}>
        <img
          src="https://i.pinimg.com/564x/76/ca/1a/76ca1a94e6866f3b1156218c6723ce3a.jpg"
          className={Divstyles.LogoImg}
        ></img>
        <div className={Divstyles.nameBox}>
          <div className={Textstyle.nameTitle}>Ether</div>
          <div className={Textstyle.symbolTitle}>ETH</div>
        </div>
      </div>
    </>
  );
};

export default TokenName;
