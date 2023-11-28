import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  queryClient: QueryClient;
  user: {
    account: string,
    balance: string
  }
}

const StakingData = async (stakingContract: Contract<any> | null, user:{account:string, balance:string}) => {
  const _pid = 0;
  const _user = user.account; 
  const data = await (stakingContract?.methods.getNinjaInfo as any)(
    _pid,
    _user
  ).call();
  return data;
};

export const getNinjaInfo = async ({
  stakingContract,
  queryClient,
  user
}: Params) => {
  try {
    const data = await StakingData(stakingContract, user);

    const ninjaInfo = data
      ? {
          totalLPToken: BigInt(data.totalLPToken).toString(),
          totalNinjaReward: BigInt(data.totalNinjaReward).toString(),
          stakingLeftTime: BigInt(data.stakingLeftTime).toString(),
        }
      : null;

    queryClient.setQueryData(["ninjaInfo"], ninjaInfo);

    return ninjaInfo;
  } catch (error) {
    console.log(error);
  }
};

//    /// @notice 스테이킹 도중 포기한 사용자들의 정보
//    struct NinjaInfo {
//     uint256 totalLPToken; /// @dev 총 예치했던 LP토큰 수량
//     uint256 totalNinjaReward; /// @dev 총 얻었던 리워드 수량
//     uint256 stakingLeftTime; /// @dev 스테이킹을 포기한 시간
// }
