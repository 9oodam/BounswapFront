import React from "react";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import CircleChart from "src/components/Card/CircleChart";

const DepositeCard = () => {
  return (
    <Card>
      <CardTitle>Deposite</CardTitle>
      <div className="flex mt-5 mobile:flex-col items-center">
        <div className=" pc:w-[40%] mobile:w-[80%] ">
          <CircleChart />
        </div>
        <div className="pc:w-[60%] mobile:w-[100%] flex flex-col items-center ">
          <div className=" pc:pl-5 pc:mb-12 mobile:mt-10 text-left font-bold text-[30px] pc:w-full mobile:w-[85%] text-deepBlack">
            $ {1234567}
          </div>
          <div className="pc:w-[85%] mobile:w-[85%] p-5 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center pc:m-5 mobile:mt-3 shadow-md ">
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
                  <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px] header:hidden">
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
                  <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px] header:hidden">
                    {50} %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DepositeCard;
