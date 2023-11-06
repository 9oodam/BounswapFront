import React from "react";

interface CardTitleProps {
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <h1 className="text-[#338415] text-[25px] font-bold w-full text-left">
      {children}
    </h1>
  );
};

export default CardTitle;
