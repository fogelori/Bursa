import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import AnimatedMenuIcon from "../../AnimatedMenuIcon";
import ListMenu from "./ListMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingLeft: "0px",
  },
  menuButton: {},
  drawerHeader: {},
  drawer: {
    // position: "static",
    top: theme.spacing(7),
  },
}));

function SmallScreenMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const getThemePaletteTextSecondary = () => {
    return theme.palette.text.secondary;
  };
  const handleDrawerToggle = () => {
    setOpen((prevState) => (prevState ? false : true));
  };

  return (
    <div className="smallScreenComponent">
      <div className="menuicon">
        <IconButton
          onClick={handleDrawerToggle}
          disableRipple={true}
          disableFocusRipple={true}
        >
          <AnimatedMenuIcon
            isMenuClicked={open}
            color={getThemePaletteTextSecondary()}
          />
        </IconButton>
      </div>
      <div className={classes.drawer}>
        <Drawer
          // variant="persistent"
          anchor="left"
          open={open}
          className={classes.drawer}
          // onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
          PaperProps={{ className: classes.drawer }}
        >
          <ListMenu />
        </Drawer>
      </div>
    </div>
  );
}

export default SmallScreenMenu;
