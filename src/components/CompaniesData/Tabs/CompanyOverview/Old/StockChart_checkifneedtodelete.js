import React from "react";
import Chart from "react-apexcharts";

function StockChart(props) {
  const chartData = {
    options: {
      chart: {
        id: "area",
        type: "area",
        toolbar: false,
        sparkline: {
          enabled: true,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        title: {
          //   text: "10.21%",
        },
        type: "datetime",
        categories: props.xData,
        labels: {
          show: false,
          hideOverlappingLabels: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {},
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (
              value,
              { series, seriesIndex, dataPointIndex, w }
            ) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        name: "series1",
        data: props.yData,
      },
    ],
  };
  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width="120"
        height="70"
      />
    </div>
  );
}

export default StockChart;
