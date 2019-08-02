import React, { Component } from "react";

class StudentProfile extends Component {
  render() {
    const student = this.props.user;
    return (
      <div className="lead mt-5">
        <h2 className="mt-5 mb-5">
          {student.firstName} {student.lastName}
        </h2>
        <p>
          <b>Datum rođenja:</b>
          {`${new Date(student.birthdate).toLocaleDateString()}`}
        </p>
        <p>
          <b>Razina studija:</b> {student.degree}
        </p>
        <p>
          <b>Smjer studija:</b> {student.fieldOfStudy}
        </p>
        <p>
          <b>Područje interesa:</b>
        </p>
        <ul>
          {student.interest.map(interes => (
            <li key={interes.toString()}>{interes}</li>
          ))}
        </ul>
        <p>
          <b>Email:</b> {student.email}
        </p>
        <p>
          <b>{student.firstName}</b> se pridružuje:{" "}
          {`${new Date(student.created).toLocaleDateString()}`}
        </p>
      </div>
    );
  }
}

export default StudentProfile;
