import React from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "./Routes";

function RenderRoutes() {
  return (
    <Switch>
      {Routes.map((route, index) => {
        const TagName = route.component;
        return (
          <Route exact={route.exact} path={route.path} key={index}>
            <TagName />
          </Route>
        );
      })}
    </Switch>
  );
}

export default RenderRoutes;
