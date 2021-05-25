import React from "react";

export const useCreateColumns = () => {
  return React.useMemo(
    () => [
      {
        field: "col1",
        headerName: "Date",
        // width: 200,
        flex: 1,
        headerAlign: "center",
        type: "date",
      },
      {
        field: "col2",
        headerName: "Closing Price",
        flex: 1,
        align: "right",
        headerAlign: "center",
        type: "number",
      },
      {
        field: "col3",
        headerName: "Base Price",
        flex: 1,
        align: "right",
        headerAlign: "center",
        hide: true,
        type: "number",
      },
      {
        field: "col4",
        headerName: "Open Price",
        flex: 1,
        align: "right",
        headerAlign: "center",
        hide: true,
        type: "number",
      },
      {
        field: "col5",
        headerName: "High Price",
        flex: 1,
        align: "right",
        headerAlign: "center",
        // hide: true,
        type: "number",
      },
      {
        field: "col6",
        headerName: "Low Price",
        flex: 1,
        align: "right",
        headerAlign: "center",
        hide: true,
        type: "number",
      },
    ],
    []
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
