import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import CompanyProfile from "./CompanyProfile";
import { read } from "./apiUser";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  render() {
    const { redirectToSignin, user } = this.state;
    const role = user.role;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {role === "student" && <StudentProfile user={user} />}
            {role === "company" && <CompanyProfile user={user} />}
          </div>
          <div className="col-md-6">
            {isAuthenticated().user && isAuthenticated().user._id == user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Uredi profil
                </Link>
                <button className="btn btn-raised btn-danger">
                  Izbriši profil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
