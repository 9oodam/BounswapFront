import React from "react";
import Card from "src/components/Card";
import Chart from "src/components/Card/Chart";
import { Divstyles } from "./VolumeCard.style";
import VolumeCard from "./VolumeCard";
const VolumeCotainer = () => {
  return (
    <Card>
      <div className={Divstyles.flexCol}>
          <VolumeCard title="Total Staked" value={123123123} />
        <Chart />
      </div>
    </Card>
  );
};

export default VolumeCotainer;
