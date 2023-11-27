import React from "react";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";

const UnclaimedFeesCard = () => {
  return (
    <Card>
      <CardTitle>Unclaimed fees</CardTitle>
      <div className="flex mobile:flex-col">
        <div className=" flex flex-col pc:w-[40%] items-center pc:mt-3 mobile:mt-8 mobile:mb-10">
          <div className="font-bold text-[30px] w-full mobile:mb-5 ">$ {0.2357}</div>
          <div className="w-[90%] h-[50px] bg-lightGreen rounded-coinLogo pc:mt-7 text-xl font-bold text-white flex items-center justify-center hover:bg-[#548941] cursor-pointer shadow-md">
            collect fees
          </div>
        </div>
        <div className="pc:w-[60%] mobile:flex mobile:justify-center">
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UnclaimedFeesCard;
