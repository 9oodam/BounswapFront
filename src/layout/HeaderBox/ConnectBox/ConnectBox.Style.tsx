import React from "react";
import { ButtonProps } from "src/Interface/Button.interface";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const baseButtonStyle =
  "bg-lightGreen text-baseWhite py-[10px] px-[12px] rounded-[10px] hover:bg-deepGreen font-bold";

export const ConnectButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={`${baseButtonStyle}`}>
      {children}
    </button>
  );
};

export const WalletAddressButton: React.FC<ButtonProps> = ({
  onClick,
  walletAddress,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${baseButtonStyle} cursor-pointer flex items-center `}
    >
      <img
        src={`${ImgBaseUrl()}user.jpeg`}
        alt="User Avatar"
        className="w-[24px] h-[24px] rounded-full"
      />
      <span className={`ml-2 truncate text-base mobile:hidden`}>
        {walletAddress?.slice(0, 10)}...
      </span>
    </button>
  );
};
