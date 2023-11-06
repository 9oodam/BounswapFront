import Container from "src/components/container";
import AddRemoveLiquidity from "src/contents/Liquidity";
import DepositBalacne from "src/contents/apool/depositBalance";
import Liquidity from "src/contents/apool/liquidity";

const Apool: React.FC = () => {
  return (
    <>
      <Container>
        <div className="flex items-start flex-row justify-center">
          <div>
            <Liquidity />
            <DepositBalacne />
          </div>
          <AddRemoveLiquidity />
        </div>
      </Container>
    </>
  );
};

export default Apool;
