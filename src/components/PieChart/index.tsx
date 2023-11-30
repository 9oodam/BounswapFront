import React from "react";
import ReactApexChart from "react-apexcharts";
import { DepositeChart } from "src/Interface/Token.interface";

const PieChart: React.FC<DepositeChart> = ({
  token0Symbol,
  token0percent,
  token1Symbol,
  token1percent,
}) => {
  // ! 보여줄 값 넣기
  const series = [Number(token0percent), Number(token1percent)];

  const option = {
    // theme: { mode: "dark" },
    chart: {
      width: "100%",
    },
    labels: [token0Symbol, token1Symbol],
    dataLabels: { enabled: false },
    legend: {
      show: false,
    },
    colors: ["#34c200", "#9CE084"],
  };
  return (
    <div className="aspect-[1/1] flex items-center justify-center">
      <ReactApexChart type="pie" series={series} options={option} />
    </div>
  );
};

export default PieChart;
