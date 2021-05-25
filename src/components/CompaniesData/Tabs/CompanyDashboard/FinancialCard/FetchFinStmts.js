import { useCallback, useEffect, useState } from "react";
import { getFetchTase } from "../../../FetchFunctions";
import { IXBRL2JSON } from "../../../../../tools/iXbrl2Json";

const organizeGraphsDataByClauses = (clausesByPeriods, clauses) => {
  const isFourthQuarter = (period) => {
    return period.Data.period.quarter === 4;
  };

  const isPnLClause = (period, clause) => {
    return period.Data.clauses[clause].date.name === "Current_ForPeriod";
  };

  const organizedClausesData = {};
  // const clauseDataTemplate = {
  //   xData=[],
  //   yData=[]
  // }
  let accuredQuartersAmount = 0;
  clausesByPeriods.sort((a, b) => {
    return (
      new Date(a.Data.period.currentAsOf) - new Date(b.Data.period.currentAsOf)
    );
  });
  clausesByPeriods.forEach((period) => {
    clauses.forEach((clause) => {
      // organizedClausesData[clause]?.xData.push(period.Data.period.periodText) ||
      //   (organizedClausesData[clause] = { xData: [], yData: [] }).xData.push(
      //     period.Data.period.periodText
      //   );
      organizedClausesData[clause.nameInXBRL]?.xData.push(
        period.Data.period.periodText
      ) ??
        (organizedClausesData[clause.nameInXBRL] = {
          xData: [],
          yData: [],
        }).xData.push(period.Data.period.periodText);
      if (isPnLClause(period, clause.nameInXBRL)) {
        if (!isFourthQuarter(period)) {
          accuredQuartersAmount += Number(
            period.Data.getSpecificClauseObject(clause.nameInXBRL).value
          );
        } else {
          period.Data["clauses"][clause.nameInXBRL].value -=
            accuredQuartersAmount;
          accuredQuartersAmount = 0;
        }
      }
      organizedClausesData[clause.nameInXBRL].yData.push(
        Number(period.Data.getSpecificClauseObject(clause.nameInXBRL).value)
      );
    });
  });
  return organizedClausesData;
};

const organizeXBRLList = (rows) => {
  const newList = [];
  let foundSamePeriod = false;

  const foundXBRL = (files) => {
    let foundXBRL = false;
    files.forEach((file) => {
      if (file.Type === 4) {
        foundXBRL = true;
      }
    });
    return foundXBRL;
  };

  const sameReportPeriod = (newRowList, row) => {
    return newRowList.ReportPeriod === row.ReportPeriod;
  };

  const getNewerReportObj = (newRowList, row) => {
    if (Date.parse(row.PubDate) > Date.parse(newRowList.PubDate)) {
      const subPath =
        Math.floor(row.RptCode / 1000) * 1000 +
        1 +
        "-" +
        (Math.floor(row.RptCode / 1000) + 1) * 1000;
      return {
        PubDate: row.PubDate,
        ReportPeriod: row.ReportPeriod,
        XbrlLink: `https://mayafiles.tase.co.il/xbrl/${subPath}/X${row.RptCode}.xbrl`,
        Data: "",
      };
    } else {
      return newRowList;
    }
  };

  rows.forEach((row) => {
    if (foundXBRL(row.Files)) {
      newList.forEach((newListRow, index) => {
        if (sameReportPeriod(newListRow, row)) {
          newList[index] = getNewerReportObj(newListRow, row);
          foundSamePeriod = true;
        }
      });
      if (!foundSamePeriod) {
        const subPath =
          Math.floor(row.RptCode / 1000) * 1000 +
          1 +
          "-" +
          (Math.floor(row.RptCode / 1000) + 1) * 1000;
        newList.push({
          PubDate: row.PubDate,
          ReportPeriod: row.ReportPeriod,
          XbrlLink: `https://mayafiles.tase.co.il/xbrl/${subPath}/X${row.RptCode}.xbrl`,
          Data: "",
        });
      }
      foundSamePeriod = false;
    }
  });
  return newList;
};

