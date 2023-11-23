import React from "react";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import CircleChart from "src/components/Card/CircleChart";

const DepositeCard = () => {
  return (
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
  );
};

export default DepositeCard;
