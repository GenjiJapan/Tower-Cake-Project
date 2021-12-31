import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faFile as faFileRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import AdminPage from "components/AdminPage";
import Cart from "components/Cart";
import Checkout from "components/Checkout";
import FAQ from "components/FAQ";
import Footer from "components/Footer";
import Header from "components/Header";
import Help from "components/Help";
import Error from "components/NotFound";
import PayFailed from "components/PayFailed";
import PaySuccess from "components/PaySuccess";
import Privacy from "components/Privacy";
import Term from "components/Term";
import Test2 from "components/Test/test2";
import ProductPage from "pages/Product";
import ProfileForm from "pages/Product/Profile";
import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import "./assets/Styles/GlobalStyles.css";

library.add(fab, faFile, faCheckSquare, faCoffee, faFileRegular);
const Cake = React.lazy(() => import("./pages"));
function App() {
  const cookies = new Cookies();
  const account = cookies.get("account");
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/product" component={ProductPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/term" component={Term} />
            <Route path="/help" component={Help} />
            <Route path="/faq" component={FAQ} />
            <Route path="/home" component={Cake} />
            <Route path="/profile" component={ProfileForm} />

            {!account ||
            account.permissionId >= 4 ||
            account.permissionId <= 0 ? (
              <Route path="/error" component={Error} />
            ) : (
              <Route path="/adminPage" component={AdminPage} />
            )}

            <Route path="/checkout" component={Checkout} />
            <Route path="/test" component={Test2} />
            <Route path="/paySuccess" component={PaySuccess} />
            <Route path="/payFailed" component={PayFailed} />

            <Route component={Error} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
