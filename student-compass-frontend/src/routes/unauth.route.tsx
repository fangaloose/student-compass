import {
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/unauth/login.page";


const UnAuthRouterComponent = () => {
  return (
      <Switch>
        <Route path="/"><LoginPage></LoginPage></Route>
      </Switch>
  );
};

export default UnAuthRouterComponent;
