import React, { useEffect, useState } from "react";
import Card from "src/components/Card";
import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";
import { MyFee } from "src/Interface/Token.interface";
import { getTime } from "src/features/getTime";
import useWeb3 from "src/hooks/web3.hook";

const MyInfoCard: React.FC<{ data: string[] }> = ({ data }) => {
  const [myFee, setMyFee] = useState<MyFee | null>(null);

  const { web3 } = useWeb3(window.ethereum);

  const pendingBNCValue = web3?.utils.fromWei(BigInt(data[0]), "ether");
  console.log("pendingBNCValue", pendingBNCValue);

  const userBlockRewardPerBlock = web3?.utils.fromWei(BigInt(data[1]), "ether");
  console.log("userBlockRewardPerBlock", userBlockRewardPerBlock);

  const bonusFee = web3?.utils.fromWei(BigInt(data[2]), "ether");
  console.log("bonusFee", bonusFee);

  useEffect(() => {}, [pendingBNCValue, userBlockRewardPerBlock, bonusFee]);

  return (
    // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것!
    <div className=" min-w-[340px] pc:w-[85%] mobile:w-[85%] p-5 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center m-5 mt-16 shadow-md">
      {data && (
        <div className={Divstyles.flexCol}>
          <div className="flex pc:w-[85%] mobile:w-[90%] justify-between pc:items-center">
            <div className="pc:w-[30%]">
              <div className="text-lightBlack dark:text-baseWhite w-full text-left">
                Your tokens
              </div>

              <div className="text-deepGreen dark:text-lightGreen font-extrabold text-[30px] w-full text-left">
                {/* {myFee.token} */}
              </div>
            </div>
            <div>
              <div className="text-lightBlack dark:text-baseWhite text-right">
                Time of Initiation
              </div>
              <div className="text-deepBlack dark:text-lightBlack text-right font-semibold">
                {/* {getTime(myFee.time)} */}
              </div>
            </div>
          </div>
          <div className=" pc:w-[90%] mobile:w-[95%] p-5 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center m-5 shadow-md">
            <div className={Divstyles.flexCol}>
              <div className={`${Divstyles.flexRow}`}>
                <div className="pc:text-left mobile:text-right w-full text-lightBlack dark:text-baseWhite">
                  Total Fees
                </div>
                <div className="text-[28px] w-full text-deepGreen dark:text-lightGreen font-bold pc:text-right mobile:text-right">
                  {pendingBNCValue}
                </div>
              </div>
              <div className="w-full flex justify-between items-center mt-3 mobile:flex-col">
                <div className="min-w-[120px] pc:w-[95%] mobile:w-[95%] p-5 pb-3 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center shadow-md">
                  <div className=" text-left text-lightBlack dark:text-baseWhite">
                    Fee per Block
                  </div>
                  <div className="text-right text-deepGreen dark:text-lightGreen text-[23px] font-bold">
                    {userBlockRewardPerBlock}
                  </div>
                </div>
                <div className="font-extrabold text-[30px] mx-3 text-deepBlack">
                  +
                </div>
                <div className="min-w-[120px] pc:w-[95%] mobile:w-[95%] p-5 pb-3 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center shadow-md">
                  <div className="text-left text-lightBlack dark:text-baseWhite">Bonus Fee</div>
                  <div className="text-right text-deepGreen dark:text-lightGreen text-[23px] font-bold">
                    {bonusFee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInfoCard;
