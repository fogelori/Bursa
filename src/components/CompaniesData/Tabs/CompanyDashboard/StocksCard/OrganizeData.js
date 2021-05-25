import { useCallback, useState } from "react";
import { getStockPrices } from "../../CompanyStockPrice/FetchStockPrice";

const createStockPricesArray = (originalStockPricesArray) => {
  const transformedstockPricesData = {
    xData: [],
    yData: [],
  };
  originalStockPricesArray.forEach((stockPrice) => {
    transformedstockPricesData.xData.push(stockPrice.TradeDateGrafh);
    transformedstockPricesData.yData.push(stockPrice.ClosingRate);
  });
  return transformedstockPricesData;
};

export default function useFetchSecuritiesPrices(props) {
  const [securitiesPrices, setSecuritiesPrices] = useState([]);

  const getSecuritiesList = useCallback(
    async (securities, startDate, endDate) => {
      const securityList = await Promise.all(
        securities
          .filter((security) => security.SecurityIndicators[0].Value)
          .map(async (security) => {
            const stockPricesData = await getStockPrices(
              security.SecurityId,
              startDate,
              endDate,
              createStockPricesArray
            );
            return {
              securityName: security.SecurityName,
              securityCurrentPrice: stockPricesData.yData[0],
              data: stockPricesData,
            };
          })
      );
      setSecuritiesPrices(securityList);
    },
    []
  );

  // useEffect(() => {
  //   setSecuritiesPrices([]);
  // }, [props.companyOverviewData]);

  return [securitiesPrices, getSecuritiesList];
}
