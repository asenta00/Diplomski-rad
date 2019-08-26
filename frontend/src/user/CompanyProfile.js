import React, { Component } from "react";
import { isAuthenticated } from "./apiUser";
import { Link } from "react-router-dom";
import { listByUser } from "../post/apiPost";
import DeleteUser from "./DeleteUser";
import ShowPosts from "./ShowPosts";
import DefaultProfile from "../images/avatarCompany.png";

class CompanyProfile extends Component {
  constructor() {
    super();
    this.state = { posts: "" };
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

  componentDidMount() {
    const userId = this.props.user._id;
    this.loadPosts(userId);
  }
  render() {
    const { posts } = this.state;
    const company = this.props.user;
    const photoUrl = company._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          company._id
        }?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <div className="row">
        <div className="col-md-7 ml-2">
          <img
            style={{ height: "250px", width: "auto" }}
            className="rounded mx-auto d-block mt-5"
            src={photoUrl}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={company.name}
          />
          <div className="ml-2 mr-2 mt-2">
            <h2 className="mt-5 mb-5" style={{ textAlign: "center" }}>
              {company.name}
            </h2>
            <p className="mt-2 ml-2">{company.body}</p>
            <p className="mt-2 ml-2">
              <b>Email:</b> {company.email}
            </p>
            <p className="mt-2 ml-2">
              <b>Kontakt:</b> {company.contact}
            </p>
            <p className="mt-2 ml-2">
              <b>{company.name}</b> se pridružuje:{" "}
              {`${new Date(company.created).toLocaleDateString()}`}
            </p>
            {(isAuthenticated().user._id == company._id ||
              isAuthenticated().user.role === "admin") &&
              isAuthenticated().user && (
                <div className="d-inline-block mt-5 ml-5">
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
                    to={`/user/edit/company/${company._id}`}
                  >
                    Uredi podatke
                  </Link>
                  <DeleteUser userId={company._id} role="company" />
                </div>
              )}
          </div>
        </div>
        <div className="col-md-4 ml-2">
          <h2 className="mt-5 mb-5 " style={{ textAlign: "center" }}>
            Kreirani oglasi
          </h2>
          {posts && <ShowPosts posts={posts} />}
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
