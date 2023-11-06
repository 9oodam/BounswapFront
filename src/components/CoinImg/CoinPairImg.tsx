import React from "react";

// todo 나중에는 이미지 링크를 받아서 넣어야 한다.... 그때 타입값 지정해서 넣기로해,,,
const CoinPairImg = () => {
  return (
    <div className="relative w-[100px] h-[50px]">
      <img
        src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
        className="w-[50px] h-[50px] absolute rounded-coinLogo"
      ></img>
      <img
        src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
        className="w-[50px] h-[50px] absolute left-6 rounded-coinLogo"
      ></img>
    </div>
  );
};

export default CoinPairImg;
