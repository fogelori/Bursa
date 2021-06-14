import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LanguageIcon from "@material-ui/icons/Language";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import i18next from "i18next";

const useStyles = makeStyles((theme) => ({
  listItemIconRoot: {
    minWidth: theme.spacing(4),
  },
  formControl: {
    // minWidth: 60,
    margin: theme.spacing(1),
  },
  input1: {
    height: 200,
    fontSize: "3em",
  },
}));

function ListItemLanguage() {
  const classes = useStyles();
  // const [language, setLanguage] = React.useState(i18next.language);

  const handleChangeLng = (event) => {
    i18next.changeLanguage(event.target.value);
    window.location.reload();
    // setLanguage(event.target.value);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon
          classes={{
            root: classes.listItemIconRoot,
          }}
        >
          <LanguageIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Language" />
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            // disableUnderline
            native
            inputProps={{
              name: "language",
              id: "language-native-simple",
              style: {
                height: "20px",
                lineHeight: "20px",
                paddingTop: "7px",
              },
            }}
            id="demo-simple-select"
            value={i18next.language}
            onChange={handleChangeLng}
            // input={<Input style={{ height: 40, lineHeight: 2 }} />}
          >
            <option value="en-US">English</option>
            <option value="he-IL">Hebrew</option>
          </Select>
        </FormControl>
      </ListItem>
    </React.Fragment>
  );
}

export default ListItemLanguage;
