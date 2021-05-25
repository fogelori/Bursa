import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  titleHeader: {
    fontWeight: 600,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function DetailsHeader(props) {
  const classes = useStyles();

  return (
    <div className="detailsHeader">
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.logo}
            variant="square"
          />
        }
        //   action={
        // <IconButton aria-label="settings">
        //   <MoreVertIcon />
        // </IconButton>
        //   }
        title={props.headerText}
        titleTypographyProps={{
          variant: "h6",
          className: classes.titleHeader,
        }}
        subheader={props.subheaderText}
      />
    </div>
  );
}

export default DetailsHeader;
