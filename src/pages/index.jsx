import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import HomePage from "./Main";
import ProductPage from "./Product";
import Error from "components/NotFound";

function Cake(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={HomePage} />

      <Route component={Error} />
    </Switch>
  );
}

export default Cake;
