import React, { useEffect, useState } from "react";
import { PairItem, UserLiquidity } from "src/Interface/Token.interface";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import CircleChart from "src/components/Card/CircleChart";

const DepositeCard:React.FC<{pool : PairItem, userLiquidity : UserLiquidity}> = ({pool, userLiquidity}) => {

  return (
    <Card>
      <CardTitle>Deposite</CardTitle>
      <div className="flex mt-5 mobile:flex-col items-center">
        <div className=" pc:w-[40%] mobile:w-[80%] ">
          <CircleChart />
        </div>
        <div className="pc:w-[60%] mobile:w-[100%] flex flex-col items-center ">
          <div className=" pc:pl-5 pc:mb-12 mobile:mt-10 text-left font-bold text-[30px] pc:w-full mobile:w-[85%] text-deepBlack">
            $ 맞는지 확인 부탁 {userLiquidity.token0Liquidity + userLiquidity.token1Liquidity}
          </div>
          <div className="pc:w-[85%] mobile:w-[85%] p-5 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center pc:m-5 mobile:mt-3 shadow-md ">
            <div className="flex flex-col">
              <div className="flex justify-between mb-4">
                <div className="flex items-center text-deepBlack">
                  <img
                    src={pool.token0Uri}
                    className="w-[30px] rounded-full mr-3"
                  />
                  <div>{pool.token0Symbol}</div>
                </div>
                <div className="flex items-center text-deepBlack">
                  <div className="mr-3">{userLiquidity.token0Liquidity}</div>
                  <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px] header:hidden">
                    {userLiquidity.token0Liquidity + userLiquidity.token1Liquidity!=0 ? userLiquidity.token0Liquidity / (userLiquidity.token0Liquidity + userLiquidity.token1Liquidity) * 100 : 0} %
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-deepBlack">
                  <img
                    src={pool.token1Uri}
                    className="w-[30px] rounded-full mr-3"
                  />
                  <div>{pool.token1Symbol}</div>
                </div> 
                <div className="flex items-center text-deepBlack">
                  <div className="mr-3">{userLiquidity.token1Liquidity}</div>
                  <div className="bg-lightBlack rounded-lg text-baseWhite text-center p-1 text-[13px] header:hidden">
                    {userLiquidity.token0Liquidity + userLiquidity.token1Liquidity!=0 ? userLiquidity.token0Liquidity / (userLiquidity.token0Liquidity + userLiquidity.token1Liquidity) * 100 : 0} %
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
