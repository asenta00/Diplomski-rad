import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import CompanyProfile from "./CompanyProfile";
import DeleteUser from "./DeleteUser";
import { read } from "./apiUser";
import { listByUser } from "../post/apiPost";
import ShowPosts from "./ShowPosts";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      posts: [],
      redirectToSignin: false
    };
  }

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };
  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        this.loadPosts(data._id);
      }
    });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts } = this.state;
    const currentId = this.props.match.params.userId;
    const role = user.role;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {role === "student" && <StudentProfile user={user} />}
            {role === "company" && <CompanyProfile user={user} />}
            {(isAuthenticated().user._id == user._id ||
              isAuthenticated().user.role === "admin") &&
              isAuthenticated().user && (
                <div className="d-inline-block mt-5">
                  {isAuthenticated().user.role === "company" && (
                    <Link
                      className="btn btn-raised btn-info mr-5"
                      to={`/post/create`}
                    >
                      Kreiraj oglas
                    </Link>
                  )}
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${role}/${user._id}`}
                  >
                    Uredi podatke
                  </Link>
                  <DeleteUser
                    userId={user._id}
                    role={isAuthenticated().user.role}
                  />
                </div>
              )}
          </div>
          <div className="col-md-4">
            {isAuthenticated().user._id === currentId &&
            isAuthenticated().user.role === "student" ? (
              ""
            ) : (
              <h2 className="mt-5 mb-5 ml-5">Kreirani oglasi</h2>
            )}
            <ShowPosts posts={posts} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
