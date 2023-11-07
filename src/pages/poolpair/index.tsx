import Container from "src/components/container";
import AddRemoveLiquidity from "src/contents/Liquidity";
import DepositBalacne from "src/contents/poolpair/depositBalance";
import Liquidity from "src/contents/poolpair/liquidity";
import { Divstyle } from "./poolpair.styled";

const Poolpair: React.FC = () => {
  return (
    <div className={Divstyle.w_90}>
      <Container>
        <div className={Divstyle.flexRow}>
          <div className="flex flex-col items-center w-[100%]">
            <Liquidity />
            <DepositBalacne />
          </div>
          <AddRemoveLiquidity />
        </div>
      </Container>
    </div>
  );
};

export default Poolpair;
