// ButtonComponent.js
import React from "react";
import { ModalButtonProps } from "src/Interface/Modal.interface";

const ButtonComponent: React.FC<ModalButtonProps> = ({
  onClick,
  selectedToken,
}) => {
  return (
    <button onClick={onClick}>
      {selectedToken ? (
        <div className="flex items-center hover:scale-105">
          <div className="w-[36px] h-[36px]">
            <img
              src={selectedToken.tokenUri}
              alt={selectedToken.tokenName}
              className="rounded-[50%]"
            />
          </div>
          <span className="pl-[4px] dark:text-white">{selectedToken.tokenSymbol}</span>
        </div>
      ) : (
        <div className="w-[120px] h-[40px] bg-lightGreen rounded-coinLogo font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md pl-[10px] pr-[10px]">
          Select token
        </div>
      )}
    </button>
  );
};

export default ButtonComponent;
