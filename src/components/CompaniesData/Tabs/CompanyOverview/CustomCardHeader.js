import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

function CustomCardHeader(props) {
  return (
    <CardHeader
      avatar={
        props.cardHeader.logo && (
          <Avatar
            aria-label="recipe"
            src={props.cardHeader.logo}
            variant="square"
          />
        )
      }
      title={props.cardHeader.headerText}
      titleTypographyProps={{
        variant: "h6",
        display: "initial",
      }}
      subheader={props.cardHeader.subheaderText}
    />
  );
}

export default CustomCardHeader;
