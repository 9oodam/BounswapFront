import React from "react";
import { ReactNodeProps } from "../../Interface/ReactNode.interface";
import { Divstyle } from "./GradientBg.style";

const index: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className={Divstyle.gradient}>
      {children}
    </div>
  );
};

export default index;
