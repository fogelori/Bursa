import { useEffect, useState } from "react";
import { getFetchTase } from "../../FetchFunctions";

export function returnArgument(argument) {
  return argument;
}

const transformDateToSlash = (date) => {
  return date.toJSON().slice(0, 10).split("-").reverse().join("/");
};

export const getStockPrices = async (
  securityId,
  startDate,
  endDate,
  organizeArray = returnArgument
) => {
  const url = `https://api.tase.co.il/api/ChartData/ChartData/?ct=1&ot=1&lang=1&cf=0&cp=8&cv=0&cl=0&cgt=1
    &dFrom=${transformDateToSlash(startDate)}
    &dTo=${transformDateToSlash(endDate)}
    &oid=${securityId.toString().padStart(8, "0")}`;
  const method = "GET";
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };
  const data = await getFetchTase(url, method, headers);
  const rows = organizeArray(data.PointsForHistoryChart);
  return rows;
};

function useFetchStockPrice(companyOverviewData) {
  const [dataStockPrice, setDataStockPrice] = useState([]);

  const getStateStockPrices = async (
    securityId,
    startDate,
    endDate,
    organizeArray = returnArgument
  ) => {
    const rows = await getStockPrices(
      securityId,
      startDate,
      endDate,
      organizeArray
    );
    setDataStockPrice(rows);
  };

  useEffect(() => {
    setDataStockPrice([]);
  }, [companyOverviewData]);

  return [dataStockPrice, getStateStockPrices];
}

export default useFetchStockPrice;
