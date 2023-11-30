import React, { useEffect } from "react";
import { PairItem, UnclaimedFeeData } from "src/Interface/Token.interface";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";
import { claimFee } from "src/features/pair/poolSendFeatures";
import useWeb3 from "src/hooks/web3.hook";
import Contract from "web3-eth-contract";

const UnclaimedFeesCard: React.FC<{
  pairCon: Contract<any>;
  user: string;
  pool: PairItem;
  fee: UnclaimedFeeData;
}> = ({ pairCon, user, pool, fee }) => {

  const tryClaimFee = async () => {
    const data = claimFee(
      pairCon, pool.pairAddress, user
    )
    console.log(tryClaimFee);
  }

  return (
    <Card>
      <CardTitle>Unclaimed fees</CardTitle>
      <div className="flex mobile:flex-col">
        <div className=" flex flex-col pc:w-[40%] items-center pc:mt-3 mobile:mt-8 mobile:mb-10">
          {/* <div className="font-bold text-[30px] w-full mobile:mb-5 ">$ 맞는지 확인 {fee.token0FeeAmount + fee.token1FeeAmount}</div> */}
          <div
          onClick={() => {tryClaimFee()}}
          className="w-[90%] h-[50px] bg-lightGreen rounded-coinLogo pc:mt-7 text-xl font-bold text-white flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md">
            collect fees
          </div>
        </div>
        <div className="pc:w-[60%] mobile:flex mobile:justify-center">
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
                <div className="mr-3 text-deepBlack">{fee.token0FeeAmount}</div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-deepBlack">
                  <img
                    src={pool.token1Uri}
                    className="w-[30px] rounded-full mr-3"
                  />
                  <div>{pool.token1Symbol}</div>
                </div>
                <div className="mr-3 text-deepBlack">{fee.token1FeeAmount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UnclaimedFeesCard;
