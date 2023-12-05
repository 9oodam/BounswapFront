import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
  web3?: Web3 | null;
}

const StakingData = async (stakingContract: Contract<any> | null) => {
  const _pid = 0;
  const data = await (stakingContract?.methods.getTotalLPToken as any)(
    _pid
  ).call();
  return data;
};

export const getTotalLPToken = async ({
  stakingContract,
  queryClient,
  web3,
}: Params) => {
  try {
    const data = await StakingData(stakingContract);
    const etherData = web3?.utils.fromWei(BigInt(data), "ether");
    queryClient.setQueryData(["totalLPTokenAmount"], etherData);
    return etherData;
  } catch (error) {
    console.log("");
  }
};