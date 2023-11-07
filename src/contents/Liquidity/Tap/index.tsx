import React from "react";
import { LiquidityTapProps } from "src/Interface/Color.interface";
import { Divstyle } from "./Tap.style";

const index: React.FC<LiquidityTapProps> = ({
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
      className={`${Divstyle.box} ${textweight} ${textColor} ${backgroundColor} `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default index;
