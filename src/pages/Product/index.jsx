import Banner from "components/Banner";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Category from "./Category";
import ProdDetail from "./ProdDetail";

function ProductPage(props) {
  const { path } = useRouteMatch();
  console.log("path inside : ", path);
  return (
    <div>
      <Banner title="Our products" />

      <Switch>
        <Route exact path={`${path}/`} component={Category} />

        <Route exact path={`${path}/item-detail/:id`} component={ProdDetail} />
      </Switch>
    </div>
  );
}

export default ProductPage;
