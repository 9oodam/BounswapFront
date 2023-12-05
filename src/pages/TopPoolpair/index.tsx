import Container from "src/components/container";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import PoolDetail from "src/contents/poolpair/PoolDetail";
import DivCard from "../../components/Card";
import AreaChart from "src/components/AreaChart";
import Pairname from "../../components/Pairname";
import useWeb3 from "src/hooks/web3.hook";
import LoadingIndicator from "src/components/LoadingIndicator";
import { Divstyle } from "./poolpair.styled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEachPool } from "src/features/data/dataGetEachPool";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TopPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [poolIndex, setPoolIndex] = useState<number[]>();

  const getData = async () => {
    // * 풀의 유동성 배열을 반환함 pairLiquidityArr
    if (!pairContract || !dataContract || !id || user.account == "" || !web3) return null;
    const pool = await getEachPool({ pairContract, dataContract, queryClient, pairAddress: id, userAddress: user.account, web3 });
    return pool;
  }

  const { data: pool, refetch } = useQuery({
    queryKey: [`toppool_${id}`],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!pairContract || !dataContract || !web3 || !user)
  });

  useEffect(() => {
    if (!pool) return;

    let index = [];
    for (let i = 1; i <= pool?.pairLiquidityArr.length; i++) {
      index.push(i);
    }
    setPoolIndex(index);
  }, [pool]);


  if (!pool) {
    refetch();
    return <LoadingIndicator />
  }

  return (
    <>
      <Pairname data={pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DivCard>
              <CardTitle>Liquidity</CardTitle>
              {poolIndex ? (
                <AreaChart
                  data={pool.pairLiquidityArr}
                  index={poolIndex}
                  name={`${pool.token0Symbol} - ${pool.token1Symbol}`}
                />
              ) : (
                <></>
              )}
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