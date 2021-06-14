import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import CustomDateToolbar from "./CustomDateToolbar";
import "./SearchDates.css";
import { useTranslation } from "react-i18next";

function SearchDates({ dateObject, onChangeDate, onClickButton }) {
  const { t } = useTranslation();
  const translationObj = t("navBar.companiesData.components.searchDates", {
    returnObjects: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="searchDates">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          autoOk
          KeyboardButtonProps={{ size: "small" }}
          label={translationObj.startDate}
          inputVariant="outlined"
          onClose={() => setIsOpen(true)}
          ToolbarComponent={(props) => (
            <CustomDateToolbar {...props} label={translationObj.startDate} />
          )}
          value={dateObject.startDate}
          onChange={(date) => onChangeDate(date, "startDate")}
          onError={console.log}
          disableFuture
          // showTodayButton
          format="dd/MM/yyyy"
        />
        <KeyboardDatePicker
          variant="inline"
          autoOk
          KeyboardButtonProps={{ size: "small" }}
          label={translationObj.endDate}
          inputVariant="outlined"
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          ToolbarComponent={(props) => (
            <CustomDateToolbar {...props} label={translationObj.endDate} />
          )}
          value={dateObject.endDate}
          onChange={(date) => onChangeDate(date, "endDate")}
          onError={console.log}
          disableFuture
          // showTodayButton
          format="dd/MM/yyyy"
        />
        <Button variant="contained" color="primary" onClick={onClickButton}>
          <SearchIcon />
        </Button>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default SearchDates;
