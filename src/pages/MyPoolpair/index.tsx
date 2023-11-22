import Container from "src/components/container";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import Card from "../../components/Card";
import CircleChart from "../../components/Card/CircleChart";
import Pairname from "../../components/Pairname";
import DepositeCard from "src/contents/poolpair/DepositeCard";
import { useQueryClient } from "react-query";

const MyPoolpair: React.FC = () => {
  const queryClient = useQueryClient();
  const pairs = queryClient.getQueryData("tokens");
  console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", pairs);
  return (
    // <div className={Divstyle.w_90}>
    <>
      <Pairname />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DepositeCard></DepositeCard>
            <Card>
              <CardTitle>Unclaimed fees</CardTitle>
              <div className="border-2 flex">
                <div className="border-2 flex flex-col w-[40%] items-center">
                  <div className="font-bold text-[30px] w-full mb-5 ">
                    $ {0.2357}
                  </div>
                  <div className="w-[90%] h-[50px] bg-lightGreen rounded-coinLogo mt-10 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md">
                    collect fees
                  </div>
                </div>
                <div className="border-2 w-[60%]">
                  <Card>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center text-deepBlack">
                          <img
                            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
                            className="w-[30px] rounded-full mr-3"
                          />
                          <div>ETH</div>
                        </div>
                        <div className="mr-3 text-deepBlack">0.0057</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-deepBlack">
                          <img
                            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
                            className="w-[30px] rounded-full mr-3"
                          />
                          <div>USDT</div>
                        </div>
                        <div className="mr-3 text-deepBlack">0.23</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <AddRemoveLiquidity />
        </div>
      </Container>
    </>
  );
};

export default MyPoolpair;
