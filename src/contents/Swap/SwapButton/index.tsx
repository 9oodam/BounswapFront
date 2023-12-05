import { useState } from "react";
import ModalComponent from "src/components/Modal";
import SwapButtonBody from "./SwapButtonBody";
import SwapButtonHeader from "./SwapButtonHeader";

const SwapButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[85%] max-w-[500px] min-w-[340px] h-[60px] bg-lightGreen rounded-[20px] m-2 mt-2 text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md">
      <button onClick={() => setIsModalOpen(true)}>Select a Token</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalHeader={<SwapButtonHeader />}
        modalBody={<SwapButtonBody />}
      />
    </div>
  );
};

export default SwapButton;
