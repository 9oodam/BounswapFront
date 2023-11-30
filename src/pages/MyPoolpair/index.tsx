import Container from "src/components/container";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import Card from "../../components/Card";
import Pairname from "../../components/Pairname";
import DepositeCard from "src/contents/poolpair/DepositeCard";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  DataArray,
  UnclaimedFeeData,
  UserLiquidity,
} from "src/Interface/Token.interface";
import useWeb3 from "src/hooks/web3.hook";
import { useParams } from "react-router-dom";
import { PairItem } from "src/Interface/Token.interface";
import { getEachPool } from "src/features/data/dataGetEachPool";
import UnclaimedFeesCard from "src/contents/poolpair/UnclaimedFeesCard";
import { getUnclaimedFee } from "src/features/data/dataGetUnclaimedFee";
import { poolGetUserLiquidity } from "src/features/pair/pairpoolGetUserLiquidity";

const MyPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const getData = async () => {
    if (!pairContract|| !dataContract || !id || user.account == "" || !web3) return null;
    const pool = await getEachPool({pairContract, dataContract, queryClient, pairAddress: id, userAddress: user.account, web3});
    const fee = await getUnclaimedFee({dataContract, userAddress : user.account, pairAddress : id, web3});
    const userLiquidity = await poolGetUserLiquidity({pairContract, userAddress : user.account, pairAddress: id, web3});
    const mypool = {pool, fee, userLiquidity};
    queryClient.setQueryData([`mypool_${id}`], mypool);
    return mypool;
  };
  
  const { data, refetch } = useQuery({
    queryKey : [`mypool_${id}`],
    queryFn : getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!pairContract|| !dataContract || !web3 || !user)
  });

  if (!data || !pairContract || !user) {
    refetch();
    return <>loading</>;
  } 

  return (
    <>
      <Pairname data={data.pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DepositeCard pool={data.pool} userLiquidity={data.userLiquidity}/>
            <UnclaimedFeesCard pairCon={pairContract} user={user.account} pool={data.pool} fee={data.fee} refetch={refetch} />
          </div>
          <AddRemoveLiquidity data={data.pool} refetch = {refetch} />
        </div>
      </Container>
    </>
  );
};

export default MyPoolpair;