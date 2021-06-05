/*
inspired from:
http://shreyu-react.coderthemes.com/dashboard


*/

import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Card from "@material-ui/core/Card";
// import Typography from "@material-ui/core/Typography";
// import TrendingUpIcon from "@material-ui/icons/TrendingUp";
// import TrendingDownIcon from "@material-ui/icons/TrendingDown";
// import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import Chart from "react-apexcharts";
// import CountUp from "react-countup";
// import Box from "@material-ui/core/Box";
// import green from "@material-ui/core/colors/green";
// import red from "@material-ui/core/colors/red";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // padding: theme.spacing(3),
//     display: "flex",
//   },
//   leftSide: {
//     paddingRight: theme.spacing(1),
//   },
// }));

function CustomChartBar(props) {
  //   const classes = useStyles();
  //   const percentChange =
  //     (props.chartData.yData[0] /
  //       props.chartData.yData[props.chartData.yData.length - 1] -
  //       1) *
  //     100;
  const chartData = {
    options: {
      chart: {
        id: "bar",
        type: "bar",
        // toolbar: false,
        sparkline: {
          enabled: true,
        },
        // zoom: {
        //   enabled: false,
        // },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -10000000000,
                to: 0,
                color: "#FF0000",
              },
            ],
          },
          horizontal: false,
          // columnWidth: "55%",
          endingShape: "rounded",
          dataLabels: {
            position: "bottom",
            maxItems: 100,
            hideOverflowingLabels: true,
            orientation: "horizontal",
          },
          // columnWidth: "80%",
        },
      },
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shadeIntensity: 1,
      //     opacityFrom: 0.7,
      //     opacityTo: 0.9,
      //     stops: [0, 90, 100],
      //   },
      // },
      xaxis: {
        // crosshairs: {
        //   width: 1,
        // },
        title: {},
        type: "category",
        categories: props.chartData?.xData ?? [],
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
        // decimalsInFloat: 10,
      },
      // dataLabels: {
      //   enabled: false,
      // },
      grid: {
        show: false,
      },
      // stroke: {
      //   show: true,
      //   curve: "smooth",
      //   width: 2,
      // },
      tooltip: {
        // enabled: false,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        onDatasetHover: {
          highlightDataSeries: false,
        },
        // x: {
        //   show: false,
        //   //   format: "dd MMM",
        //   //   formatter: undefined,
        // },
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            const valueCommas = value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${valueCommas}`;
          },
        },
        marker: {
          show: false,
        },
        fixed: {
          enabled: true,
          position: "topRight",
          offsetX: 0,
          offsetY: -70,
        },
      },
    },
    series: [
      {
        name: "",
        data: props.chartData?.yData ?? [],
      },
    ],
  };

  //   const TrendingIconDirection = () => {
  //     if (percentChange > 0) {
  //       return <TrendingUpIcon style={{ color: green[700] }} fontSize="small" />;
  //     } else if (percentChange < 0) {
  //       return <TrendingDownIcon style={{ color: red[500] }} fontSize="small" />;
  //     } else {
  //       return <TrendingFlatIcon fontSize="small" />;
  //     }
  //   };

  console.log("CustomChartBar Rendered");

  return (
    // <Box className={classes.root}>
    //   {/* <div className={classes.leftSide}>
    //     <Typography
    //       variant="h4"
    //       component="h6"
    //       // className={classes.tableHeaderInsideCell}
    //     >
    //       <CountUp
    //         start={0}
    //         end={85}
    //         duration={4}
    //         deplay={2}
    //         separator=""
    //         decimals={0}
    //         decimal="."
    //       />
    //       $
    //     </Typography>
    //   </div> */}
    //   <div className="rightSide">
    <React.Fragment>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="100"
        height="70"
      />
    </React.Fragment>
    //     <div
    //       className="bottom"
    //       style={{ display: "flex", justifyContent: "center" }}
    //     >
    //       <TrendingIconDirection />
    //       <Typography variant="body2" component="p">
    //         <CountUp
    //           start={0}
    //           end={percentChange}
    //           duration={3}
    //           deplay={2}
    //           separator=""
    //           decimals={2}
    //           decimal="."
    //         />
    //         %
    //       </Typography>
    //     </div>
    //     <Typography variant="body2" component="p" align="center">
    //       Last Year
    //     </Typography>
    //   </div>
    // </Box>
  );
}

export default React.memo(CustomChartBar);