const fetchXBRLsData = async (rowsXBRLList) => {
  let newList = [];
  const headers = {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "he,he-IL;q=0.8,en-US;q=0.5,en;q=0.3",
  };
  newList = await Promise.all(
    rowsXBRLList.map(async (row, index) => {
      const data = await getFetchTase(row.XbrlLink, "GET", headers);
      const jsonedData = new IXBRL2JSON(data);
      // console.log(jsonedData.getSpecificClauseObject("Revenue").value);
      // console.log(jsonedData);
      //       const jsonedData = xmljs.xml2js(data, {
      //         compact: true,
      //         ignoreDeclaration: true,
      //       }).xbrl;
      return {
        ...row,
        Data: jsonedData,
      };
    })
  );
  return newList;
  //     const tryt =
  //     '<?xml version="1.0" encoding="utf-8"?><xbrl xsi:schemaLocation="http://xbrl.org/2006/xbrldi http://www.xbrl.org/2006/xbrldi-2006.xsd" xmlns="http://www.xbrl.org/2003/instance" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xbrldi="http://xbrl.org/2006/xbrldi" xmlns:link="http://www.xbrl.org/2003/linkbase" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:iso4217="http://www.xbrl.org/2003/iso4217" xmlns:ifrs-full="http://xbrl.ifrs.org/taxonomy/2015-03-11/ifrs-full" xmlns:ifrs-il="http://xbrl.isa.gov.il/taxonomy/2017-07-15/ifrs-il"><link:schemaRef xlink:href="http://www.isa.gov.il/xbrl/taxonomy/2017-07-15/ifrs-il_entry_point_2017-07-15.xsd" xlink:type="simple" /><context id="Current_AsOf"><entity><identifier scheme="http://www.isa.gov.il">520038274</identifier></entity><period><instant>2020-12-31</instant></period></context></xbrl>';
  //   const ori = xmljs.xml2js(tryt, { compact: true });
  //   console.log(ori);
};

export function useFetchFinStmts() {
  const [graphsDataByClauses, setGraphsDataByClauses] = useState([]);
  const getFinStmts = useCallback(
    async (entityId, fromYear, toYear, period = 6, clauses) => {
      const url = "https://mayaapi.tase.co.il/api/report/finance";
      const method = "POST";
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Maya-With": "allow",
      };
      const bodyObject = {
        EntityId: entityId,
        FromYear: fromYear,
        Period: period,
        ToYear: toYear,
      };
      const bodyString = Object.keys(bodyObject)
        .map((key) => `${key}=${bodyObject[key]}`)
        .join("&");
      const data = await getFetchTase(url, method, headers, bodyString);
      let rowsXBRLList = organizeXBRLList(data.FinanceCompanyReportByPeriod);
      rowsXBRLList = await fetchXBRLsData(rowsXBRLList);
      const clausesGraphsData = organizeGraphsDataByClauses(
        rowsXBRLList,
        clauses
      );
      setGraphsDataByClauses(clausesGraphsData);
    },
    []
  );

  return [graphsDataByClauses, getFinStmts];
}

// export default useFetchFinStmts;

const organizeFinStmtsData = (data) => {
  const indexFinStmtsTaseToXBRLNames = {
    800: "Assets",
    830: "CurrentAssets",
    850: "NoncurrentAssets",
    910: "Equity",
    914: "NoncontrollingInterests",
    950: "CurrentLiabilities",
    970: "NoncurrentLiabilities",
    600: "Revenue",
    620: "GrossProfit",
    635: "ProfitLossFromOperatingActivities",
    660: "ProfitLossBeforeTax",
    690: "ProfitLoss",
    691: "ProfitLossAttributableToOwnersOfParent",
    696: "BasicEarningsLossPerShare",
    1430: "CashFlowsFromUsedInOperatingActivities",
  };
  const organizedData = {};
  data.forEach((item) => {
    if (indexFinStmtsTaseToXBRLNames[item.Code]) {
      const { CurrPeriodValue, PrevPeriodValue } = item;
      item["CurrPeriodValue"] = CurrPeriodValue.replaceAll(",", "") / 1000;
      item["PrevPeriodValue"] = PrevPeriodValue.replaceAll(",", "") / 1000;
      item["Change"] = (
        (item["CurrPeriodValue"] / item["PrevPeriodValue"] - 1) *
        100
      ).toFixed(1);
      organizedData[indexFinStmtsTaseToXBRLNames[item.Code]] = item;
    }
  });
  return organizedData;
};

export function useFetchFinStmtsComparative(companyId) {
  // const companyId = companyOverviewData.CompanyDetails.CompanyId;
  const [finStmtsComparative, setFinStmtsComparative] = useState([]);

  const getStmtsComparative = async (securityId) => {
    const url = `https://mayaapi.tase.co.il/api/company/financereports?companyId=${securityId}`;
    const method = "GET";
    const headers = {
      DNT: "1",
      "X-Maya-With": "allow",
    };
    let data = await getFetchTase(url, method, headers);
    data = organizeFinStmtsData(data.AllRows);
    return data;
  };

  useEffect(() => {
    async function fetchStmtsComparative() {
      const data = await getStmtsComparative(companyId);
      setFinStmtsComparative(data);
    }
    fetchStmtsComparative();
  }, [companyId]);

  return finStmtsComparative;
}

// export default useFetchFinStmtsComparative;
