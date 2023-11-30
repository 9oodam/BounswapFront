import React from "react";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Divstyle } from "./AreaChart.style";

const AreaChart = () => {
  // ! 보여줄 값 넣기
  const series = [{ name: "hohoho", data: [10, 2, 13, 30, 20] }];

  const option = {
    // theme: { mode: "dark" },
    chart: {
      height: "100%",
      width: "100%",
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: { curve: "smooth" as const, width: 3 },
    grid: { show: false },
    yaxis: { show: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      //! 인덱스 값 넣기
      categories: [1, 2, 3, 4, 5],
      type: "datetime" as const,
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#9CE084"],
        stops: [0, 100],
        opacityFrom: 1,
        opacityTo: 0,
      },
    },
    colors: ["#338415"],
    tooltip: {
      y: { formatter: (value: number) => `$ ${value.toFixed(2)}` },
    },
  };
  return (
    <div className={Divstyle.chartBox}>
      <ReactApexChart type="area" series={series} options={option} />
    </div>
  );
};

export default AreaChart;
