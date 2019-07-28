import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import SignupStudent from "./user/SignupStudent";
import SignupCompany from "./user/SignupCompany";
import Signin from "./user/Signin";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup/student" component={SignupStudent} />
      <Route exact path="/signup/company" component={SignupCompany} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
  </div>
);

export default MainRouter;
