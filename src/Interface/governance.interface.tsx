import { type } from "os";

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
}


export interface ProposalsArr {
  data: proposals[];
}
