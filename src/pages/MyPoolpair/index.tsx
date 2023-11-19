import Container from "src/components/container";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import Card from "../../components/Card";
import CircleChart from "../../components/Card/CircleChart";
import Pairname from "../../components/Pairname";

const MyPoolpair: React.FC = () => {
  return (
    // <div className={Divstyle.w_90}>
    <>
      <Pairname />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <Card>
              <CardTitle>Deposite</CardTitle>
              <div className="flex mt-5">
                <CircleChart />
                <div className="w-[60%]">
                  <div className=" pl-5 text-left font-bold text-[30px] w-full mb-12 ">
                    $ {1234567}
                  </div>
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
                        <div className="flex items-center text-deepBlack">
                          <div className="mr-3">0.9457</div>
                          <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px]">
                            {50} %
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-deepBlack">
                          <img
                            src="https://i.pinimg.com/564x/d2/4b/37/d24b37e0823cd08001cfd4dc728c0d54.jpg"
                            className="w-[30px] rounded-full mr-3"
                          />
                          <div>USDT</div>
                        </div>
                        <div className="flex items-center text-deepBlack">
                          <div className="mr-3">12.23</div>
                          <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px]">
                            {50} %
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
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
