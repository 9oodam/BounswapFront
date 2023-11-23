import React from "react";

export interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  walletAddress?: string;
}

export interface github {
  name: string;
  address: string;
}
