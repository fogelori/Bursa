import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function InputField(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      value={props.value}
      options={props.list}
      getOptionLabel={(option) =>
        option.hasOwnProperty(props.propertyName)
          ? option[props.propertyName]
          : null
      }
      // getOptionSelected={(option, value) => option.value === value.value}
      onChange={(event, newValue) => {
        props.setState(newValue);
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
      renderOption={(option, inputValue) => {
        const match = option === props.chosenRow;

        return (
          <div>
            <span
              key={option.index}
              style={{
                fontWeight: match ? 700 : 400,
                // ...(match && { backgroundColor: "lightblue" }),
              }}
            >
              {option[props.propertyName]}
            </span>
          </div>
        );
      }}
    />
  );
}

export default InputField;
