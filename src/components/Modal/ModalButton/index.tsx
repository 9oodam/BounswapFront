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
        "버튼"
      )}
    </button>
  );
};

export default ButtonComponent;
