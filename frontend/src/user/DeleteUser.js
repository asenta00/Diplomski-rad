import React, { Component } from "react";
import { isAuthenticated, signout } from "../auth/index";
import { remove } from "./apiUser";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  state = {
    redirect: false
  };
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    const role = this.props.role;
    console.log(role);
    remove(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (role !== "admin") signout(() => console.log("User is deleted"));
        this.setState({ redirect: true });
      }
    });
  };
  deleteConfirmed = () => {
    let answer = window.confirm("Sigurno želite izbrisati profil?");
    if (answer) {
      this.deleteAccount();
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Izbriši profil
      </button>
    );
  }
}
export default DeleteUser;
