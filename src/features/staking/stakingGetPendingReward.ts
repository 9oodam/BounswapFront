import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
  user: {
    account: string;
    balance: string;
  };
}

const StakingData = async (
  stakingContract: Contract<any> | null,
  user: {
    account: string;
    balance: string;
  }
) => {
  const _pid = 0;
  const _user = user.account;
  const data = await (stakingContract?.methods.pendingBNC as any)(
    _pid,
    _user
  ).call();
  return data;
};

export const myPendingRewardUpdate = async ({
  stakingContract,
  queryClient,
  user,
}: Params) => {
  try {
    const data = await StakingData(stakingContract, user);

    const pendingBNC = data ? data.toString() : null;
    console.log("pendingReward", pendingBNC);

    queryClient.setQueryData(["pendingBNC"], pendingBNC);
    return pendingBNC;
  } catch (error) {
    console.log("");
  }
};