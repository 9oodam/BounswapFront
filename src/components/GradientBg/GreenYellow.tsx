import React from "react";

import { ReactNodeProps } from "../../Interface/ReactNode.interface";

const GreenYellow: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-green-yellow flex flex-col items-center">
      {children}
    </div>
  );
};

export default GreenYellow;
