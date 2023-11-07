import { type } from "os";
import React from "react";
import { Divstyle } from "./Pairname.style";

const Pairname = () => {
  return (
    <>
      <img src="/images/backArrow.png" className={Divstyle.arrowsize}></img>
      <div className={Divstyle.Titlesize}>
        <div className={Divstyle.LogoPair}>
          <img
            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
            className={Divstyle.LogoLeft}
          ></img>
          <img
            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
            className={Divstyle.LogoRight}
          ></img>
        </div>
        <div className={Divstyle.title}>ETH - USDT</div>
      </div>
    </>
  );
};

export default Pairname;
