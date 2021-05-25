/*
inspired from:
https://react-material-kit.devias.io/dashboard/social/profile
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SvgIcon from "@material-ui/core/SvgIcon";
import DetailsLine from "../DetailsLine";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    color: "rgb(23, 43, 77)",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "16px",
    boxShadow: "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  titleHeader: {
    fontWeight: 600,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  listItem: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function FaxIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1792 1792"
      >
        <path
          d="M288 384q66 0 113 47t47 113v1088q0 66-47 113t-113 47H160q-66 0-113-47T0 1632V544q0-66 47-113t113-47h128zm1376 163q58 34 93 93t35 128v768q0 106-75 181t-181 75H672q-66 0-113-47t-47-113V96q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v163zm-736 989v-128q0-14-9-23t-23-9H768q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256v-128q0-14-9-23t-23-9H768q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256V896q0-14-9-23t-23-9H768q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm256 512v-128q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256v-128q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256V896q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm256 512v-128q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256v-128q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm0-256V896q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v128q0 14 9 23t23 9h128q14 0 23-9t9-23zm96-384V384h-160q-40 0-68-28t-28-68V128H640v512h896z"
          //   fill="#626262"
        />
      </svg>
    </SvgIcon>
  );
}

function AboutCard(props) {
  const classes = useStyles();

  return (
    <div className="aboutCard">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`https://www.tase.co.il/logos/company/en/${props.logo}`}
            />
          }
          //   action={
          // <IconButton aria-label="settings">
          //   <MoreVertIcon />
          // </IconButton>
          //   }
          title={props.companyName}
          titleTypographyProps={{
            variant: "h6",
            className: classes.titleHeader,
          }}
          subheader={props.companyDescription}
        />
        <Divider />
        <CardContent>
          {/* <Typography variant="subtitle2" component="h6">
            Profile
          </Typography> */}
          <List>
            <DetailsLine
              icon={BusinessCenterIcon}
              primaryText={"Issuer No."}
              secondaryText={props.companyId}
            />
            {/* <ListItem divider disableGutters>
              <ListItemAvatar>
                <BusinessCenterIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Issuer No.:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.companyId}</Typography>
                }
              ></ListItemText>
            </ListItem> */}
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <BusinessIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Corporate No:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.corporateNo}</Typography>
                }
              ></ListItemText>
            </ListItem>
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <PublicIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Incorporation:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">
                    {props.incorporation}
                  </Typography>
                }
              ></ListItemText>
            </ListItem>
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <PhoneIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Phone:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.tel}</Typography>
                }
              ></ListItemText>
            </ListItem>
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <FaxIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Fax:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.fax}</Typography>
                }
              ></ListItemText>
            </ListItem>
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <EmailIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    E-Mail:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.email}</Typography>
                }
              ></ListItemText>
            </ListItem>
            <ListItem divider disableGutters>
              <ListItemAvatar>
                <LanguageIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={classes.listItem}
                  >
                    Website:
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">{props.website}</Typography>
                }
              ></ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default AboutCard;
