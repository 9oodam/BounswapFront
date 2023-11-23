// ModalComponent.js
import React from "react";
import Modal from "react-modal";
import { ModalComponentProps } from "src/Interface/Modal.interface";

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  modalHeader,
  modalBody,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[30px] shadow-lg max-w-2xl w-[100%] " // 너비 조절
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
      // 모달 스타일 설정
    >
      <div className="w-full p-[20px]">{modalHeader}</div>
      <div className="w-full">{modalBody}</div>
    </Modal>
  );
};

export default ModalComponent;
