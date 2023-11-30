import { Bytes } from "web3";
import { TokenItem } from "./Token.interface";

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

type VoteProposalFunction = (
  support: boolean,
  id: number,
  proposer: string
) => Promise<void>;

export interface PropoaslProps {
  data : proposals;
  voteProposal : VoteProposalFunction;
}

export interface ProposalsArr {
  data: proposals[];
  voteProposal : VoteProposalFunction;
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