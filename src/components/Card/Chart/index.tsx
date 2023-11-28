import React from "react";
import { Divstyle } from "./Chart.style";
import AreaChart from "src/components/AreaChart";
const Chart = () => {
  return (
    <div className={`${Divstyle.chartBox}`}>
      Chart
      <AreaChart />
    </div>
  );
};

export default Chart;
