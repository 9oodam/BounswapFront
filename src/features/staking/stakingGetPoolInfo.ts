import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
}

const StakingData = async (stakingContract: Contract<any> | null) => {
  const _pid = 0;
  const data = await (stakingContract?.methods.getPoolInfo as any)(_pid).call();
  return data;
};

export const getPoolInfo = async ({ stakingContract, queryClient }: Params) => {
  try {
    const data = await StakingData(stakingContract);

    const poolInfo = data
      ? {
        lpToken: data.lpToken,
        allocPoint: BigInt(data.allocPoint).toString(),
        lastRewardBlock: BigInt(data.lastRewardBlock).toString(),
        accBNCPerShare: BigInt(data.accBNCPerShare).toString(),
        stakingPoolEndTime: BigInt(data.stakingPoolEndTime).toString(),
        stakingPoolStartTime: BigInt(data.stakingPoolStartTime).toString(),
      }
      : null;

    queryClient.setQueryData(["poolInfo"], poolInfo);

    return poolInfo;
  } catch (error) {
    console.log("");
  }
};

