import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import EditStudent from "./EditStudent";
import EditCompany from "./EditCompany";

class EditProfile extends Component {
  render() {
    // const role = isAuthenticated().user.role;
    const userId = this.props.match.params.userId;
    const role = this.props.match.params.role;
    // const role = this.props.role;
    // const userId = this.props.userId;
    return (
      <div className="container mt-5">
        <h2>Uredi podatke:</h2>
        {(role === "student" || isAuthenticated().user.role) &&
          role !== "company" && <EditStudent userId={userId} />}
        {(role === "company" || isAuthenticated().user.role) &&
          role !== "student" && <EditCompany userId={userId} />}
      </div>
    );
  }
}
export default EditProfile;
