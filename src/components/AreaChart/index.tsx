import React from "react";
import ReactApexChart from "react-apexcharts";
import { Divstyle } from "./AreaChart.style";

const AreaChart: React.FC<{
  data: number[];
  index: number[];
  name: string;
}> = ({ data, index, name }) => {
  const series = [{ name: name, data: data }];

  const option = {
    chart: {
      height: "100%",
      width: "100%",
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom" as const,
      },
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
      range: 10,
      tickPlacement: "on",
      type: "category" as const,
    },
    dataLabels: {
      enabled: false,
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
    markers: {
      size: 4,
      colors: "#338415",
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.8,
      shape: "circle" as const,
      hover: {
        sizeOffset: 2,
      },
    },
  };
  return (
    <div className={Divstyle.chartBox}>
      <ReactApexChart type="area" series={series} options={option} />
    </div>
  );
};

export default AreaChart;
