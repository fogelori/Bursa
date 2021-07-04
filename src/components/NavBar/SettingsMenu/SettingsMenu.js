import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItemLanguage from "./ListItemLanguage";
import ListItemDarkMode from "./ListItemDarkMode";

function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      > */}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <List>
              <ListItemLanguage closeSettingsDialog={handleClose} />
              {/* <ListItemDarkMode /> */}
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
      {/* </Menu> */}
    </React.Fragment>
  );
}

export default SettingsMenu;
