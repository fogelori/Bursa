import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useFetchImedReports from "../../CompanyImedReports/FetchImedReports";
import { useCreateColumns } from "../../CompanyImedReports/OrganizeTableImedReports";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CustomCardHeader from "../../CompanyOverview/CustomCardHeader";
import CreateTable from "../../../CreateTable";
import { useTranslation } from "react-i18next";

// const securitiesObject = {
//   cardHeader: {
//     headerText: "Immediate Reports",
//     // subheaderText: "try",
//   },
//   // tableHeader: ["Name"],
//   tableRows: companyStockPricesRows ? companyStockPricesRows : [],
//   selectedProperties: [
//     {
//       propertyHeaderName: "securityName",
//       propertyBodyName: "securityCurrentPrice",
//       // propertyIconComponentName: "d",
//       propertyChart: "data",
//     },
//   ],
// };

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
  },
}));

function ImedCard(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [companyImedReports, fetchCompanyImedReports] = useFetchImedReports();
  const simpleTable = true;
  const columns = useCreateColumns(simpleTable);
  const headerObject = {
    headerText: t("navBar.companiesData.tabs.dashboard.immediateReports.title"),
  };

  useEffect(() => {
    const itemsOnPage = 30;
    const page = 1;
    fetchCompanyImedReports(
      props.companyOverviewData.CompanyDetails.CompanyId,
      page,
      undefined,
      undefined,
      itemsOnPage
    );
  }, [props.companyOverviewData, fetchCompanyImedReports]);

  // const imedReportsObject = {
  //   cardHeader: {
  //     headerText: "Immediate Reports",
  //   },
  //   tableRows: companyImedReports ?? [],
  //   selectedProperties: [
  //     {
  //       propertyHeaderName: "col2",
  //       propertyBodyName: "col1",
  //     },
  //   ],
  // };

  // console.log(companyImedReports);

  console.log("ImedCard Rendered");

  return (
    <React.Fragment>
      <Paper elevation={1} component={Card} className={classes.paper}>
        <CustomCardHeader cardHeader={headerObject} />
        <CreateTable
          columns={columns}
          rows={companyImedReports}
          isSimpleTable={simpleTable}
        />
      </Paper>
      {/* <TableCard
        cardHeader={imedReportsObject.cardHeader}
        tableHeader={imedReportsObject.tableHeader}
        tableRows={imedReportsObject.tableRows}
        selectedProperties={imedReportsObject.selectedProperties}
      /> */}
    </React.Fragment>
  );
}

export default React.memo(ImedCard);
