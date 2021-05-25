import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TableCard from "./TableCard";
import CompanyHeaderCard from "./CompanyHeaderCard";
import { getDetailsObject } from "./CompanyDetailsObject";

const useStyles = makeStyles((theme) => ({
  container: {
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
    // backgroundColor: "rgb(244, 245, 247)",
    // // height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // flexGrow: 1,
    // overflowY: "auto",
  },
  flexGrowStyle: {
    flexGrow: "1",
    overflowY: "auto",
    backgroundColor: "rgb(244, 245, 247)",
  },
  heightHundredStyle: {
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
  },
  box: {
    flexGrow: "1",
    backgroundColor: "rgb(244, 245, 247)",
    [theme.breakpoints.up("lg")]: {
      overflowY: "auto",
    },
  },
  boxRoot: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
      overflow: "auto",
    },
  },
}));

function GridItemDetails({ companyOverviewData }) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      md={3}
      lg={3}
      xl={3}
      className={classes.heightHundredStyle}
    >
      <TableCard
        cardHeader={companyOverviewData.cardHeader}
        tableHeader={companyOverviewData.tableHeader}
        tableRows={companyOverviewData.tableRows}
        selectedProperties={companyOverviewData.selectedProperties}
      />
    </Grid>
  );
}

function CompanyOverview(props) {
  const classes = useStyles();
  const companyOverviewData = getDetailsObject(props.companyOverviewData);

  console.log("CompanyOverview Rendered");

  return (
    <Box className={classes.boxRoot + " companyOverview"}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <CompanyHeaderCard
            headerText={
              props.companyOverviewData.CompanyDetails.CompanyLongName
            }
            subheaderText={props.companyOverviewData.CompanyDetails.Description}
          />
        </Grid>
      </Grid>
      <Box px={3} pt={3} className={classes.box}>
        <Grid
          container
          direction="column"
          spacing={3}
          wrap="nowrap"
          className={classes.heightHundredStyle}
        >
          {/* <Grid container item spacing={3}>
            <Grid item xs={12} md={3} lg={3} xl={3}>
              <ChartCard />
            </Grid>
          </Grid> */}
          <Grid
            container
            spacing={3}
            item
            // justify="space-evenly"
            className={classes.flexGrowStyle}
            /*spacing={3} className={classes.flexGrowStyle}*/
          >
            <GridItemDetails
              companyOverviewData={companyOverviewData.aboutObject}
            />
            <GridItemDetails
              companyOverviewData={companyOverviewData.securitiesObject}
            />
            <GridItemDetails
              companyOverviewData={companyOverviewData.partiesObject}
            />
            <GridItemDetails
              companyOverviewData={companyOverviewData.managementObject}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CompanyOverview;
