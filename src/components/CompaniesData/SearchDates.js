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

function SearchDates({ dateObject, onChangeDate, onClickButton }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="searchDates">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          autoOk
          KeyboardButtonProps={{ size: "small" }}
          label="Start date"
          inputVariant="outlined"
          onClose={() => setIsOpen(true)}
          ToolbarComponent={(props) => (
            <CustomDateToolbar {...props} label="Start Date" />
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
          label="End date"
          inputVariant="outlined"
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          ToolbarComponent={(props) => (
            <CustomDateToolbar {...props} label="End Date" />
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
