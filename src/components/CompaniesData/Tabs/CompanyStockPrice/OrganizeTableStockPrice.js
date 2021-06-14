import React from "react";
import { useTranslation } from "react-i18next";

export const useCreateColumns = () => {
  const { t, i18n } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.stockPrice", {
    returnObjects: true,
  });
  return React.useMemo(
    () => [
      {
        field: "col1",
        headerName: translationObj.tableHeaders[0],
        // width: 200,
        flex: 1,
        headerAlign: "center",
        type: "date",
      },
      {
        field: "col2",
        headerName: translationObj.tableHeaders[1],
        flex: 1,
        // align: "right",
        headerAlign: "center",
        // type: "number",
      },
      {
        field: "col3",
        headerName: translationObj.tableHeaders[2],
        flex: 1,
        // align: "right",
        headerAlign: "center",
        hide: true,
        // type: "number",
      },
      {
        field: "col4",
        headerName: translationObj.tableHeaders[3],
        flex: 1,
        // align: "right",
        headerAlign: "center",
        hide: true,
        // type: "number",
      },
      {
        field: "col5",
        headerName: translationObj.tableHeaders[4],
        flex: 1,
        // align: "right",
        headerAlign: "center",
        // hide: true,
        // type: "number",
      },
      {
        field: "col6",
        headerName: translationObj.tableHeaders[5],
        flex: 1,
        // align: "right",
        headerAlign: "center",
        hide: true,
        // type: "number",
      },
    ],
    [translationObj]
  );
};

export const createTableRows = (rows) => {
  return rows.map((row, index) => {
    return {
      id: index + 1,
      col1: row.TradeDate,
      col2: row.ClosingRate,
      col3: row.BaseRate,
      col4: row.OpenRate,
      col5: row.HighRate,
      col6: row.LowRate,
    };
  });
};
