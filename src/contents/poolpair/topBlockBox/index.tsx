import DivCard from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import ChartDiv from "src/components/Card/Chart";
import Deposite from "../../../contents/Deposite";
import AddRemoveLiquidity from "src/contents/Liquidity";
import Container from "src/components/container";

const TopBlackBox = () => {
  return (
    <Container>
      <div className="flex items-start flex-row justify-center">
        <div>
          <DivCard>
            <CardTitle>Liquidity</CardTitle>
            <ChartDiv></ChartDiv>
          </DivCard>
          <DivCard>
            <CardTitle>Deposit Balance</CardTitle>
            <Deposite></Deposite>
          </DivCard>
        </div>
        <AddRemoveLiquidity />
      </div>
    </Container>
  );
};

export default TopBlackBox;
