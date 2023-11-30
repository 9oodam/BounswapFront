import React, { useState, useEffect, useRef } from "react";

const Sidebar: React.FC<{
  title?: React.ReactNode;
  button?: React.ReactNode;
  isOpen: boolean;
  toggleMenu: () => void;
  children?: React.ReactNode;
}> = ({ title, button, isOpen, toggleMenu, children }) => {
  return (
    <>
      <div
        className={`transition-all ease-in-out duration-300 fixed pcSiedbar:top-[8px] pcSiedbar:bottom-0 text-deepBlack pcSiedbar:w-[375px] mobileSiedbar:w-full mobileSiedbar:min-w-[400px] mobileSiedbar:left-0 mobileSiedbar:right-0 mobileSiedbar:bottom-0 mobileSiedbar:h-[720px] h-custom z-50 rounded-[12px] bg-[#edf9e4] ${
          isOpen
            ? "pcSiedbar:right-[8px] pcSiedbar:translate-x-0 mobileSiedbar:translate-y-0 "
            : "pcSiedbar:right-0 pcSiedbar:translate-x-full mobileSiedbar:translate-y-full "
        }`}
      >
        <div className="w-full h-full pt-[14px] pr-[16px] pb-[16px] pl-[16px] rounded-[12px]">
          <div className=" w-full flex flex-wrap justify-between text-center mb-[16px] font-bold">
            <div>{title}</div>
            <div className="flex items-center">{button}</div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
