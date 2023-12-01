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
    console.log("Total Staked", etherData);

    // const totalLPTokenAmount = data ? BigInt(data).toString() : null;

    queryClient.setQueryData(["totalLPTokenAmount"], etherData);

    return etherData;
  } catch (error) {
    console.log(error);
  }
};

// /// @notice 해당 pool에 총 예치된 LP토큰 수량
// function getTotalLPToken(uint256 _pid) public view returns (uint256) {
//     PoolInfo storage pool = poolInfo[_pid];
//     return pool.lpToken.balanceOf(address(this));
// }
