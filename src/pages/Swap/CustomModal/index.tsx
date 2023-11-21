import React, { useState } from "react";
import Modal from "react-modal";
import SelectToken from "./SelectToken";

const CustomModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>버튼</button>
      {/* <div className="flex"> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg max-w-2xl w-[100%] " // 너비 조절
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
      >
        <div>
          <div className="w-full">Select a token</div>
        </div>
        <div className="h-60 w-full bg-red-600 center">
          <SelectToken tokenName={"dd"} />
        </div>
      </Modal>
      {/* </div> */}
    </div>
  );
};

export default CustomModal;
