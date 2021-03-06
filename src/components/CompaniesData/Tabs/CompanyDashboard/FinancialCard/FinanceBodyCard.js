import React, { useEffect, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import FinanceItem from "./FinanceItem";
import { useFetchFinStmts } from "./FetchFinStmts";
import CustomChartBar from "./CustomChartBar";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

function FinanceBodyCard(props) {
  const params = useParams();
  const { t } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.dashboard", {
    returnObjects: true,
  });
  const [finStmtsComparativeData, graphsData, getFinStmtsData] =
    useFetchFinStmts();

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const clauses = useMemo(
    () => [
      {
        name: translationObj.financialReports.clausesNames[0],
        nameInXBRL: "Revenue",
      },
      {
        name: translationObj.financialReports.clausesNames[1],
        nameInXBRL: "ProfitLoss",
      },
      {
        name: translationObj.financialReports.clausesNames[2],
        nameInXBRL: "Equity",
      },
    ],
    [t]
  );
  useEffect(() => {
    const execGetFinStmtsDataFunc = async () => {
      await getFinStmtsData(
        params.companyId,
        currentYear - 2,
        currentYear,
        6,
        clauses
      );
    };
    execGetFinStmtsDataFunc();
  }, [params.companyId, currentYear, clauses, getFinStmtsData]);

  const getGridItem = (clause) => {
    // const currPeriodValue =
    //   finStmtsComparativeData[clause.nameInXBRL]?.CurrPeriodValue / 1000;
    let { currentValue, change, currencySymbol } =
      graphsData[clause.nameInXBRL] || {};
    if (!currentValue) {
      currentValue =
        finStmtsComparativeData[clause.nameInXBRL]?.CurrPeriodValue;
      change = finStmtsComparativeData[clause.nameInXBRL]?.Change;
    }
    return (
      <Grid
        container
        item
        alignItems="center"
        justify="space-evenly"
        xs={12}
        md={4}
        lg={4}
        xl={4}
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <FinanceItem
          name={clause.name}
          amount={currentValue}
          change={change}
          currencySymbol={currencySymbol}
        />
        <CustomChartBar chartData={graphsData[clause.nameInXBRL]} />
        {/* <Divider orientation="vertical" flexItem /> */}
      </Grid>
    );
  };

  console.log("FinanceBodyCard Rendered");

  return (
    <Grid container justify="flex-start">
      {clauses.map((clause) => {
        return getGridItem(clause);
      })}
      {/* <Grid container item xs={4}>
        <FinanceItem name="Revenue" amount="300" description="30.2" />
        <Divider orientation="vertical" flexItem />
        <CustomChartBar chartData={graphsData["Revenue"]} />
      </Grid>
      <Grid container item xs={4}>
        <FinanceItem name="Profit" amount="20" description="15.2" />
        <Divider orientation="vertical" flexItem />
      </Grid>
      <Grid item xs={4}>
        <FinanceItem name="Capital" amount="500" description="2.2" />
      </Grid> */}
    </Grid>
  );
}

export default React.memo(FinanceBodyCard);
