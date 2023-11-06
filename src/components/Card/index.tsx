import React from "react";
import { ReactNodeProps } from "../../Interface/ReactNode.interface";

const Card: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className="mobile:w-[340px] pc:w-[620px] pc:p-7 pc:m-7 pc:mt-8 bg-[rgba(255,255,255,0.85)] rounded-xl: rounded-bodyBackRadius">
      {children}
    </div>
  );
};

export default Card;
