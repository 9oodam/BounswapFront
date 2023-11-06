import React from "react";

import { ReactNodeProps } from "../../Interface/ReactNode.interface";

const GY_Background: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-green-yellow flex flex-col items-center">
      {children}
    </div>
  );
};

export default GY_Background;
