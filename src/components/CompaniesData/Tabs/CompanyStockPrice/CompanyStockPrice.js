import React, { useEffect, useRef, useState } from "react";
import "./CompanyStockPrice.css";
import CreateTable from "../../CreateTable";
import useFetchStockPrice from "./FetchStockPrice";
import SearchDates from "../../SearchDates";
import InputField from "../../InputField";
import { useCreateColumns, createTableRows } from "./OrganizeTableStockPrice";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHideHeaderState } from "../../../../hideHeaderStore";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  companyStockPrice: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
    // position: "absoulte",
    // top: "150px",
    // transition: "top 0.6s ease-in-out",
    // zIndex: 100,
  },
  searchDatesMain: {
    marginTop: "4px",
    marginLeft: "2px",
    marginBottom: "2px",
    display: "flex",
    flexWrap: "wrap",
    top: "150px",
    transition: "top 0.6s ease-in-out",
  },
  searchDatesMainHide: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "-150px",
    },
    // zIndex: -100,
    // transform: "translate3d(0, -100%, 0)",
  },
}));

function CompanyStockPrice(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const translationObj = t("navBar.companiesData.tabs.stockPrice", {
    returnObjects: true,
  });
  const hiddenHeader = useHideHeaderState();
  const [dateObject, setDateObject] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [companyStockPricesRows, fetchCompanyStockPrice] = useFetchStockPrice(
    props.companyOverviewData
  );
  const columns = useCreateColumns();
  // const rows = useCreateRows(companyStockPricesRows);
  const [companyChosenSecurity, setCompanyChosenSecurity] = useState(null);
  const chosenStock = useRef({});
  const stockList = props.companyOverviewData.SecuritiesList.Securities.filter(
    (security) => security.SecurityIndicators[0].Value
  );

  useEffect(() => {
    setCompanyChosenSecurity(null);
  }, [props.companyOverviewData]);

  const handleDateChange = (date, id) => {
    setDateObject((prevState) => ({
      ...prevState,
      [id]: date,
    }));
  };

  const handleClickButton = () => {
    chosenStock.current = companyChosenSecurity;
    fetchCompanyStockPrice(
      companyChosenSecurity.SecurityId,
      dateObject.startDate,
      dateObject.endDate,
      createTableRows
    );
  };

  return (
    <div className={classes.companyStockPrice + " companyStockPrice"}>
      <div
        className={clsx(classes.searchDatesMain, {
          [classes.searchDatesMainHide]: hiddenHeader === true,
        })}
      >
        <InputField
          label={translationObj.chooseStock}
          list={stockList}
          propertyName="SecurityName"
          value={companyChosenSecurity}
          setState={setCompanyChosenSecurity}
          chosenRow={chosenStock.current}
        />
        <SearchDates
          dateObject={dateObject}
          onChangeDate={handleDateChange}
          onClickButton={handleClickButton}
        />
      </div>
      <div
        className="createTable"
        // ref={menuRef}
        style={{
          width: "100%",
          textAlign: "right",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <CreateTable columns={columns} rows={companyStockPricesRows} />
      </div>
    </div>
  );
}

export default CompanyStockPrice;
