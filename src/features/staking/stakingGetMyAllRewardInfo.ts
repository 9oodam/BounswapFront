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
  const data = await (stakingContract?.methods.myAllReward as any)(
    _pid,
    _user
  ).call();
  return data;
};

export const myAllRewardInfo = async ({
  stakingContract,
  queryClient,
  user,
}: Params) => {
  try {
    const data = await StakingData(stakingContract, user);
    console.log("myReward", data);
    const myAllReward = data ? data : null;

    queryClient.setQueryData(["myAllReward"], myAllReward);

    return myAllReward;
  } catch (error) {
    console.log("");
  }
};