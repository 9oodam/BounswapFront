import React from "react";
import { LiquidityTapProps } from "../../Interface/Color.interface";

// todo 선택되지 않은 탭의 bg-[#A9AAA6]이어야 한다.
const LiquidityTap: React.FC<LiquidityTapProps> = ({
  id,
  onClick,
  textColor,
  children,
  backgroundColor,
  textweight,
}) => {
  return (
    <div
      id={id}
      className={`w-[210px] h-[60px] text-xl ${textweight} ${textColor} ${backgroundColor} rounded-tl-coinBox rounded-tr-coinBox flex items-end justify-center p-3`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LiquidityTap;
