import React, { useEffect, useState, Suspense } from "react";
import CompanyOverview from "./CompanyOverview/CompanyOverview";
import CompanyImedReports from "./CompanyImedReports/CompanyImedReports";
import CompanyStockPrice from "./CompanyStockPrice/CompanyStockPrice";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import CustomTabs from "../CustomTabs";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fetchCompanyOverview } from "../FetchFunctions";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CompanyTabs(props) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [companyOverviewData, setCompanyOverviewData] = useState();
  let params = useParams();

  const tabsList = React.useMemo(
    () => [
      {
        label: t("navBar.companiesData.tabs.dashboard.title"),
        routeName: "dashboard",
        Component: CompanyDashboard,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: t("navBar.companiesData.tabs.overview.title"),
        routeName: "overview",
        Component: CompanyOverview,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: t("navBar.companiesData.tabs.immediateReports.title"),
        routeName: "immedreports",
        Component: CompanyImedReports,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: t("navBar.companiesData.tabs.stockPrice.title"),
        routeName: "stockprice",
        Component: CompanyStockPrice,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
    ],
    [companyOverviewData, t]
  );

  useEffect(() => {
    fetchCompanyOverview(params.companyId).then((data) =>
      setCompanyOverviewData(data)
    );
  }, [params.companyId]);

  console.log("CompanyTabs Rendered");

  return (
    <React.Fragment>
      <Suspense fallback="loading">
        {companyOverviewData && (
          <CustomTabs
            tabsList={tabsList}
            allowHideTabsInScroll={true}
            {...(!isSmallScreen && { orientation: "vertical" })}
          />
        )}
      </Suspense>
    </React.Fragment>
  );
}

export default React.memo(CompanyTabs);
