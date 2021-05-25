import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CompanyOverview from "./CompanyOverview/CompanyOverview";
import CompanyImedReports from "./CompanyImedReports/CompanyImedReports";
import CompanyStockPrice from "./CompanyStockPrice/CompanyStockPrice";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";

function TabPanel(props) {
  const { value, index, ComponentTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{
        flexGrow: "1",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {
        value === index && (
          <ComponentTab companyOverviewData={props.companyOverviewData} />
        )
        // </Box>
      }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function CompanyTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsList = [
    { label: "Dashboard", component: CompanyDashboard },
    { label: "Overview", component: CompanyOverview },
    { label: "Immediate Reports", component: CompanyImedReports },
    { label: "Stock Price", component: CompanyStockPrice },
  ];

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {tabsList.map((tab, index) => (
          <Tab label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
      {tabsList.map((tab, index) => (
        <>
          {value === index && (
            <TabPanel
              value={value}
              index={index}
              ComponentTab={tab.component}
              companyOverviewData={props.companyOverviewData}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default React.memo(CompanyTabs);
