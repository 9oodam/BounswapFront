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
              src={selectedToken.uri}
              alt={selectedToken.name}
              className="rounded-[50%]"
            />
          </div>
          <span>{selectedToken.symbol}</span>
        </div>
      ) : (
        <div className="w-full h-full bg-[#9CE084] rounded-coinLogo text-[14px] font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md">
          Select token
        </div>
      )}
    </button>
  );
};

export default ButtonComponent;
