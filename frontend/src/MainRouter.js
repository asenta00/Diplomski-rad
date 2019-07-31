import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import SignupStudent from "./user/SignupStudent";
import SignupCompany from "./user/SignupCompany";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Students from "./user/Students";
import Companies from "./user/Companies";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup/student" component={SignupStudent} />
      <Route exact path="/signup/company" component={SignupCompany} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute
        exact
        path="/user/edit/:role/:userId"
        component={EditProfile}
      />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <Route exact path="/students" component={Students} />
      <Route exact path="/companies" component={Companies} />
    </Switch>
  </div>
);

export default MainRouter;
