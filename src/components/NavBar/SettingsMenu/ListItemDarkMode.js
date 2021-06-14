import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  listItemIconRoot: {
    minWidth: theme.spacing(4),
  },
  formControl: {
    // minWidth: 60,
    margin: theme.spacing(1),
  },
  input1: {
    height: 200,
    fontSize: "3em",
  },
}));

function ListItemDarkMode() {
  const classes = useStyles();
  const [darkModeState, setDarkModeState] = React.useState(false);

  const handleChange = (event) => {
    setDarkModeState((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon
          classes={{
            root: classes.listItemIconRoot,
          }}
        >
          <Brightness4Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Dark Mode" />
        <Switch
          // edge="end"
          name="darkModeSwitch"
          onChange={handleChange}
          checked={darkModeState}
          // inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
        />
        {/* </MenuItem> */}
      </ListItem>
    </React.Fragment>
  );
}

export default ListItemDarkMode;
