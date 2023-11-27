import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  governanceContract: Contract<any>;
  queryClient: QueryClient;
}

const GovernanceData = async (governanceContract: Contract<any> | null) => {
  const data = await governanceContract?.methods.getProposals().call();
  console.log("contract : ", data);
  console.log("governanceContract ", governanceContract);
  return data;
};

export const getAllTokens = async ({
  governanceContract,
  queryClient,
}: Params) => {
  console.log("governanceContract2222", governanceContract);
  console.log("queryClient", queryClient);
  const data = await GovernanceData(governanceContract);

  console.log("getAllTokens : ", data);

  const proposals = data?.map(
    (el: {
      againstVotes: bigint;
      description: string;
      endTime: bigint;
      forVotes: bigint;
      id: bigint;
      proposer: string;
      quorumVotes: bigint;
      startTime: bigint;
      state: bigint;
      title: bigint;
    }) => {
      return {
        againstVotes: Number(el.againstVotes) / 10 ** 18,
        description: el.description,
        endTime: el.endTime,
        forVotes: el.forVotes,
        id: el.id,
        proposer: el.proposer,
        quorumVotes: el.quorumVotes,
        startTime: el.startTime,
        state: el.state,
        title: el.title,
      };
    }
  );

  // const queryClient = useQueryClient();
  queryClient.setQueryData(["proposals"], proposals);
  return proposals;
};
