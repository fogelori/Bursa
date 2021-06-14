import React from "react";
import { Switch, Route } from "react-router-dom";
// import Routes from "./Routes";
import { useGetMenuList } from "./Routes";

function RenderRoutes() {
  const Routes = useGetMenuList();
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
