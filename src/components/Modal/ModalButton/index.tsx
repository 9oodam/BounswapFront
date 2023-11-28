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
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] ">
            <img
              src={selectedToken.tokenUri}
              alt={selectedToken.tokenName}
              className="rounded-[50%]"
            />
          </div>
          <span>{selectedToken.tokenSymbol}</span>
        </div>
      ) : (
        <div className="w-[120px] h-[40px] bg-[#9CE084] rounded-coinLogo font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md pl-[10px] pr-[10px]">
          Select token
        </div>
      )}
    </button>
  );
};

export default ButtonComponent;
