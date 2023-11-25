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

    const pendingBNC = data ? BigInt(data).toString() : null;

    queryClient.setQueryData(["pendingBNC"], pendingBNC);
    return pendingBNC;
  } catch (error) {
    console.log(error);
  }
};

//    /// @notice 프론트엔드에서 사용자가 보상으로 쌓은 BNC 조회할 수 있도록 만든 view 함수
//    function pendingBNC(uint256 _pid, address _user) public vaildPool(_pid) view returns (uint256) {
//     PoolInfo storage pool = poolInfo[_pid];
//     UserInfo storage user = userInfo[_pid][_user];
//     uint256 accBNCPerShare = pool.accBNCPerShare;
//     uint256 lpSupply = pool.lpToken.balanceOf(address(this));

//     if(block.number > pool.lastRewardBlock && lpSupply != 0) {
//         uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
//         uint256 BNCReward = multiplier * BNCPerBlock * pool.allocPoint / totalAllocPoint * stakingPercent / percentDec;
//         accBNCPerShare = accBNCPerShare + BNCReward * 1e12 / lpSupply;
//     }
//     return user.pendingReward + user.amount * accBNCPerShare / 1e12 - user.exactRewardCal;
// }
