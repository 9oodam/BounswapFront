import React from "react";
import { ReactNodeProps } from "../../Interface/ReactNode.interface";

const InputTokenName: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className="w-[60px] h-[34px] text-lg text-[#9C9C9C]">{children}</div>
  );
};

export default InputTokenName;
