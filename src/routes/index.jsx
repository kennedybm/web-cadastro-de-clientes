import { Switch, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import ClientsPage from "../pages/clientsPage";
import RegisterPage from "../pages/registerPage";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/clients" component={ClientsPage} />
      </Switch>
    </>
  );
};
export default Routes;
