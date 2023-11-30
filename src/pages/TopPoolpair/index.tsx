import Container from "src/components/container";
// import DepositBalacne from "src/contents/poolpair/depositBalance";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
// import Liquidity from "src/contents/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import PoolDetail from "src/contents/poolpair/PoolDetail";
import DivCard from "../../components/Card";
import ChartDiv from "../../components/Card/Chart";
import Pairname from "../../components/Pairname";
import useWeb3 from "src/hooks/web3.hook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEachPool } from "src/features/data/dataGetEachPool";
import { PairItem } from "src/Interface/Token.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TopPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  // const [pool, setPool] = useState<PairItem>();
  const queryClient = useQueryClient();

  // useEffect(()=>{
  //   if (!pairContract || !dataContract || !id || user.account == "" || !web3) return;
  //   const getData = async () => {
  //     const pool = await getEachPool({pairContract, dataContract, pairAddress: id, userAddress: user.account, web3});
  //     console.log("pool 테스트",pool);
  //     setPool(pool);
  //   }
  //   if (!pool) {
  //     getData();
  //   }
  // },[dataContract, user, pool])

  
  const getData = async () => {
    if (!pairContract || !dataContract || !id || user.account == "" || !web3) return null;
    const pool = await getEachPool({pairContract, dataContract, queryClient, pairAddress: id, userAddress: user.account, web3});
    return pool;
  }

  const { data : pool, refetch } = useQuery({
    queryKey : [`toppool_${id}`],
    queryFn : getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!pairContract|| !dataContract || !web3 || !user)
  });


  if (!pool) {
    refetch();
    return <>loading</>
  }

  return (
    // <div className={Divstyle.w_90}>
    <>
      <Pairname data={pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DivCard>
              <CardTitle>Liquidity</CardTitle>
              <ChartDiv></ChartDiv>
            </DivCard>
            <DivCard>
              <CardTitle>Pool Details</CardTitle>
              <PoolDetail data={pool}></PoolDetail>
            </DivCard>
          </div>
          <AddRemoveLiquidity data={pool} refetch={refetch} />
        </div>
      </Container>
    </>
  );
};

export default TopPoolpair;
