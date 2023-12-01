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
    // console.log(error);
  }
};

//    /// @notice 쌓인 리워드 갯수, 블록당 받는 리워드 갯수, 탈주자가 남기고간 리워드 중 내 몫 반환
//    function myAllReward (uint256 _pid, address _user) public view returns (uint256, uint256, uint256) {
//     bool isStaking = false;
//     for (uint256 i; i < stakingUsers[_pid].length; i++) {
//         if(stakingUsers[_pid][i] == _user) {
//             isStaking = true;
//             break;
//         }
//     }
//     if (isStaking) {
//         uint256 pendingBNCValue = pendingBNC(_pid, _user);
//         uint256 userBlockRewardPerBlockValue = userBlockRewardPerBlock(_pid, _user);
//         uint256 estimatedUserRewardFromNinjsVlaue = estimatedUserRewardFromNinjs(_pid, _user);
//         return (pendingBNCValue, userBlockRewardPerBlockValue, estimatedUserRewardFromNinjsVlaue);
//     } else {
//         return (0, 0, 0);
//     }
// }
