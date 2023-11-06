import React from "react";
type ReactNodeProps = {
  children: React.ReactNode;
};

const DivCard: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <div className="mobile:w-[340px] pc:w-[580px] pc:p-5 pc:m-5 pc:mt-8 bg-[rgba(255,255,255,0.85)]  rounded-xl: rounded-bodyBackRadius">
      {children}
    </div>
  );
};

export default DivCard;
