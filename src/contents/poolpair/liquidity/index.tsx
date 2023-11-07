import DivCard from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import ChartDiv from "src/components/Card/Chart";

const Liquidity: React.FC = () => {
  return (
    <>
      <DivCard>
        <CardTitle>Liquidity</CardTitle>
        <ChartDiv></ChartDiv>
      </DivCard>
    </>
  );
};

export default Liquidity;
