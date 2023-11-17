import React, { useState, useEffect, useRef } from "react";

const Sidebar: React.FC<{
  // width?: number;
  children?: React.ReactNode;
  isOpen: boolean;
  toggleMenu: () => void;
}> = ({ children, isOpen, toggleMenu }) => {
  return (
    <>
      <div
        className={`fixed top-[8px] bottom-0 right-[8px] transition-all ease-in-out duration-300 text-[#202020] w-[30%] h-custom z-50 rounded-[12px] bg-[#edf9e4] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-[14px] pr-[16px] pb-[16px] pl-[16px] border-4 rounded-[12px] border-[#cf5c5c]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
