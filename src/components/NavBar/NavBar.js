import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SmallScreenMenu from "./SmallScreenMenu";
import LargeScreenMenu from "./LargeScreenMenu";
import SettingsMenu from "./SettingsMenu/SettingsMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    marginBottom: theme.spacing(8),
  },
  toolbar: {
    paddingLeft: "0px",
    paddingRight: "0px",
    justifyContent: "space-between",
  },
  smallScreen: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  largeScreen: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function NavBar() {
  const classes = useStyles();

  console.log("NavBar Rendered");
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div className={classes.smallScreen}>
            <SmallScreenMenu />
          </div>
          <div className={classes.largeScreen}>
            <LargeScreenMenu />
          </div>
          <div className="headerEnd">
            <SettingsMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
