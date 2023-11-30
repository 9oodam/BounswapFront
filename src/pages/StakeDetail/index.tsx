import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  StakeItem,
  DataArray,
  EarlyInfo,
  TokenArray,
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

interface totalToken {
  lpToken: string;
  allocPoint: string;
  lastRewardBlock: string;
  accBNCPerShare: string;
  stakingPoolEndTime: string;
  stakingPoolStartTime: string;
}

interface userInfo {
  amount: string;
  exactRewardCal: string;
  pendingReward: string;
  stakingStartTime: string;
}

const StakeDetail = () => {
  const { user, web3, stakingContract, LPTokenContract, wbncContract } =
    useWeb3(window.ethereum);
  const [lptokens, setLptokens] = useState<DataArray | null>(null);
  const [selectToken, setSelectTokens] = useState<StakeItem | null>(null);
  const [withdrawal, setWithdrawal] = useState<EarlyArray | null>(null);
  const [totalLpToken, setTotalLpToken] = useState<string | null | undefined>(
    null
  );
  const [poolInfo, setPoolInfo] = useState<totalToken | null>();
  const [userInfo, setUserInfo] = useState<userInfo | null>();

  const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<DataArray>("lpTokens");

  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // * stake pool에 대한 정보
      const PoolInfoData = await getPoolInfo({
        stakingContract,
        queryClient,
      });
      setPoolInfo(PoolInfoData);
      console.log("Fetched PoolInfo Data", PoolInfoData);

      // * 가장 최근에 떠난 탈주자의 값.
      // ! 탈주자에 대한 이벤트 구독 해야 함
      const NinjaInfoData = await getNinjaInfo({
        stakingContract,
        queryClient,
        user,
      });
      console.log("Fetched NinjaInfo Data", NinjaInfoData);

      const UserInfoData = await getUserInfo({
        stakingContract,
        queryClient,
        user,
      });
      setUserInfo(UserInfoData);
      console.log("Fetched UserInfo Data", UserInfoData);

      // * stake pool에 대한 total Token Amount
      const getTotalLPTokenData = await getTotalLPToken({
        stakingContract,
        queryClient,
        web3,
      });
      setTotalLpToken(getTotalLPTokenData);
      console.log("Fetched getTotalLPToken Data", getTotalLPTokenData);

      const myAllRewardData = await myAllRewardInfo({
        stakingContract,
        queryClient,
        user,
      });
      // 3개 숫자가 정보없이 연속으로 반환됌 순서대로

      // 1. pendingBNCValue : 쌓인 리워드 갯수
      // 2. userBlockRewardPerBlockValue : 블록당 받는 리워드 갯수
      // 3. estimatedUserRewardFromNinjsVlaue : 탈주자가 남기고간 리워드 중 내 몫

      console.log("Fetched myAllReward Data", myAllRewardData);

      const myPendingRewardUpdateData = await myPendingRewardUpdate({
        stakingContract,
        queryClient,
        user,
      });
      console.log(
        "Fetched myPendingRewardUpdate Data",
        myPendingRewardUpdateData
      );

      // const getNinjaLeftEvent1 = await getNinjaLeftEvent({
      //   stakingContract
      // })
      // console.log("getNinjaLeftEvent",getNinjaLeftEvent1);
    };
    fetchData();
  }, [stakingContract, queryClient, user]);

  useEffect(() => {
    const NinjaEvent = async () => {
      try {
        const subscription = stakingContract?.events
          .NinjaLiftInfo({
            fromBlock: 0,
          })
          .on("data", (event) => {
            const emergencyData:EmergencyData= {
              ninja: event.returnValues._Ninja as string,
              totalLPToken: event.returnValues._totalLPToken as number,
              totalNinjaReward: event.returnValues._totalNinjaReward as number,
              stakingLeftTime: event.returnValues._stakingLeftTime as number,
              ninjaRewardRate: event.returnValues._ninjaRewardRate as number,
            };

            if(emergencyData) emergencies.push(emergencyData);
            setEmergencies((prev) => [...prev, emergencyData]);
          })
        // .on("error", console.error);

        // return () => {
        //   if (subscription) {
        //     subscription.unsubscribe();
        //   }
        // };
      } catch (error) {
        console.log(error);
      }
    };
    NinjaEvent();

    console.log('탈주자', emergencies);

  }, [stakingContract]);
  // event NinjaLiftInfo(address _Ninja, uint256 _totalLPToken, uint256 _totalNinjaReward, uint256 _stakingLeftTime, uint256 _ninjaRewardRate); /// @dev 탈주자의 주소, 가져간 총LP수량, 쌓고 떠난 리워드, 시간, LP당 쌓은 비율 기록
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    const getLptokens = async () => {
      const data = await queryClient.getQueryData<DataArray>(["lpTokens"]);
      // console.log("❗️data", data);
      setLptokens(data ? data : null);
      console.log("@@lptokens", lptokens);
    };
    getLptokens();
  }, [lptokens]);
  // console.log("LpTokens", data);

  // console.log("params", params.id);
  useEffect(() => {
    if (lptokens) {
      const find = async () => {
        const select = await lptokens.find((el: StakeItem) => {
          // console.log("el", el);
          return el.tokenCA == params.id;
        });
        // console.log("선택", select);
        setSelectTokens(select ? select : null);
        console.log("⭐️⭐️⭐️selectToken", selectToken);
      };
      find();
    }
  }, [lptokens, params.id, selectToken]);

  useEffect(() => {
    // ! Early 더미 값. 나중에 정보 받아오면 지우자!
    const EarlyData = [
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 34,
        reword: 0.034,
        time: 1700123200,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 1,
        reword: 0.001,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.stakeSymbol || "",
      },
    ];
    if (EarlyData) {
      const editData = EarlyData.map((el, index) => {
        const date = getTime(el.time);

        return {
          LPtoken: el.LPtoken,
          reword: el.reword,
          time: date,
          symbol: el.symbol,
        };
      });
      console.log("???????", editData);
      setWithdrawal(editData);
    }
  }, [selectToken]);

  return (
    <>
      {selectToken && (
        <TokenName
          tokenImg={selectToken.stakeImg}
          tokenName={selectToken.stakeName}
          tokenSymbol={selectToken.stakeSymbol}
          onClick={() => {
            console.log("click????");
            nav(-1);
          }}
        />
      )}
      <Container>
        <div className={Divstyles.flexRow}>
          <div className={Divstyles.flexCol}>
            {totalLpToken && selectToken && (
              <VolumeCotainer
                totalvolum={totalLpToken}
                endTime={getTime(Number(poolInfo?.stakingPoolEndTime))}
                startTime={getTime(Number(poolInfo?.stakingPoolStartTime))}
              />
            )}

            <div className="w-full mobile:hidden flex justify-center">
              {withdrawal && <EarlyCard data={withdrawal} />}
            </div>
            <div className="w-full pc:hidden flex justify-center">
              <MyInfoCard />
            </div>
          </div>
          <div className={Divstyles.flexCol}>
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            {selectToken && <StakeCard timestamp={selectToken.endTime} />}
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            <div className="w-full mobile:hidden flex justify-center">
              <MyInfoCard />
            </div>
            <div className="pc:hidden w-full flex justify-center">
              {withdrawal && <EarlyCard data={withdrawal} />}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StakeDetail;
