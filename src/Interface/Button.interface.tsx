import React from "react";

export interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  walletAddress?: string;
}
