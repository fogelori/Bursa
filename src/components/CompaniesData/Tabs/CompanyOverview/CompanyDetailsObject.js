import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FaxIcon from "../../../../icons/FaxIcon";

export function getDetailsObject(companyOverviewData) {
  const detailsObject = {
    aboutObject: {
      cardHeader: {
        headerText: "About",
        // subheaderText: props.companyOverviewData.CompanyDetails.Description,
        // logo: `https://www.tase.co.il/logos/company/en/${props.companyOverviewData.CompanyDetails.TaseEngLogo}`,
      },
      // tableHeader: ["Name"],
      // tableRows: companyOverviewData.ShareHolders.ShareHoldersList,
      tableRows: [
        {
          name: "Issuer No.",
          value: companyOverviewData.CompanyDetails.CompanyId,
          iconComponent: <BusinessCenterIcon />,
        },
        {
          name: "Corporate No:",
          value: companyOverviewData.CompanyDetails.CorporateNo,
          iconComponent: <BusinessIcon />,
        },
        {
          name: "Incorporation:",
          value: companyOverviewData.CompanyDetails.IncorporationPlace,
          iconComponent: <PublicIcon />,
        },
        {
          name: "Phone:",
          value: companyOverviewData.CompanyDetails.Tel,
          iconComponent: <PhoneIcon />,
        },
        {
          name: "Fax:",
          value: companyOverviewData.CompanyDetails.Fax,
          iconComponent: <FaxIcon />,
        },
        {
          name: "E-Mail:",
          value: companyOverviewData.CompanyDetails.Email,
          iconComponent: <EmailIcon />,
        },
        {
          name: "Website:",
          value: companyOverviewData.CompanyDetails.Site,
          iconComponent: <LanguageIcon />,
        },
      ],
      selectedProperties: [
        {
          propertyHeaderName: "name",
          propertyBodyName: "value",
          propertyIconComponentName: "iconComponent",
        },
      ],
    },

    securitiesObject: {
      cardHeader: {
        headerText: "Securities",
        // subheaderText: "try",
      },
      // tableHeader: ["Name"],
      tableRows: companyOverviewData.SecuritiesList.Securities,
      selectedProperties: [
        {
          propertyHeaderName: "SecurityName",
          propertyBodyName: "ShareTypeDesc",
          // propertyIconComponentName: "d",
        },
      ], // the value of headerName property is the header inside the cell of rows (optional)
    },

    partiesObject: {
      cardHeader: {
        headerText: "Parties",
      },
      tableHeader: ["Name", "Security Name"],
      tableRows: companyOverviewData.ShareHolders.ShareHoldersList,
      selectedProperties: [
        {
          propertyHeaderName: "",
          propertyBodyName: "HolderName",
        },
        {
          propertyHeaderName: "",
          propertyBodyName: "SecurityName",
        },
      ],
    },

    managementObject: {
      cardHeader: {
        headerText: "Board & Management",
      },
      // tableHeader: ["Name"],
      tableRows:
        companyOverviewData.ManagementDetails.ManagementAndSeniorExecutives,
      selectedProperties: [
        {
          propertyHeaderName: "Name",
          propertyBodyName: "RoleType",
        },
      ],
    },
  };
  return detailsObject;
}
