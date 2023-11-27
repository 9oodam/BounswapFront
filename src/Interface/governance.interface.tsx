import { Bytes } from "web3";

export interface proposals {
  id: number;
  proposer: string;
  title: string;
  description: string;
  quorumVotes: number;
  forVotes: number;
  againstVotes: number;
  startTime: number;
  endTime: number;
  state: number;
  forPercent : string | number;
  againstPercent : string | number;
}

export interface ProposalsArr {
  data: proposals[];
}

export interface ProposalContract {
  id : bigint;
  proposer : string;
  title : Bytes;
  description : Bytes;
  quorumVotes : bigint;
  forVotes : bigint;
  againstVotes : bigint;
  startTime : bigint;
  endTime : bigint;
  state : bigint;
}