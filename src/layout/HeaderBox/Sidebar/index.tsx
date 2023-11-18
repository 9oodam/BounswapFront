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
        className={`fixed top-[8px] bottom-0 transition-all ease-in-out duration-300 text-deepBlack w-[25%] h-custom z-50 rounded-[12px] bg-[#edf9e4] ${
          isOpen ? "right-[8px] translate-x-0" : "right-0 translate-x-full"
        }`}
      >
        <div className="w-full h-full pt-[14px] pr-[16px] pb-[16px] pl-[16px] rounded-[12px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
