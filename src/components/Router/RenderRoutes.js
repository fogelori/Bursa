import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Routes from "./Routes";

function RenderRoutes() {
  let { path } = useRouteMatch();
  path = path === "/" ? "" : path + "/";
  return (
    <Switch>
      {Routes.map((route, index) => {
        const TagName = route.component;
        return (
          <Route exact={route.exact} path={`${path}${route.path}`} key={index}>
            <TagName />
          </Route>
        );
      })}
    </Switch>
  );
}

export default RenderRoutes;
