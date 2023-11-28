import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useQueryClient } from "@tanstack/react-query";
import ModalComponent from "src/components/Modal";
import ButtonComponent from "src/components/Modal/ModalButton";
import SelectTokenBody from "src/contents/Swap/SelectTokenBody";
import SelectTokenHeader from "src/contents/Swap/SelectTokenHeader";
import { CustomModalProps } from "src/Interface/Modal.interface";
import { TokenItem } from "src/Interface/Token.interface";

type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

const CustomModal: React.FC<CustomModalProps> = ({
  tokens,
  selectedToken,
  setSelectedToken,
}) => {
  const [isOpen, setModalIsOpen] = useState(false);
  // const queryClient = useQueryClient();

  const handleSelectToken = (token: TokenItem) => {
    setSelectedToken(token);
    setModalIsOpen(false);
  };

  return (
    <div>
      <div>
        <ButtonComponent
          onClick={() => setModalIsOpen(true)}
          selectedToken={selectedToken}
        />
      </div>
      <div className="flex">
        <ModalComponent
          isOpen={isOpen}
          onRequestClose={() => setModalIsOpen(false)}
          modalHeader={<SelectTokenHeader />}
          modalBody={
            <SelectTokenBody
              tokens={tokens}
              handleSelectToken={handleSelectToken}
            />
          }
        />
      </div>
    </div>
  );
};

export default CustomModal;
