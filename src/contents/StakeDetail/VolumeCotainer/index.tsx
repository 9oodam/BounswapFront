import React, { useEffect, useState } from "react";
import Card from "src/components/Card";
import AreaChart from "src/components/AreaChart";
import { Divstyles } from "./VolumeCard.style";
import { TotalVolNTime } from "src/Interface/Token.interface";
import VolumeCard from "./VolumeCard";
const VolumeCotainer: React.FC<TotalVolNTime> = ({
  totalvolum,
  endTime,
  startTime,
  volumeChart,
}) => {
  const [indexArr, setIndexArr] = useState<number[]>([]);
  useEffect(() => {
    let Arr: number[] = [];
    for (let i = 1; i <= volumeChart.length; i++) {
      Arr.push(i);
    }
    setIndexArr(Arr);
  }, [volumeChart.length]);
  useEffect(() => {
    console.log("ooooooooooooo", indexArr);
  }, [indexArr]);
  return (
    <Card>
      <div className={Divstyles.flexCol}>
        <div className="w-full flex justify-between mobile:flex-col">
          <VolumeCard title="Total Staked" value={totalvolum} />
          <div className="pc:m-5 mobile:mt-5 pc:p-5 mobile:pr-5 items-end flex flex-col justify-end text-deepBlack dark:text-baseWhite">
            <div className="mobile:hidden">Staking Period</div>
            <div className="font-bold">
              {startTime} ~ {endTime}
            </div>
          </div>
        </div>

        <AreaChart data={volumeChart} index={indexArr} name="STK" />
      </div>
    </Card>
  );
};

export default VolumeCotainer;
