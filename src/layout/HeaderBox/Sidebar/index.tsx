import React, { useState, useEffect, useRef } from "react";

const Sidebar: React.FC<{
  width?: number;
  children?: React.ReactNode;
  isOpen: boolean;
  toggleMenu: () => void;
}> = ({ width = 500, children, isOpen, toggleMenu }) => {
  // const [isSidebarOpen, setSidebarOpen] = useState(isOpen);
  // const [isOpen, setOpen] = useState(false);
  // const [xPosition, setX] = useState(-width);
  // const side = useRef<HTMLDivElement>(null);
  // const side = useRef();

  // useEffect(() => {
  //   setSidebarOpen(isOpen);
  //   console.log("isOpen", isOpen);
  // }, [isOpen]);

  // const handleClose = async (e: MouseEvent) => {
  //   if (side.current && !side.current.contains(e.target as Node)) {
  //   }
  // };

  // useEffect(() => {
  //   const handleOutsideClick = (e: MouseEvent) => {
  //     handleClose(e);
  //   };
  //   window.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [handleClose]);

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 right-0 transition-all ease-in-out duration-300 text-[#202020] h-full z-50 border-1-4 border-[#202020] bg-[#edf9e4] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: `${width}px` }}
      >
        <div className="pt-10 pl-5 pr-10 border-2 border-[#cf5c5c]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
