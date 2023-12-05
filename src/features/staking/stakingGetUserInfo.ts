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
  user: { account: string; balance: string }
) => {
  const _pid = 0;
  const _user = user.account;
  const data = await (stakingContract?.methods.getUserInfo as any)(
    _pid,
    _user
  ).call();
  return data;
};

export const getUserInfo = async ({
  stakingContract,
  queryClient,
  user,
}: Params) => {
  try {
    const data = await StakingData(stakingContract, user);

    const userInfo = data
      ? {
        amount: BigInt(data.amount).toString(),
        exactRewardCal: BigInt(data.exactRewardCal).toString(),
        pendingReward: BigInt(data.pendingReward).toString(),
        stakingStartTime: BigInt(data.stakingStartTime).toString(),
      }
      : null;
    queryClient.setQueryData(["userInfo"], userInfo);

    return userInfo;
  } catch (error) {
    console.log("");
  }
};

