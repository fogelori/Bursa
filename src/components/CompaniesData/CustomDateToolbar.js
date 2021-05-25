import React from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import { makeStyles, Typography } from "@material-ui/core";

export const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const CustomDateToolbar = function (props) {
  const { date, isLandscape, openView, setOpenView, title, label } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  const classes = useStyles();

  return (
    <>
      <PickerToolbar
        className={classes.toolbar}
        title={title}
        isLandscape={isLandscape}
      >
        <Typography variant="body2">{label}</Typography>
        <ToolbarButton
          onClick={handleChangeViewClick("year")}
          variant="h6"
          label={date.getFullYear()}
          selected={openView === "year"}
        />
        <ToolbarButton
          onClick={handleChangeViewClick("date")}
          variant="h4"
          selected={openView === "date"}
          label={date.toDateString().slice(0, date.toDateString().length - 5)}
        />
      </PickerToolbar>
    </>
  );
};

export default CustomDateToolbar;
