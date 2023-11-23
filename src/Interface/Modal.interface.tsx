// import { Token } from "src/pages/Swap/CustomModal/index";
type Token = {
  tokenAddress: string;
  name: string;
  symbol: string;
  uri: string;
  tvl: bigint;
  balance: bigint;
};

export interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalHeader: React.ReactNode;
  modalBody: React.ReactNode;
}

export interface ModalButtonProps {
  onClick: () => void;
  selectedToken: Token | null; // 또는 다른 적절한 타입
}

export interface SelectTokenBodyProps {
  tokens: Token[];
  handleSelectToken: (token: Token) => void;
}

export interface CustomModalProps {
  tokens: Token[];
  selectedToken: Token | null; // 또는 다른 적절한 타입
  setSelectedToken: (token: Token) => void;
}
