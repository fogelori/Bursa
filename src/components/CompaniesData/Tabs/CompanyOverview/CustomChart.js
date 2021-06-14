/*
inspired from:
http://shreyu-react.coderthemes.com/dashboard


*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chart from "react-apexcharts";
import CountUp from "react-countup";
import Box from "@material-ui/core/Box";
import AutoTrendingIconDirection from "../../../../icons/AutoTrendingIconDirection";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3),
    display: "flex",
  },
  leftSide: {
    paddingRight: theme.spacing(1),
  },
}));

function CustomChart(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const percentChange =
    (props.chartData.yData[0] /
      props.chartData.yData[props.chartData.yData.length - 1] -
      1) *
    100;
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
        title: {},
        type: "datetime",
        categories: props.chartData.xData,
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
        enabled: false,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        onDatasetHover: {
          highlightDataSeries: false,
        },
        x: {
          show: false,
          //   format: "dd MMM",
          //   formatter: undefined,
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
        data: props.chartData.yData,
      },
    ],
  };

  return (
    <Box className={classes.root}>
      {/* <div className={classes.leftSide}>
        <Typography
          variant="h4"
          component="h6"
          // className={classes.tableHeaderInsideCell}
        >
          <CountUp
            start={0}
            end={85}
            duration={4}
            deplay={2}
            separator=""
            decimals={0}
            decimal="."
          />
          $
        </Typography>
      </div> */}
      <div className="rightSide">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          // width="80"
          height="40"
        />
        <div
          className="bottom"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <AutoTrendingIconDirection number={percentChange} />
          <Typography variant="body2" component="p">
            <CountUp
              start={0}
              end={percentChange}
              duration={3}
              deplay={2}
              separator=""
              decimals={1}
              decimal="."
            />
            %
          </Typography>
        </div>
        <Typography variant="body2" component="p" align="center">
          {t(
            "navBar.companiesData.tabs.dashboard.securities.changeDescription"
          )}
        </Typography>
      </div>
    </Box>
  );
}

export default CustomChart;
