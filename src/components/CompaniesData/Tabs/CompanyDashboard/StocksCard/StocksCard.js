import React, { useEffect, useMemo } from "react";
import useFetchSecuritiesPrices from "./OrganizeData";
import TableCard from "../../CompanyOverview/TableCard";
import { useTranslation } from "react-i18next";

function StocksCard(props) {
  const { t } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.dashboard", {
    returnObjects: true,
  });
  const [companyStockPricesRows, fetchCompanyStockPrice] =
    useFetchSecuritiesPrices(props.companyOverviewData);

  const dateObject = useMemo(
    () => ({
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      endDate: new Date(),
    }),
    []
  );

  useEffect(() => {
    fetchCompanyStockPrice(
      props.companyOverviewData.SecuritiesList.Securities,
      dateObject.startDate,
      dateObject.endDate
    );
  }, [
    dateObject.startDate,
    dateObject.endDate,
    props.companyOverviewData,
    fetchCompanyStockPrice,
    t,
  ]);

  const securitiesObject = {
    cardHeader: {
      headerText: translationObj.securities.title,
      // subheaderText: "try",
    },
    // tableHeader: ["Name"],
    tableRows: companyStockPricesRows ? companyStockPricesRows : [],
    selectedProperties: [
      {
        propertyHeaderName: "securityName",
        propertyBodyName: "securityCurrentPrice",
        // propertyIconComponentName: "d",
        propertyChart: "data",
      },
      // {
      //   propertyChart: "data",
      // },
    ], // the value of headerName property is the header inside the cell of rows (optional)
  };

  console.log("StockCard Rendered");

  return (
    <TableCard
      cardHeader={securitiesObject.cardHeader}
      tableHeader={securitiesObject.tableHeader}
      tableRows={securitiesObject.tableRows}
      selectedProperties={securitiesObject.selectedProperties}
    />
  );
}

export default React.memo(StocksCard);
