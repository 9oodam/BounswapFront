import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
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
}: Params) => {
  try {
    const data = await StakingData(stakingContract);

    const totalLPTokenAmount = data ? BigInt(data).toString() : null;

    queryClient.setQueryData(["totalLPTokenAmount"], totalLPTokenAmount);

    return totalLPTokenAmount;
  } catch (error) {
    console.log(error);
  }
};

// /// @notice 해당 pool에 총 예치된 LP토큰 수량
// function getTotalLPToken(uint256 _pid) public view returns (uint256) {
//     PoolInfo storage pool = poolInfo[_pid];
//     return pool.lpToken.balanceOf(address(this));
// }
