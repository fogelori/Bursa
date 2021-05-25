import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import FinancialCard from "./FinancialCard/FinancialCard";
import StockCard from "./StocksCard/StocksCard";
import ImedCard from "./ImedCard/ImedCard";

const useStyles = makeStyles((theme) => ({
  imedRoot: {
    flexGrow: 1,
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      // height: "410px",
    },
  },
  containerRoot: {
    height: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
    flexWrap: "nowrap",
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    // paddingTop: theme.spacing(2),
  },
  box: {
    // flexGrow: "1",
    // height: "100%",
    // overflowY: "auto",
    backgroundColor: "rgb(244, 245, 247)",
    [theme.breakpoints.up("lg")]: {
      overflowY: "auto",
      height: "100%",
    },
  },
  heightHundredStyle: {
    [theme.breakpoints.up("lg")]: {
      height: "100%",
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  finRoot: {
    paddingBottom: theme.spacing(3),
  },
}));

function CompanyDashboard(props) {
  const classes = useStyles();

  console.log("CompanyDashboard Rendered");

  return (
    <Box className={classes.box}>
      <Grid container className={classes.containerRoot}>
        <Grid
          item
          // spacing={4}
          // justify="flex-start"
          xs={12}
          sm={10}
          direction="column"
          container
          className={classes.container}
        >
          <Grid item className={classes.finRoot}>
            <FinancialCard />
          </Grid>
          <Grid item className={classes.imedRoot}>
            <ImedCard companyOverviewData={props.companyOverviewData} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.heightHundredStyle}
          // spacing={4}
        >
          <StockCard companyOverviewData={props.companyOverviewData} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(CompanyDashboard);
