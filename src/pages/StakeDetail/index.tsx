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

const StakeDetail = () => {
  const { user, stakingContract, LPTokenContract, wbncContract } = useWeb3(
    window.ethereum
  );
  const [lptokens, setLptokens] = useState<DataArray | null>(null);
  const [selectToken, setSelectTokens] = useState<StakeItem | null>(null);
  const [withdrawal, setWithdrawal] = useState<EarlyArray | null>(null);
  const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<DataArray>("lpTokens");

  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const PoolInfoData = await getPoolInfo({
        stakingContract,
        queryClient,
      });
      console.log("Fetched PoolInfo Data", PoolInfoData);

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
      console.log("Fetched UserInfo Data", UserInfoData);
      const getTotalLPTokenData = await getTotalLPToken({
        stakingContract,
        queryClient,
      });
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
    };
    fetchData();
  }, [stakingContract, queryClient, user]);

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
            {selectToken && (
              <VolumeCotainer
                totalvolum={selectToken?.totalStaked}
                endTime={getTime(selectToken.endTime)}
                startTime={getTime(selectToken.startTime)}
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
