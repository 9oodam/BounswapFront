import Container from "src/components/container";
// import DepositBalacne from "src/contents/poolpair/depositBalance";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
// import Liquidity from "src/contents/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import PoolDetail from "src/contents/poolpair/PoolDetail";
import DivCard from "../../components/Card";
import AreaChart from "src/components/AreaChart";
import Pairname from "../../components/Pairname";
import useWeb3 from "src/hooks/web3.hook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEachPool } from "src/features/data/dataGetEachPool";
import { PairItem } from "src/Interface/Token.interface";
import LoadingIndicator from "src/components/LoadingIndicator";

const TopPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const [pool, setPool] = useState<PairItem>();
  const [poolIndex, setPoolIndex] = useState<number[]>();

  useEffect(() => {
    if (!pairContract || !dataContract || !id || user.account == "" || !web3)
      return;
    const getData = async () => {
      // * 풀의 유동성 배열을 반환함 pairLiquidityArr
      const pool = await getEachPool({
        pairContract,
        dataContract,
        pairAddress: id,
        userAddress: user.account,
        web3,
      });
      console.log("pool 테스트", pool);
      setPool(pool);

      let index = [];
      for (let i = 1; i <= pool?.pairLiquidityArr.length; i++) {
        index.push(i);
      }
      console.log("index", index);
      setPoolIndex(index);
    };
    getData();
  }, [dataContract, user]);

  if (!pool) {
    return <LoadingIndicator/>;
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
          <AddRemoveLiquidity data={pool} />
        </div>
      </Container>
    </>
  );
};

export default TopPoolpair;
