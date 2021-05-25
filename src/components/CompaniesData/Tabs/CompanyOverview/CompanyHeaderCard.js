import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100%",
    padding: theme.spacing(3),
    borderRadius: "0px",
    borderBottom: "1px solid black",
  },
}));

function CompanyHeaderCard(props) {
  const classes = useStyles();

  return (
    <Paper elevation={1} component={Card} className={classes.root}>
      <Typography variant="h6" component="h6" align="center">
        {props.headerText}
      </Typography>
      <Typography variant="body2" component="h6" align="center">
        {props.subheaderText}
      </Typography>
    </Paper>
  );
}

export default CompanyHeaderCard;
