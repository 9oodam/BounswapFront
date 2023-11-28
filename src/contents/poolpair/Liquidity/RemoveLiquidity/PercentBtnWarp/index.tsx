import { useState, useEffect } from "react";
import { Divstyle } from "./PercentBtnWarp.style";
import { InputTokenProps } from "src/Interface/Token.interface";

const index: React.FC<InputTokenProps> = ({setInputAmount}) => {

  const percentArr = [25, 50, 75, 100];
  return (
    <>
      <div className={Divstyle.Btns}>
        <div onClick={() => {setInputAmount?.(percentArr[0].toString())}} className={Divstyle.Btn}>25%</div>
        <div onClick={() => {setInputAmount?.(percentArr[1].toString())}} className={Divstyle.Btn}>50%</div>
        <div onClick={() => {setInputAmount?.(percentArr[2].toString())}} className={Divstyle.Btn}>75%</div>
        <div onClick={() => {setInputAmount?.(percentArr[3].toString())}} className={Divstyle.Btn}>100%</div>
      </div>
    </>
  );
};

export default index;
