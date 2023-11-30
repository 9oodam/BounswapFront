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
    console.log(error);
  }
};

// struct PoolInfo {
//     IERC20 lpToken; /// @dev 풀 생성에 사용된 토큰의 주소
//     uint256 allocPoint; /// @dev 풀당 할당된 리워드 퍼센트
//     uint256 lastRewardBlock; /// @dev 마지막으로 채굴된 블록
//     uint256 accBNCPerShare; /// @dev LP당 얻는 BNC
//     uint256 stakingPoolEndTime;
//     uint256 stakingPoolStartTime;
// }
