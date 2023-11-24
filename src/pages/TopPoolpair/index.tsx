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

const TopPoolpair: React.FC = () => {

  return (
    // <div className={Divstyle.w_90}>
    <>
      <Pairname />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DivCard>
              <CardTitle>Liquidity</CardTitle>
              <ChartDiv></ChartDiv>
            </DivCard>
            <DivCard>
              <CardTitle>Pool Details</CardTitle>
              <PoolDetail></PoolDetail>
            </DivCard>
          </div>
          <AddRemoveLiquidity token0="ETH" token1="USDT" />
        </div>
      </Container>
    </>
  );
};

export default TopPoolpair;
