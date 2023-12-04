import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  StakeItem,
  DataArray,
  EarlyInfo,
  TokenArray,
  TotalToken,
  UserInfo,
} from "../../Interface/Token.interface";
import Container from "../../components/container";
import Card from "../../components/Card";
import { Divstyles } from "./StakeDetail.style";
import TokenName from "src/components/TokenName";
import { useNavigate } from "react-router-dom";
import VolumeCotainer from "src/contents/StakeDetail/VolumeCotainer";
import EarlyCard from "src/contents/StakeDetail/EarlyCard";
import { EarlyArray } from "../../Interface/Token.interface";
import StakeCard from "src/contents/StakeDetail/StakeCard";
import { getTime } from "src/features/getTime";
import MyInfoCard from "src/contents/StakeDetail/MyInfoCard";
import useWeb3 from "src/hooks/web3.hook";
import { getPoolInfo } from "src/features/staking/stakingGetPoolInfo";
import { getNinjaInfo } from "src/features/staking/stakingGetNinjaInfo";
import { getUserInfo } from "src/features/staking/stakingGetUserInfo";
import { myAllRewardInfo } from "src/features/staking/stakingGetMyAllRewardInfo";
import { getTotalLPToken } from "src/features/staking/stakingGetTotalLPToken";
import { myPendingRewardUpdate } from "src/features/staking/stakingGetPendingReward";
import { deposit } from "src/features/staking/stakingSendFeatures";
import {
  EmergencyData,
  EmergencyEventArr,
  StakingTotalAmountData,
} from "src/Interface/Ninja.interface";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const StakeDetail = () => {
  const { user, web3, stakingContract } = useWeb3(window.ethereum);
  const [lptokens, setLptokens] = useState<DataArray | null>(null);
  const [totalLpToken, setTotalLpToken] = useState<string | null | undefined>(
    null
  );
  const [poolInfo, setPoolInfo] = useState<TotalToken | null | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const [emergencies, setEmergencies] = useState<EmergencyEventArr>([]); // 탈주자 정보
  const [myAllreward, setMyAllreward] = useState<string[] | null>([]);
  const [stakingTotalAmount, setStakingTotalAmount] = useState<number[]>([]);
  const [action, setAction] = useState(false);

  // const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<DataArray>("lpTokens");

  const nav = useNavigate();

  const tokenData = {
    tokenName: "Stake",
    tokenSymbol: "STK",
    tokenUri: `${ImgBaseUrl()}LPToken_Steake2.png`,
  };
  console.log("tokenUri", tokenData.tokenUri);

  const getPoolInfoData = async () => {
    if (!stakingContract || !queryClient) return null;
    const PoolInfoData = await getPoolInfo({
      stakingContract,
      queryClient,
    });
  };

  // const {data:poolInfo, refetch} = useQuery<TotalToken | null>({
  //   queryKey: ["poolInfo"],
  //   queryFn: getPoolInfoData,
  //   gcTime: 0,
  //   staleTime: 0,
  //   refetchOnWindowFocus: "always",
  //   enabled: !!stakingContract && !!queryClient
  // })
  // setPoolInfo(poolInfoData)
  // console.log("@@@@@@@2", poolInfo)

  const { data: poolInfoData, refetch } = useQuery({
    queryKey: ["poolInfo"],
    queryFn: getPoolInfoData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !!stakingContract && !!queryClient,
  });
  // console.log("saaaaaaaaaaaaaaaaaaa", poolInfoData)
  const totalLP = async () => {
    if (!stakingContract || !queryClient || !web3) return null;
    const getTotalLPTokenData = await getTotalLPToken({
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
  console.log("totalLPTokenAmount", totalLPTokenAmount);

  useEffect(() => {
    setPoolInfo(poolInfoData);
    setTotalLpToken(totalLPTokenAmount);
  }, [stakingContract, poolInfoData, totalLPTokenAmount]);

  useEffect(() => {
    const fetchData = async () => {
      // * stake pool에 대한 정보
      const PoolInfoData = await getPoolInfo({
        stakingContract,
        queryClient,
      });
      // setPoolInfo(PoolInfoData);
      console.log("Fetched PoolInfo Data", PoolInfoData);

      // * 가장 최근에 떠난 탈주자의 값.
      // ! 탈주자에 대한 이벤트 구독 해야 함
      const NinjaInfoData = await getNinjaInfo({
        stakingContract,
        queryClient,
        user,
      });
      // console.log("Fetched NinjaInfo Data", NinjaInfoData);

      const UserInfoData = await getUserInfo({
        stakingContract,
        queryClient,
        user,
      });
      setUserInfo(UserInfoData);
      // console.log("Fetched UserInfo Data", UserInfoData);

      // * stake pool에 대한 total Token Amount
      const getTotalLPTokenData = await getTotalLPToken({
        stakingContract,
        queryClient,
        web3,
      });
      setTotalLpToken(getTotalLPTokenData);
      // console.log("Fetched getTotalLPToken Data", getTotalLPTokenData);

      const myAllRewardData = await myAllRewardInfo({
        stakingContract,
        queryClient,
        user,
      });
      // 3개 숫자가 정보없이 연속으로 반환됌 순서대로

      // 1. pendingBNCValue : 쌓인 리워드 갯수
      // 2. userBlockRewardPerBlockValue : 블록당 받는 리워드 갯수
      // 3. estimatedUserRewardFromNinjsVlaue : 탈주자가 남기고간 리워드 중 내 몫

      // console.log("Fetched myAllReward Data", myAllRewardData);
      // if (myAllRewardData) {
      //   setMyAllreward([
      //     myAllRewardData[0].toString(),
      //     myAllRewardData[1].toString(),
      //     myAllRewardData[2].toString(),
      //   ]);
      // }
      setMyAllreward(myAllRewardData);

      const myPendingRewardUpdateData = await myPendingRewardUpdate({
        stakingContract,
        queryClient,
        user,
      });
      // console.log(
      //   "Fetched myPendingRewardUpdate Data",
      //   myPendingRewardUpdateData
      // );
    };
    fetchData();
  }, [stakingContract, queryClient, user, action]);

  useEffect(() => {
    const NinjaEvent = async () => {
      try {
        const subscription = stakingContract?.events
          .NinjaLiftInfo({
            fromBlock: 0,
          })
          .on("data", (event) => {
            const emergencyData: EmergencyData = {
              ninja: event.returnValues._Ninja as string,
              totalLPToken: event.returnValues._totalLPToken as number,
              totalNinjaReward: event.returnValues._totalNinjaReward as number,
              stakingLeftTime: event.returnValues._stakingLeftTime as number,
              ninjaRewardRate: event.returnValues._ninjaRewardRate as number,
            };
            // 중복 확인
            if (!emergencies?.some((e) => e.ninja === emergencyData.ninja)) {
              // emergencies.push(emergencyData);
              setEmergencies((prev) => [...prev, emergencyData]);
            }
            // if (emergencyData) emergencies.push(emergencyData);
            // setEmergencies((prev) => [...prev, emergencyData]);
          });
        // .on("error", console.error);

        // return () => {
        //   if (subscription) {
        //     subscription.unsubscribe();
        //   }
        // };
      } catch (error) {
        // console.log(error);
      }
    };
    NinjaEvent();

    // console.log("탈주자", emergencies);
  }, [stakingContract]);

  useEffect(() => {
    let arr: number[] = [];
    // console.log("❌❌❌❌❌❌❌", stakingContract);
    // console.log("❌❌❌❌❌❌❌",stakingContract instanceof Promise)
    try {
      stakingContract?.events
        .StakingTotalAmount({
          fromBlock: 0,
        })
        .on("data", (event) => {
          const StakingTotalAmountData: StakingTotalAmountData = {
            account: event.returnValues.user as string,
            poolId: event.returnValues._pid as number,
            amount: event.returnValues.lpTokenBalances as number,
          };
          console.log("StakingTotalAmountData", StakingTotalAmountData);
          // if(!stakingTotalAmount?.some((e) => e.))
          // setStakingTotalAmount((prev) => [
          //   ...prev,
          //   StakingTotalAmountData.amount,
          // ]);
          arr.push(Number(StakingTotalAmountData.amount) / 10 ** 18);
        });
    } catch (error) {
      // console.log(error);
    }
    setStakingTotalAmount(arr);
    // console.log("🧡🧡🧡🧡🧡🧡🧡🧡", stakingTotalAmount);
  }, [stakingContract]);

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@", stakingTotalAmount);
  }, [stakingTotalAmount]);

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    const getLptokens = async () => {
      const data = await queryClient.getQueryData<UserInfo>(["userInfo"]);
      // console.log("❗️data", data?.amount);
      // setLptokens(data?.amount);
      // console.log("@@lptokens", lptokens);
    };
    getLptokens();
  }, [lptokens]);
  // console.log("LpTokens", data);

  return (
    <>
      <TokenName
        tokenImg={tokenData.tokenUri}
        tokenName={tokenData.tokenName}
        tokenSymbol={tokenData.tokenSymbol}
        onClick={() => {
          nav(-1);
        }}
      />
      <Container>
        <div className={Divstyles.flexRow}>
          <div className={Divstyles.flexCol}>
            {/* {totalLpToken && ( */}
            <VolumeCotainer
              totalvolum={Number(Number(totalLpToken).toFixed(5))}
              endTime={getTime(Number(poolInfo?.stakingPoolEndTime))}
              startTime={getTime(Number(poolInfo?.stakingPoolStartTime))}
              volumeChart={stakingTotalAmount}
            />
            {/* )} */}

            <div className="w-full mobile:hidden flex justify-center">
              {emergencies && <EarlyCard data={emergencies} />}
            </div>
            <div className="w-full pc:hidden flex justify-center">
              {myAllreward && <MyInfoCard data={myAllreward} />}
            </div>
          </div>
          <div className={Divstyles.flexCol}>
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            <StakeCard timestamp={Number(poolInfo?.stakingPoolEndTime)} action={action} setAction={setAction} />
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            <div className="w-full mobile:hidden flex justify-center">
              {myAllreward && <MyInfoCard data={myAllreward} />}
            </div>
            <div className="pc:hidden w-full flex justify-center">
              {emergencies && <EarlyCard data={emergencies} />}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StakeDetail;
