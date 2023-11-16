import React from "react";
import Card from "src/components/Card";
import Chart from "src/components/Card/Chart";
import { Divstyles } from "./VolumeCard.style";
import { TotalVolNTime } from "src/Interface/Token.interface";
import VolumeCard from "./VolumeCard";
const VolumeCotainer: React.FC<TotalVolNTime> = ({
  totalvolum,
  endTime,
  startTime,
}) => {
  return (
    <Card>
      <div className={Divstyles.flexCol}>
        <div className="border-2 w-full flex justify-between">
          <VolumeCard title="Total Staked" value={totalvolum} />
          <div className="m-5 p-5 items-end flex flex-col justify-end text-deepBlack">
            <div>Staking Period</div>
            <div className="font-bold">
              {endTime} ~ {startTime}
            </div>
          </div>
        </div>

        <Chart />
      </div>
    </Card>
  );
};

export default VolumeCotainer;
