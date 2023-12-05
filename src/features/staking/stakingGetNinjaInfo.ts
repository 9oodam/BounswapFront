import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
  user: {
    account: string,
    balance: string
  }
}

const StakingData = async (stakingContract: Contract<any> | null, user: { account: string, balance: string }) => {
  const _pid = 0;
  const _user = user.account;
  const data = await (stakingContract?.methods.getNinjaInfo as any)(
    _pid,
    _user
  ).call();
  return data;
};

export const getNinjaInfo = async ({
  stakingContract,
  queryClient,
  user
}: Params) => {
  try {
    const data = await StakingData(stakingContract, user);

    const ninjaInfo = data
      ? {
        totalLPToken: BigInt(data.totalLPToken).toString(),
        totalNinjaReward: BigInt(data.totalNinjaReward).toString(),
        stakingLeftTime: BigInt(data.stakingLeftTime).toString(),
      }
      : null;

    queryClient.setQueryData(["ninjaInfo"], ninjaInfo);

    return ninjaInfo;
  } catch (error) {
    console.log("");
  }
}