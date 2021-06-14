import React from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CustomCardHeader from "../../CompanyOverview/CustomCardHeader";
import FinanceBodyCard from "./FinanceBodyCard";
import { useTranslation } from "react-i18next";

function FinancialCard(props) {
  const { t, i18n } = useTranslation();
  const headerObject = {
    headerText: t("navBar.companiesData.tabs.dashboard.financialReports.title"),
  };

  console.log("FinancialCard Rendered");

  return (
    <Paper elevation={1} component={Card}>
      <CustomCardHeader cardHeader={headerObject} />
      <Divider />
      <FinanceBodyCard />
    </Paper>
  );
}

export default React.memo(FinancialCard);
