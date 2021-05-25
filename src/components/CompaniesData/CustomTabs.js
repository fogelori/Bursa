import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
// import useVisibleHeader from "./useVisibleHeader";
import useHideOnScrolled from "./useHideOnScrolled";
// import classnames from "classnames";
import { useHideHeaderState } from "../../hideHeaderStore";
import clsx from "clsx";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // ...(props.orientation === "vertical" && { display: "flex" }),
    // display: "flex",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // height: 224,
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    flexShrink: "0",
    // backgroundColor: "white",
    // position: "absoulte",
    top: "150px",
    transition: "top 0.6s ease-in-out",
    // zIndex: 100,
  },
  tabsHide: {
    position: "absolute",
    top: "-50px",
    // zIndex: -100,
    // transform: "translate3d(0, -100%, 0)",
  },
  tabPanelBox: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
}));

const TabPanel = React.memo(function TabPanel(props) {
  const menuRef = React.useRef();
  const classes = useStyles();
  useHideOnScrolled(menuRef);

  console.log("TabPanel Rendered");

  return (
    <Box
      className={classes.tabPanelBox}
      ref={menuRef}
      // onScroll={handleScroll}
    >
      {props.tabsList.map(({ Component, propsArgs }, index) => (
        <React.Fragment>
          {props.chosenTab === index && <Component {...propsArgs} />}
        </React.Fragment>
      ))}
    </Box>
  );
});

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

function CustomTabs(props) {
  const [value, setValue] = React.useState(0);
  const disableRouter = props.disableRouter ? true : false;
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { allowHideTabsInScroll = false } = props;
  const classes = useStyles();

  const tabNameToIndex = (currentTab) => {
    return props.tabsList.findIndex((tab) => tab.routeName === currentTab);
  };

  const hiddenHeader = useHideHeaderState();

  const handleChange = (event, newValue) => {
    if (disableRouter) {
      setValue(newValue);
    } else {
      history.push(`${url}/${props.tabsList[newValue]["routeName"]}`);
    }
  };

  console.log("CustomTabs Rendered");

  return (
    <div
      className={classes.root}
      style={{
        ...(props.orientation === "vertical" && { flexDirection: "row" }),
      }}
    >
      <Switch>
        {!disableRouter && (
          <Redirect
            exact
            from={`${path}/`}
            to={`${path}/${props.tabsList[0].routeName}`}
          />
        )}
        <Route
          path={disableRouter ? `${path}` : `${path}/:tab`}
          render={(history) => (
            <React.Fragment>
              <Tabs
                {...(props.orientation === "vertical" && {
                  orientation: "vertical",
                })}
                {...(props.orientation !== "vertical" && {
                  scrollButtons: "on",
                })}
                variant="scrollable"
                value={
                  disableRouter
                    ? value
                    : tabNameToIndex(history.match.params.tab)
                }
                onChange={handleChange}
                aria-label="tabs example"
                className={clsx(classes.tabs, {
                  [classes.tabsHide]:
                    hiddenHeader === true && allowHideTabsInScroll === true,
                })}
              >
                {props.tabsList.map((tab, index) => (
                  <Tab label={tab.label} {...a11yProps(index)} />
                ))}
              </Tabs>
              <TabPanel
                chosenTab={
                  disableRouter
                    ? value
                    : tabNameToIndex(history.match.params.tab)
                }
                tabsList={props.tabsList}
              />
            </React.Fragment>
          )}
        />
      </Switch>
    </div>
  );
}

export default React.memo(CustomTabs);
