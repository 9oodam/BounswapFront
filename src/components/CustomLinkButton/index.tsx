import React from "react";
import { Link } from "react-router-dom";
import { CustomLinkProps } from "../../Interface/Button.interface";
import {} from 'src/Interface/Button.interface'

const CustomLinkButton = ({ to, children }: CustomLinkProps) => {
  return (
    <div className="w-[85%] flex justify-end">
      <Link
        to={to}
        className="pc:w-[20%] mobile:w-[10%] min-w-[200px] h-[50px] bg-lightGreen rounded-full mt-5 text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md"
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLinkButton;
