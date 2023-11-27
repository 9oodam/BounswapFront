import React, { useEffect, useState } from "react";
import Card from "src/components/Card";
import { Divstyles } from "src/pages/StakeDetail/StakeDetail.style";
import { MyFee } from "src/Interface/Token.interface";
import { getTime } from "src/features/getTime";

const MyInfoCard = () => {
  const [myFee, setMyFee] = useState<MyFee | null>(null);

  useEffect(() => {
    const data = {
      token: 1234,
      time: 1700191602,
      totalfee: 2.344,
      dailyfee: 0.213,
      earlyfee: 0.023,
    };
    setMyFee(data);
  }, []);

  return (
    // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것!
    <div className=" min-w-[340px] pc:w-[85%] mobile:w-[85%] p-5 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center m-5 mt-16 shadow-md">
      {myFee && (
        <div className={Divstyles.flexCol}>
          <div className="flex pc:w-[85%] mobile:w-[90%] justify-between pc:items-center">
            <div className="pc:w-[30%]">
              <div className="text-lightBlack w-full text-left">
                Your tokens
              </div>

              <div className="text-deepGreen font-extrabold text-[30px] w-full text-left">
                {myFee.token}
              </div>
            </div>
            <div>
              <div className="text-lightBlack text-right">
                Time of Initiation
              </div>
              <div className="text-deepBlack text-right font-semibold">
                {getTime(myFee.time)}
              </div>
            </div>
          </div>
          <div className=" pc:w-[90%] mobile:w-[95%] p-5 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center m-5 shadow-md">
            <div className={Divstyles.flexCol}>
              <div className={`${Divstyles.flexRow}`}>
                <div className="pc:text-left mobile:text-right w-full text-lightBlack">
                  Total Fees
                </div>
                <div className="text-[28px] w-full text-deepGreen font-bold pc:text-right mobile:text-right">
                  {myFee.totalfee}
                </div>
              </div>
              <div className="w-full flex justify-between items-center mt-3 mobile:flex-col">
                <div className="min-w-[120px] pc:w-[95%] mobile:w-[95%] p-5 pb-3 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center shadow-md">
                  <div className=" text-left text-lightBlack">
                    Fee per Block
                  </div>
                  <div className="text-right text-deepGreen text-[23px] font-bold">
                    {myFee.dailyfee}
                  </div>
                </div>
                <div className="font-extrabold text-[30px] mx-3 text-deepBlack">
                  +
                </div>
                <div className="min-w-[120px] pc:w-[95%] mobile:w-[95%] p-5 pb-3 moblie:mt-3 bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius items-center shadow-md">
                  <div className="text-left text-lightBlack">Bonus Fee</div>
                  <div className="text-right text-deepGreen text-[23px] font-bold">
                    {myFee.earlyfee}
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
