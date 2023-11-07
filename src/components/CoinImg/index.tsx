import React from "react";
import { Imgstyle } from "./CoinImg.style";

const CoinImg = () => {
  // todo 코인의 이미지 값은 매개변수로 받아와 보여져야 할 것이다.
  // const ImgURL: string = "";
  return (
    <img
      src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
      className={Imgstyle.coin}
    ></img>
  );
};

export default CoinImg;
