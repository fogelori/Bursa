/*
inspired from:
http://shreyu-react.coderthemes.com/dashboard


*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Chart from "react-apexcharts";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
  },
  leftSide: {
    paddingRight: theme.spacing(1),
  },
}));

function ChartCard() {
  const classes = useStyles();
  const chartData = {
    options: {
      chart: {
        id: "area",
        type: "area",
        toolbar: false,
        sparkline: {
          enabled: true,
        },
        // height: 800,
        // stacked: true,
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
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:30:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z",
          "2018-09-19T10:30:00.000Z",
        ],
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
        crosshairs: {
          //   show: false,
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
        enabled: true,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        // fillSeriesColor: true,
        // theme: true,
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
        // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        //   return (
        //     '<div class="arrow_box">' +
        //     "<span>" +
        //     w.globals.labels[dataPointIndex] +
        //     ": " +
        //     series[seriesIndex][dataPointIndex] +
        //     "</span>" +
        //     "</div>"
        //   );
        // },
      },
    },
    series: [
      {
        name: "series1",
        data: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
  };

  return (
    <div className="chartCard">
      <Paper elevation={1} component={Card} className={classes.root}>
        <div className={classes.leftSide}>
          <Typography
            variant="h5"
            component="h6"
            // className={classes.tableHeaderInsideCell}
          >
            Aura
          </Typography>
          <Typography
            variant="subtitle2"
            component="h6"
            // className={classes.tableHeaderInsideCell}
          >
            Last 5 days
          </Typography>
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
        </div>
        <div className="rightSide">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="120"
            height="70"
          />
          <div
            className="bottom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TrendingUpIcon />
            <Typography variant="subtitle2" component="h6">
              <CountUp
                start={0}
                end={5.2}
                duration={4}
                deplay={2}
                separator=""
                decimals={2}
                decimal="."
              />
              %
            </Typography>
            {/* <Typography
              variant="subtitle2"
              component="h6"
              // className={classes.tableHeaderInsideCell}
            >
              30%
            </Typography> */}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ChartCard;
