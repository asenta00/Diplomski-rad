import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "../images/avatar.jpg";

class StudentProfile extends Component {
  render() {
    const student = this.props.user;
    const interest = student.interest.toString().split(",");
    const photoUrl = student._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          student._id
        }?${new Date().getTime()}`
      : DefaultProfile;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-4">
            <img
              style={{
                height: "300px",
                width: "auto"
              }}
              className="rounded mx-auto d-block mt-5" // img-thumbnail "
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={student.firstName}
            />
          </div>
          <div className="col-md-8 mt-5" style={{ textAlign: "center" }}>
            <h2 className="center mt-5">
              {student.firstName} {student.lastName}
            </h2>
            <p className="center mt-5">
              <b>Datum rođenja: </b>
              {`${new Date(student.birthdate).toLocaleDateString()}`}
            </p>
            <p>
              <b>Email:</b> {student.email}
            </p>
            <p>
              <b>{student.firstName}</b> se pridružuje:{" "}
              {`${new Date(student.created).toLocaleDateString()}`}
            </p>
            {(isAuthenticated().user._id == student._id ||
              isAuthenticated().user.role === "admin") &&
              isAuthenticated().user && (
                <div className="d-inline-block mt-5">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/student/${student._id}`}
                  >
                    Uredi podatke
                  </Link>
                  <DeleteUser userId={student._id} role="student" />
                </div>
              )}
          </div>
        </div>
        <div className="container mt-5">
          <p>
            <b>Razina studija:</b> {student.degree}
          </p>
          <p>
            <b>Smjer studija:</b> {student.fieldOfStudy}
          </p>
          <p>
            <b>Područje interesa:</b>
          </p>
          <ul className="list-inline" style={{ listStylePosition: "inside" }}>
            {interest.map(interes => (
              <li className="list-inline-item" key={interes.toString()}>
                {interes}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default StudentProfile;
