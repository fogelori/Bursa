import React from "react";
import "./CompaniesData.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CompaniesDataInputFieldSearch from "./CompaniesDataInputFieldSearch";
import CompanyTabs from "./Tabs/CompanyTabs";

function CompaniesData() {
  let { path } = useRouteMatch();

  console.log("CompaniesData is executed");

  return (
    <div className="companiesData">
      <div className="companiesData__topLine">
        <CompaniesDataInputFieldSearch />
      </div>
      <div className="companiesData__body">
        <Switch>
          <Route path={`${path}/:companyId`}>
            <CompanyTabs />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default CompaniesData;
