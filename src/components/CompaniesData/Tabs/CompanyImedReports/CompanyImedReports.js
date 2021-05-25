import React, { useState } from "react";
import "./CompanyImedReports.css";
import { makeStyles } from "@material-ui/core/styles";
import CreateTable from "../../CreateTable";
import SearchDates from "../../SearchDates";
import useFetchImedReports from "./FetchImedReports";
import { useCreateColumns } from "./OrganizeTableImedReports";
import clsx from "clsx";
import { useHideHeaderState } from "../../../../hideHeaderStore";

const useStyles = makeStyles((theme) => ({
  createImedTable: {
    width: "100%",
    textAlign: "right",
    flexGrow: 1,
    overflow: "auto",

    [theme.breakpoints.up("lg")]: {},
  },
  searchDatesMain: {
    marginTop: "4px",
    marginLeft: "2px",
    marginBottom: "2px",
  },
  searchDatesMainHide: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: "-150px",
    },
  },
}));

function CompanyImedReports(props) {
  const classes = useStyles();
  const [dateObject, setDateObject] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [companyImedReports, fetchCompanyImedReports] = useFetchImedReports();
  const columns = useCreateColumns();
  // const rows = useTransformDateRows(companyImedReports);
  const hiddenHeader = useHideHeaderState();

  const handleDateChange = (date, id) => {
    setDateObject((prevState) => ({
      ...prevState,
      [id]: date,
    }));
  };

  const handleClickButton = () => {
    const page = 1;
    fetchCompanyImedReports(
      props.companyOverviewData.CompanyDetails.CompanyId,
      page,
      dateObject.startDate,
      dateObject.endDate
    );
  };

  return (
    <div className="companyImedReports">
      <div
        className={clsx(classes.searchDatesMain, {
          [classes.searchDatesMainHide]: hiddenHeader === true,
        })}
      >
        <SearchDates
          dateObject={dateObject}
          onChangeDate={handleDateChange}
          onClickButton={handleClickButton}
        />
      </div>
      <div className={classes.createImedTable}>
        <CreateTable columns={columns} rows={companyImedReports} />
      </div>
      {/* <CompanyImedReportDialog
          companyOverviewData={props.companyOverviewData}
        /> */}
    </div>
  );
}

export default CompanyImedReports;
