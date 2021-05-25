import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles((theme) => ({
  listItem: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
}));

function DetailsLine(props) {
  const classes = useStyles();

  return (
    <div className="detailsLine">
      <ListItem divider disableGutters>
        <ListItemAvatar>{<props.icon />}</ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="subtitle2"
              component="h6"
              className={classes.listItem}
            >
              {props.primaryText}
            </Typography>
          }
          secondary={
            <Typography variant="caption">{props.secondaryText}</Typography>
          }
        ></ListItemText>
      </ListItem>
    </div>
  );
}

export default DetailsLine;
