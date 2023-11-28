import React from "react";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

const AreaChart = () => {
  const series = [{ name: "hohoho", data: [10, 2, 13, 30, 20] }];

  const option = {
    // theme: { mode: "dark" },
    chart: {
      height: 300,
      width: 500,
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: { curve: "smooth" as const, width: 4 },
    grid: { show: false },
    yaxis: { show: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [1, 2, 3, 4, 5],
      type: "datetime" as const,
    },
    fill: {
      type: "gradient",
      gradient: { gradientToColors: ["blue"], stops: [0, 100] },
    },
    colors: ["red"],
    tooltip: {
      y: { formatter: (value: number) => `$ ${value.toFixed(2)}` },
    },
  };
  return (
    <div>
      <ReactApexChart type="area" series={series} options={option} />
    </div>
  );
};

export default AreaChart;
