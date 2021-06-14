import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputField from "./InputField";
import SearchIcon from "@material-ui/icons/Search";
import { getCompaniesList } from "./FetchFunctions";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CompaniesDataInputFieldSearch() {
  let { path } = useRouteMatch();
  let history = useHistory();
  const { t } = useTranslation();
  const translationObj = t("navBar", {
    returnObjects: true,
  });
  const [companiesList, setCompaniesList] = useState([]);
  const [value, setValue] = useState(null);
  const chosenCompany = useRef({});

  const updateCompaniesList = () => {
    getCompaniesList().then((data) => {
      chosenCompany.current = data.find(
        (company) => chosenCompany.current?.Id === company.Id
      );
      setValue(chosenCompany.current);
      setCompaniesList(data);
    });
  };

  const handleClickButton = () => {
    chosenCompany.current = value;
    history.push(`${path}/${chosenCompany.current.Id}/dashboard`);
  };

  useEffect(() => {
    updateCompaniesList();
  }, [t]);

  console.log("CompaniesDataInputFieldSearch Rendered");

  return (
    <React.Fragment>
      <InputField
        label={translationObj.companiesData.searchCompany}
        list={companiesList}
        propertyName="Name"
        setState={setValue}
        // {...(chosenCompany?.Id && { value: chosenCompany })}
        value={value || null}
        chosenRow={chosenCompany.current}
      />
      <Button variant="contained" color="primary" onClick={handleClickButton}>
        <SearchIcon />
      </Button>
      <Switch>
        <Route
          path={`${path}/:companyId`}
          render={(history) => {
            chosenCompany.current.Id = history.match.params?.companyId;

            return <React.Fragment></React.Fragment>;
          }}
        />
      </Switch>
    </React.Fragment>
  );
}

export default CompaniesDataInputFieldSearch;
