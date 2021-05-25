/*
inspired from:
https://react-material-kit.devias.io/dashboard/social/profile
*/

/*
Example:
            <AboutCard
              companyName={companyDetails.CompanyLongName}
              companyDescription={companyDetails.Description}
              logo={companyDetails.TaseEngLogo}
              companyId={companyDetails.CompanyId}
              corporateNo={companyDetails.CorporateNo}
              incorporation={companyDetails.IncorporationPlace}
              tel={companyDetails.Tel}
              fax={companyDetails.Fax}
              email={companyDetails.Email}
              website={companyDetails.Site}
            />
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FaxIcon from "./FaxIcon";
import DetailsLine from "./DetailsLine";
import DetailsHeader from "./DetailsHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    color: "rgb(23, 43, 77)",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "16px",
    boxShadow: "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
}));

function AboutCard(props) {
  const classes = useStyles();

  return (
    <div className="aboutCard">
      <Card className={classes.root}>
        <DetailsHeader
          headerText={props.companyName}
          subheaderText={props.companyDescription}
          logo={`https://www.tase.co.il/logos/company/en/${props.logo}`}
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
            <DetailsLine
              icon={BusinessIcon}
              primaryText={"Corporate No:"}
              secondaryText={props.corporateNo}
            />
            <DetailsLine
              icon={PublicIcon}
              primaryText={"Incorporation:"}
              secondaryText={props.incorporation}
            />
            <DetailsLine
              icon={PhoneIcon}
              primaryText={"Phone:"}
              secondaryText={props.tel}
            />
            <DetailsLine
              icon={FaxIcon}
              primaryText={"Fax:"}
              secondaryText={props.fax}
            />
            <DetailsLine
              icon={EmailIcon}
              primaryText={"E-Mail:"}
              secondaryText={props.email}
            />
            <DetailsLine
              icon={LanguageIcon}
              primaryText={"Website:"}
              secondaryText={props.website}
            />
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default AboutCard;
