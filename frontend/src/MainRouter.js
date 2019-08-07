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
import NewPost from "./post/NewPost";
import PrivateRoute from "./auth/PrivateRoute";
import Posts from "./post/Posts";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
import AlgorithmStudent from "./core/AlgorithmStudent";
import AlgorithmCompany from "./core/AlgorithmCompany";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <Route exact path="/" component={Home} />
      <Route exact path="/suggestions/:userId" component={AlgorithmStudent} />
      <PrivateRoute
        exact
        path="/students/:userId"
        component={AlgorithmCompany}
      />
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <Route exact path="/posts" component={Posts} />
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
