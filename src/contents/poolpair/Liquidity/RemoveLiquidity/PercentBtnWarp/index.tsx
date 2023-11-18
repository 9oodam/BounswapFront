import React from "react";
import { Divstyle } from "./PercentBtnWarp.style";

const index = () => {
  return (
    <>
      <div className={Divstyle.Btns}>
        <div className={Divstyle.Btn}>25%</div>
        <div className={Divstyle.Btn}>50%</div>
        <div className={Divstyle.Btn}>75%</div>
        <div className={Divstyle.Btn}>100%</div>
      </div>
    </>
  );
};

export default index;
