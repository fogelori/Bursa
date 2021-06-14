import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FaxIcon from "../../../../icons/FaxIcon";
import { useTranslation } from "react-i18next";

export function useGetDetailsObject(companyOverviewData) {
  const { t, i18n } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.overview.cards", {
    returnObjects: true,
  });

  const detailsObject = {
    aboutObject: {
      cardHeader: {
        headerText: translationObj.about.title,
        // subheaderText: props.companyOverviewData.CompanyDetails.Description,
        // logo: `https://www.tase.co.il/logos/company/en/${props.companyOverviewData.CompanyDetails.TaseEngLogo}`,
      },
      // tableHeader: ["Name"],
      // tableRows: companyOverviewData.ShareHolders.ShareHoldersList,
      tableRows: [
        {
          name: translationObj.about.issuerNo,
          value: companyOverviewData.CompanyDetails.CompanyId,
          iconComponent: <BusinessCenterIcon />,
        },
        {
          name: translationObj.about.corporateNo,
          value: companyOverviewData.CompanyDetails.CorporateNo,
          iconComponent: <BusinessIcon />,
        },
        {
          name: translationObj.about.incorporation,
          value: companyOverviewData.CompanyDetails.IncorporationPlace,
          iconComponent: <PublicIcon />,
        },
        {
          name: translationObj.about.phone,
          value: companyOverviewData.CompanyDetails.Tel,
          iconComponent: <PhoneIcon />,
        },
        {
          name: translationObj.about.fax,
          value: companyOverviewData.CompanyDetails.Fax,
          iconComponent: <FaxIcon />,
        },
        {
          name: translationObj.about.eMail,
          value: companyOverviewData.CompanyDetails.Email,
          iconComponent: <EmailIcon />,
        },
        {
          name: translationObj.about.website,
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
        headerText: translationObj.securities.title,
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
        headerText: translationObj.parties.title,
      },
      tableHeader: translationObj.parties.tableHeaders,
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
        headerText: translationObj.boardManagement.title,
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
