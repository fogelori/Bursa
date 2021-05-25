import React, { useEffect, useState } from "react";
import CompanyOverview from "./CompanyOverview/CompanyOverview";
import CompanyImedReports from "./CompanyImedReports/CompanyImedReports";
import CompanyStockPrice from "./CompanyStockPrice/CompanyStockPrice";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import CustomTabs from "../CustomTabs";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fetchCompanyOverview } from "../FetchFunctions";
import { useParams } from "react-router-dom";

function CompanyTabs(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [companyOverviewData, setCompanyOverviewData] = useState();
  let params = useParams();

  const tabsList = React.useMemo(
    () => [
      {
        label: "Dashboard",
        routeName: "dashboard",
        Component: CompanyDashboard,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: "Overview",
        routeName: "overview",
        Component: CompanyOverview,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: "Immediate Reports",
        routeName: "immedreports",
        Component: CompanyImedReports,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
      {
        label: "Stock Price",
        routeName: "stockprice",
        Component: CompanyStockPrice,
        propsArgs: {
          companyOverviewData: companyOverviewData,
        },
      },
    ],
    [companyOverviewData]
  );

  useEffect(() => {
    fetchCompanyOverview(params.companyId).then((data) =>
      setCompanyOverviewData(data)
    );
  }, [params.companyId]);

  console.log("CompanyTabs Rendered");

  return (
    <React.Fragment>
      {companyOverviewData && (
        <CustomTabs
          tabsList={tabsList}
          allowHideTabsInScroll={true}
          {...(!isSmallScreen && { orientation: "vertical" })}
        />
      )}
    </React.Fragment>
  );
}

export default React.memo(CompanyTabs);
