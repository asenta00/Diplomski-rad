import React, { Component } from "react";

class StudentProfile extends Component {
  render() {
    const student = this.props.user;
    return (
      <div>
        <h2 className="mt-5 mb-5">
          {student.firstName} {student.lastName}
        </h2>
        <p>
          {" "}
          Datum rođenja: {`${new Date(student.birthdate).toLocaleDateString()}`}
        </p>
        <p> Razina studija: {student.degree}</p>
        <p> Smjer studija: {student.fieldOfStudy}</p>
        <p> Područje interesa:</p>
        <ul>
          {student.interest.map(interes => (
            <li key={interes.toString()}>{interes}</li>
          ))}
        </ul>
        <p> Email: {student.email}</p>
        <p>
          {student.firstName} se pridružuje:{" "}
          {`${new Date(student.created).toLocaleDateString()}`}
        </p>
      </div>
    );
  }
}

export default StudentProfile;
