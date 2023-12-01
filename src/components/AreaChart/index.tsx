import React, { useEffect, useState } from "react";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Divstyle } from "./AreaChart.style";

const AreaChart: React.FC<{
  data: number[];
  index: number[];
  name: string;
}> = ({ data, index, name }) => {
  const [indexArr, setIndexArr] = useState<number[]>([]);

  // useEffect(() => {
  //   const index: number[] = [];
  //   for (let i = 1; i <= data.length; i++) {
  //     indexArr.push(i);
  //   }
  //   console.log("asdadasdasdaaaaa", indexArr);
  //   setIndexArr(index);
  // }, [data]);

  const series = [{ name: name, data: data }];

  const option = {
    // theme: { mode: "dark" },
    chart: {
      height: "100%",
      width: "100%",
      // toolbar: { show: false },
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
      // categories: index,
      range: 10,
      tickPlacement: "on",
      // type: "datetime" as const,
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
      // fillOpacity: 1,
      // discrete: [],
      shape: "circle" as const,
      // radius: 2,
      // offsetX: 0,
      // offsetY: 0,
      // onClick: undefined,
      // onDblClick: undefined,
      // showNullDataPoints: true,
      hover: {
        // size: undefined,
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
