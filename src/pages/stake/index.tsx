import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";
import { getPoolInfo } from "src/features/staking/stakingGetPoolInfo";
import { getTotalLPToken } from "src/features/staking/stakingGetTotalLPToken";
import { StakeItem, TotalToken } from "src/Interface/Token.interface";
import { getUserInfo } from "src/features/staking/stakingGetUserInfo";
import useWeb3 from "src/hooks/web3.hook";
import Container from "../../components/container";
import Dashboard from "../../components/Dashboard";

const Stake = () => {
  const [visible, setVisible] = useState(10);
  const [stakeData, setStakeData] = useState<TotalToken | null | undefined>(
    null
  );
  const [totalLp, setTotalLp] = useState<number | null | undefined>(null);
  const [tokenData, setTokenData] = useState<StakeItem[] | null>(null);
  const queryClient = useQueryClient();

  const titles = {
    stakeName: "Token Name",
    stake: "Total staked",
    end: "End Date",
    yours: "Your tokens",
  };

  const { web3, stakingContract, user } = useWeb3(window.ethereum);

  const getPoolInfoData = async () => {
    if (!stakingContract || !queryClient) return null;
    await getPoolInfo({
      stakingContract,
      queryClient,
    });
  };

  const { data: poolInfoData, refetch } = useQuery({
    queryKey: ["poolInfo"],
    queryFn: getPoolInfoData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!stakingContract && !!queryClient,
  });

  const totalLP = async () => {
    if (!stakingContract || !queryClient || !web3) return null;
    await getTotalLPToken({
      stakingContract,
      queryClient,
      web3,
    });
  };
  const { data: totalLPTokenAmount } = useQuery({
    queryKey: ["totalLPTokenAmount"],
    queryFn: totalLP,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!stakingContract && !!queryClient,
  });

  console.log("@@@@@@@", poolInfoData);
  console.log("@@@@@@@", totalLPTokenAmount);

  const userFn = async () => {
    if (!stakingContract || !queryClient || !user.account || !user.balance)
      return null;
    console.log("zzzzzzzzz", stakingContract, queryClient, user);
    return await getUserInfo({ stakingContract, queryClient, user });
  };

  const { data: getUserData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: userFn,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled:
      !!stakingContract && !!queryClient && !!user.account && !!user.balance,
  });

  useEffect(() => {
    console.log("유저 데이터", getUserData);
  }, [queryClient, stakingContract]);

  useEffect(() => {
    setStakeData(poolInfoData);
    setTotalLp(totalLPTokenAmount);
  }, [poolInfoData, totalLPTokenAmount]);

  useEffect(() => {
    if (stakeData && totalLp && getUserData) {
      const TokenData = [
        {
          tokenCA: stakeData.lpToken,
          stakeName: "Stake",
          stakeSymbol: "STK",
          stakeImg: `${ImgBaseUrl()}LPToken_Steake2.png`,
          totalStaked: Number(totalLp),
          your: Number(getUserData.amount) / 10 ** 18,
          endTime: Number(stakeData.stakingPoolEndTime),
          startTime: Number(stakeData.stakingPoolStartTime),
        },
      ];
      setTokenData(TokenData);
    }
  }, [getUserData, stakeData, totalLp]);

  const showMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <Container>
      <div className="flex flex-col items-center">
        <div className="text-baseWhite w-[85%] text-left mt-7 text-[35px] font-bold shadow-md:0px 4px 6px rgba(0, 0, 0, 0.25">
          Stake
        </div>
        {tokenData && (
          <Dashboard
            arr={tokenData.slice(0, visible)}
            url="stake"
            title={titles}
          />
        )}

        <div className="w-[85%] rounded-full hover:bg-opercityBlack text-baseWhite font-bold m-3 p-2 text-[18px] cursor-pointer flex justify-center items-center">
          {tokenData && visible < tokenData.length ? (
            <button onClick={showMore}>show more</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Stake;
