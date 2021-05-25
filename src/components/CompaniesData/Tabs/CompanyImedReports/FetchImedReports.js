import { useCallback, useState } from "react";
import { getFetchTase } from "../../FetchFunctions";
import { transformDateRows } from "./OrganizeTableImedReports";

function useFetchImedReports() {
  const [dataImedReports, setDataImedReports] = useState([]);
  const getImedReports = useCallback(
    async (companyId, page, startDate, endDate, itemsOnPage = 1000) => {
      const url = "https://mayaapi.tase.co.il/api/report/filter";
      const method = "POST";
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Maya-With": "allow",
      };
      const bodyObject = {
        Page: page,
        ItemsOnPage: itemsOnPage, // was not in the original request, found it in other query in specific stock in the website www.tase.co.il that return array of "הודעות לבורסה"
        GroupData: [
          {
            DataList: [
              {
                Cd: companyId,
                Desc: "",
                IsSelected: true,
                VFType: "entity",
              },
            ],
          },
        ],
        ...(startDate && { DateFrom: startDate }),
        ...(endDate && { DateTo: endDate }),
        IsBreakingAnnouncement: false,
        IsTradeHalt: false,
        IsForTaseMember: false,
        IsSpecificFund: false,
        Form: null,
        QOpt: 1,
        ViewPage: 7,
      };
      const data = await getFetchTase(
        url,
        method,
        headers,
        JSON.stringify(bodyObject)
      );
      const rows = transformDateRows(data.Reports);
      setDataImedReports(rows);
    },
    []
  );
  return [dataImedReports, getImedReports];
}

export default useFetchImedReports;
