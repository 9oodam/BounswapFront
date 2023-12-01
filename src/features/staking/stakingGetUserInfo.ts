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
    // console.log(error);
  }
};

//    /// @notice 스테이킹 유저의 정보
//    struct UserInfo {
//     uint256 amount; /// @dev 유저의 LP토큰 예치량
//     uint256 exactRewardCal; /// @dev 정확한 리워드 계산을 위한 변수
//     uint256 pendingReward; /// @dev 보상으로 얻은 리워드량
//     uint256 stakingStartTime; /// @dev 스테이킹 시작 시간
// }
