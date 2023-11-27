import React from "react";
import { ReactNodeProps } from "src/Interface/ReactNode.interface";
import { Divstyle } from "./SwapContainer.styled";

const SwapContainer: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className={Divstyle.BlackBox}>{children}</div>
      </div>
    </>
  );
};
export default SwapContainer;
