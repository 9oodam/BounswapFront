import { TokenItem } from "src/Interface/Token.interface";

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
  selectedToken: TokenItem | null; // 또는 다른 적절한 타입
}

export interface SelectTokenBodyProps {
  tokens: TokenItem[];
  handleSelectToken: (token: TokenItem) => void;
}

export interface CustomModalProps {
  tokens: TokenItem[];
  selectedToken: TokenItem | null; // 또는 다른 적절한 타입
  setSelectedToken: (token: TokenItem) => void;
}
